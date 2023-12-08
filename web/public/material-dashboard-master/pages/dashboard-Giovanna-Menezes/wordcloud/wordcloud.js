(function () {
    // If window.HTMLWidgets is already defined, then use it; otherwise create a
    // new object. This allows preceding code to set options that affect the
    // initialization process (though none currently exist).
    window.HTMLWidgets = window.HTMLWidgets || {};

    // See if we're running in a viewer pane. If not, we're in a web browser.
    var viewerMode = window.HTMLWidgets.viewerMode =
      /\bviewer_pane=1\b/.test(window.location);

    // See if we're running in Shiny mode. If not, it's a static document.
    // Note that static widgets can appear in both Shiny and static modes, but
    // obviously, Shiny widgets can only appear in Shiny apps/documents.
    var shinyMode = window.HTMLWidgets.shinyMode =
      typeof (window.Shiny) !== "undefined" && !!window.Shiny.outputBindings;

    // We can't count on jQuery being available, so we implement our own
    // version if necessary.
    function querySelectorAll(scope, selector) {
      if (typeof (jQuery) !== "undefined" && scope instanceof jQuery) {
        return scope.find(selector);
      }
      if (scope.querySelectorAll) {
        return scope.querySelectorAll(selector);
      }
    }

    function asArray(value) {
      if (value === null)
        return [];
      if ($.isArray(value))
        return value;
      return [value];
    }

    // Implement jQuery's extend
    function extend(target /*, ... */) {
      if (arguments.length == 1) {
        return target;
      }
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var prop in source) {
          if (source.hasOwnProperty(prop)) {
            target[prop] = source[prop];
          }
        }
      }
      return target;
    }

    // IE8 doesn't support Array.forEach.
    function forEach(values, callback, thisArg) {
      if (values.forEach) {
        values.forEach(callback, thisArg);
      } else {
        for (var i = 0; i < values.length; i++) {
          callback.call(thisArg, values[i], i, values);
        }
      }
    }

    // Replaces the specified method with the return value of funcSource.
    //
    // Note that funcSource should not BE the new method, it should be a function
    // that RETURNS the new method. funcSource receives a single argument that is
    // the overridden method, it can be called from the new method. The overridden
    // method can be called like a regular function, it has the target permanently
    // bound to it so "this" will work correctly.
    function overrideMethod(target, methodName, funcSource) {
      var superFunc = target[methodName] || function () { };
      var superFuncBound = function () {
        return superFunc.apply(target, arguments);
      };
      target[methodName] = funcSource(superFuncBound);
    }

    // Add a method to delegator that, when invoked, calls
    // delegatee.methodName. If there is no such method on
    // the delegatee, but there was one on delegator before
    // delegateMethod was called, then the original version
    // is invoked instead.
    // For example:
    //
    // var a = {
    //   method1: function() { console.log('a1'); }
    //   method2: function() { console.log('a2'); }
    // };
    // var b = {
    //   method1: function() { console.log('b1'); }
    // };
    // delegateMethod(a, b, "method1");
    // delegateMethod(a, b, "method2");
    // a.method1();
    // a.method2();
    //
    // The output would be "b1", "a2".
    function delegateMethod(delegator, delegatee, methodName) {
      var inherited = delegator[methodName];
      delegator[methodName] = function () {
        var target = delegatee;
        var method = delegatee[methodName];

        // The method doesn't exist on the delegatee. Instead,
        // call the method on the delegator, if it exists.
        if (!method) {
          target = delegator;
          method = inherited;
        }

        if (method) {
          return method.apply(target, arguments);
        }
      };
    }

    // Implement a vague facsimilie of jQuery's data method
    function elementData(el, name, value) {
      if (arguments.length == 2) {
        return el["htmlwidget_data_" + name];
      } else if (arguments.length == 3) {
        el["htmlwidget_data_" + name] = value;
        return el;
      } else {
        throw new Error("Wrong number of arguments for elementData: " +
          arguments.length);
      }
    }

    // http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
    function escapeRegExp(str) {
      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }

    function hasClass(el, className) {
      var re = new RegExp("\\b" + escapeRegExp(className) + "\\b");
      return re.test(el.className);
    }

    // elements - array (or array-like object) of HTML elements
    // className - class name to test for
    // include - if true, only return elements with given className;
    //   if false, only return elements *without* given className
    function filterByClass(elements, className, include) {
      var results = [];
      for (var i = 0; i < elements.length; i++) {
        if (hasClass(elements[i], className) == include)
          results.push(elements[i]);
      }
      return results;
    }

    function on(obj, eventName, func) {
      if (obj.addEventListener) {
        obj.addEventListener(eventName, func, false);
      } else if (obj.attachEvent) {
        obj.attachEvent(eventName, func);
      }
    }

    function off(obj, eventName, func) {
      if (obj.removeEventListener)
        obj.removeEventListener(eventName, func, false);
      else if (obj.detachEvent) {
        obj.detachEvent(eventName, func);
      }
    }

    // Translate array of values to top/right/bottom/left, as usual with
    // the "padding" CSS property
    // https://developer.mozilla.org/en-US/docs/Web/CSS/padding
    function unpackPadding(value) {
      if (typeof (value) === "number")
        value = [value];
      if (value.length === 1) {
        return { top: value[0], right: value[0], bottom: value[0], left: value[0] };
      }
      if (value.length === 2) {
        return { top: value[0], right: value[1], bottom: value[0], left: value[1] };
      }
      if (value.length === 3) {
        return { top: value[0], right: value[1], bottom: value[2], left: value[1] };
      }
      if (value.length === 4) {
        return { top: value[0], right: value[1], bottom: value[2], left: value[3] };
      }
    }

    // Convert an unpacked padding object to a CSS value
    function paddingToCss(paddingObj) {
      return paddingObj.top + "px " + paddingObj.right + "px " + paddingObj.bottom + "px " + paddingObj.left + "px";
    }

    // Makes a number suitable for CSS
    function px(x) {
      if (typeof (x) === "number")
        return x + "px";
      else
        return x;
    }

    // Retrieves runtime widget sizing information for an element.
    // The return value is either null, or an object with fill, padding,
    // defaultWidth, defaultHeight fields.
    function sizingPolicy(el) {
      var sizingEl = document.querySelector("script[data-for='" + el.id + "'][type='application/htmlwidget-sizing']");
      if (!sizingEl)
        return null;
      var sp = JSON.parse(sizingEl.textContent || sizingEl.text || "{}");
      if (viewerMode) {
        return sp.viewer;
      } else {
        return sp.browser;
      }
    }

    // @param tasks Array of strings (or falsy value, in which case no-op).
    //   Each element must be a valid JavaScript expression that yields a
    //   function. Or, can be an array of objects with "code" and "data"
    //   properties; in this case, the "code" property should be a string
    //   of JS that's an expr that yields a function, and "data" should be
    //   an object that will be added as an additional argument when that
    //   function is called.
    // @param target The object that will be "this" for each function
    //   execution.
    // @param args Array of arguments to be passed to the functions. (The
    //   same arguments will be passed to all functions.)
    function evalAndRun(tasks, target, args) {
      if (tasks) {
        forEach(tasks, function (task) {
          var theseArgs = args;
          if (typeof (task) === "object") {
            theseArgs = theseArgs.concat([task.data]);
            task = task.code;
          }
          var taskFunc = tryEval(task);
          if (typeof (taskFunc) !== "function") {
            throw new Error("Task must be a function! Source:\n" + task);
          }
          taskFunc.apply(target, theseArgs);
        });
      }
    }

    // Attempt eval() both with and without enclosing in parentheses.
    // Note that enclosing coerces a function declaration into
    // an expression that eval() can parse
    // (otherwise, a SyntaxError is thrown)
    function tryEval(code) {
      var result = null;
      try {
        result = eval("(" + code + ")");
      } catch (error) {
        if (!(error instanceof SyntaxError)) {
          throw error;
        }
        try {
          result = eval(code);
        } catch (e) {
          if (e instanceof SyntaxError) {
            throw error;
          } else {
            throw e;
          }
        }
      }
      return result;
    }

    function initSizing(el) {
      var sizing = sizingPolicy(el);
      if (!sizing)
        return;

      var cel = document.getElementById("htmlwidget_container");
      if (!cel)
        return;

      if (typeof (sizing.padding) !== "undefined") {
        document.body.style.margin = "0";
        document.body.style.padding = paddingToCss(unpackPadding(sizing.padding));
      }

      if (sizing.fill) {
        document.body.style.overflow = "hidden";
        document.body.style.width = "100%";
        document.body.style.height = "100%";
        document.documentElement.style.width = "100%";
        document.documentElement.style.height = "100%";
        cel.style.position = "absolute";
        var pad = unpackPadding(sizing.padding);
        cel.style.top = pad.top + "px";
        cel.style.right = pad.right + "px";
        cel.style.bottom = pad.bottom + "px";
        cel.style.left = pad.left + "px";
        el.style.width = "100%";
        el.style.height = "100%";

        return {
          getWidth: function () { return cel.getBoundingClientRect().width; },
          getHeight: function () { return cel.getBoundingClientRect().height; }
        };

      } else {
        el.style.width = px(sizing.width);
        el.style.height = px(sizing.height);

        return {
          getWidth: function () { return cel.getBoundingClientRect().width; },
          getHeight: function () { return cel.getBoundingClientRect().height; }
        };
      }
    }

    // Default implementations for methods
    var defaults = {
      find: function (scope) {
        return querySelectorAll(scope, "." + this.name);
      },
      renderError: function (el, err) {
        var $el = $(el);

        this.clearError(el);

        // Add all these error classes, as Shiny does
        var errClass = "shiny-output-error";
        if (err.type !== null) {
          // use the classes of the error condition as CSS class names
          errClass = errClass + " " + $.map(asArray(err.type), function (type) {
            return errClass + "-" + type;
          }).join(" ");
        }
        errClass = errClass + " htmlwidgets-error";

        // Is el inline or block? If inline or inline-block, just display:none it
        // and add an inline error.
        var display = $el.css("display");
        $el.data("restore-display-mode", display);

        if (display === "inline" || display === "inline-block") {
          $el.hide();
          if (err.message !== "") {
            var errorSpan = $("<span>").addClass(errClass);
            errorSpan.text(err.message);
            $el.after(errorSpan);
          }
        } else if (display === "block") {
          // If block, add an error just after the el, set visibility:none on the
          // el, and position the error to be on top of the el.
          // Mark it with a unique ID and CSS class so we can remove it later.
          $el.css("visibility", "hidden");
          if (err.message !== "") {
            var errorDiv = $("<div>").addClass(errClass).css("position", "absolute")
              .css("top", el.offsetTop)
              .css("left", el.offsetLeft)
              // setting width can push out the page size, forcing otherwise
              // unnecessary scrollbars to appear and making it impossible for
              // the element to shrink; so use max-width instead
              .css("maxWidth", el.offsetWidth)
              .css("height", el.offsetHeight);
            errorDiv.text(err.message);
            $el.after(errorDiv);

            // Really dumb way to keep the size/position of the error in sync with
            // the parent element as the window is resized or whatever.
            var intId = setInterval(function () {
              if (!errorDiv[0].parentElement) {
                clearInterval(intId);
                return;
              }
              errorDiv
                .css("top", el.offsetTop)
                .css("left", el.offsetLeft)
                .css("maxWidth", el.offsetWidth)
                .css("height", el.offsetHeight);
            }, 500);
          }
        }
      },
      clearError: function (el) {
        var $el = $(el);
        var display = $el.data("restore-display-mode");
        $el.data("restore-display-mode", null);

        if (display === "inline" || display === "inline-block") {
          if (display)
            $el.css("display", display);
          $(el.nextSibling).filter(".htmlwidgets-error").remove();
        } else if (display === "block") {
          $el.css("visibility", "inherit");
          $(el.nextSibling).filter(".htmlwidgets-error").remove();
        }
      },
      sizing: {}
    };

    // Called by widget bindings to register a new type of widget. The definition
    // object can contain the following properties:
    // - name (required) - A string indicating the binding name, which will be
    //   used by default as the CSS classname to look for.
    // - initialize (optional) - A function(el) that will be called once per
    //   widget element; if a value is returned, it will be passed as the third
    //   value to renderValue.
    // - renderValue (required) - A function(el, data, initValue) that will be
    //   called with data. Static contexts will cause this to be called once per
    //   element; Shiny apps will cause this to be called multiple times per
    //   element, as the data changes.
    window.HTMLWidgets.widget = function (definition) {
      if (!definition.name) {
        throw new Error("Widget must have a name");
      }
      if (!definition.type) {
        throw new Error("Widget must have a type");
      }
      // Currently we only support output widgets
      if (definition.type !== "output") {
        throw new Error("Unrecognized widget type '" + definition.type + "'");
      }
      // TODO: Verify that .name is a valid CSS classname

      // Support new-style instance-bound definitions. Old-style class-bound
      // definitions have one widget "object" per widget per type/class of
      // widget; the renderValue and resize methods on such widget objects
      // take el and instance arguments, because the widget object can't
      // store them. New-style instance-bound definitions have one widget
      // object per widget instance; the definition that's passed in doesn't
      // provide renderValue or resize methods at all, just the single method
      //   factory(el, width, height)
      // which returns an object that has renderValue(x) and resize(w, h).
      // This enables a far more natural programming style for the widget
      // author, who can store per-instance state using either OO-style
      // instance fields or functional-style closure variables (I guess this
      // is in contrast to what can only be called C-style pseudo-OO which is
      // what we required before).
      if (definition.factory) {
        definition = createLegacyDefinitionAdapter(definition);
      }

      if (!definition.renderValue) {
        throw new Error("Widget must have a renderValue function");
      }

      // For static rendering (non-Shiny), use a simple widget registration
      // scheme. We also use this scheme for Shiny apps/documents that also
      // contain static widgets.
      window.HTMLWidgets.widgets = window.HTMLWidgets.widgets || [];
      // Merge defaults into the definition; don't mutate the original definition.
      var staticBinding = extend({}, defaults, definition);
      overrideMethod(staticBinding, "find", function (superfunc) {
        return function (scope) {
          var results = superfunc(scope);
          // Filter out Shiny outputs, we only want the static kind
          return filterByClass(results, "html-widget-output", false);
        };
      });
      window.HTMLWidgets.widgets.push(staticBinding);

      if (shinyMode) {
        // Shiny is running. Register the definition with an output binding.
        // The definition itself will not be the output binding, instead
        // we will make an output binding object that delegates to the
        // definition. This is because we foolishly used the same method
        // name (renderValue) for htmlwidgets definition and Shiny bindings
        // but they actually have quite different semantics (the Shiny
        // bindings receive data that includes lots of metadata that it
        // strips off before calling htmlwidgets renderValue). We can't
        // just ignore the difference because in some widgets it's helpful
        // to call this.renderValue() from inside of resize(), and if
        // we're not delegating, then that call will go to the Shiny
        // version instead of the htmlwidgets version.

        // Merge defaults with definition, without mutating either.
        var bindingDef = extend({}, defaults, definition);

        // This object will be our actual Shiny binding.
        var shinyBinding = new Shiny.OutputBinding();

        // With a few exceptions, we'll want to simply use the bindingDef's
        // version of methods if they are available, otherwise fall back to
        // Shiny's defaults. NOTE: If Shiny's output bindings gain additional
        // methods in the future, and we want them to be overrideable by
        // HTMLWidget binding definitions, then we'll need to add them to this
        // list.
        delegateMethod(shinyBinding, bindingDef, "getId");
        delegateMethod(shinyBinding, bindingDef, "onValueChange");
        delegateMethod(shinyBinding, bindingDef, "onValueError");
        delegateMethod(shinyBinding, bindingDef, "renderError");
        delegateMethod(shinyBinding, bindingDef, "clearError");
        delegateMethod(shinyBinding, bindingDef, "showProgress");

        // The find, renderValue, and resize are handled differently, because we
        // want to actually decorate the behavior of the bindingDef methods.

        shinyBinding.find = function (scope) {
          var results = bindingDef.find(scope);

          // Only return elements that are Shiny outputs, not static ones
          var dynamicResults = results.filter(".html-widget-output");

          // It's possible that whatever caused Shiny to think there might be
          // new dynamic outputs, also caused there to be new static outputs.
          // Since there might be lots of different htmlwidgets bindings, we
          // schedule execution for later--no need to staticRender multiple
          // times.
          if (results.length !== dynamicResults.length)
            scheduleStaticRender();

          return dynamicResults;
        };

        // Wrap renderValue to handle initialization, which unfortunately isn't
        // supported natively by Shiny at the time of this writing.

        shinyBinding.renderValue = function (el, data) {
          Shiny.renderDependencies(data.deps);
          // Resolve strings marked as javascript literals to objects
          if (!(data.evals instanceof Array)) data.evals = [data.evals];
          for (var i = 0; data.evals && i < data.evals.length; i++) {
            window.HTMLWidgets.evaluateStringMember(data.x, data.evals[i]);
          }
          if (!bindingDef.renderOnNullValue) {
            if (data.x === null) {
              el.style.visibility = "hidden";
              return;
            } else {
              el.style.visibility = "inherit";
            }
          }
          if (!elementData(el, "initialized")) {
            initSizing(el);

            elementData(el, "initialized", true);
            if (bindingDef.initialize) {
              var rect = el.getBoundingClientRect();
              var result = bindingDef.initialize(el, rect.width, rect.height);
              elementData(el, "init_result", result);
            }
          }
          bindingDef.renderValue(el, data.x, elementData(el, "init_result"));
          evalAndRun(data.jsHooks.render, elementData(el, "init_result"), [el, data.x]);
        };

        // Only override resize if bindingDef implements it
        if (bindingDef.resize) {
          shinyBinding.resize = function (el, width, height) {
            // Shiny can call resize before initialize/renderValue have been
            // called, which doesn't make sense for widgets.
            if (elementData(el, "initialized")) {
              bindingDef.resize(el, width, height, elementData(el, "init_result"));
            }
          };
        }

        Shiny.outputBindings.register(shinyBinding, bindingDef.name);
      }
    };

    var scheduleStaticRenderTimerId = null;
    function scheduleStaticRender() {
      if (!scheduleStaticRenderTimerId) {
        scheduleStaticRenderTimerId = setTimeout(function () {
          scheduleStaticRenderTimerId = null;
          window.HTMLWidgets.staticRender();
        }, 1);
      }
    }

    // Render static widgets after the document finishes loading
    // Statically render all elements that are of this widget's class
    window.HTMLWidgets.staticRender = function () {
      var bindings = window.HTMLWidgets.widgets || [];
      forEach(bindings, function (binding) {
        var matches = binding.find(document.documentElement);
        forEach(matches, function (el) {
          var sizeObj = initSizing(el, binding);

          var getSize = function (el) {
            if (sizeObj) {
              return { w: sizeObj.getWidth(), h: sizeObj.getHeight() }
            } else {
              var rect = el.getBoundingClientRect();
              return { w: rect.width, h: rect.height }
            }
          };

          if (hasClass(el, "html-widget-static-bound"))
            return;
          el.className = el.className + " html-widget-static-bound";

          var initResult;
          if (binding.initialize) {
            var size = getSize(el);
            initResult = binding.initialize(el, size.w, size.h);
            elementData(el, "init_result", initResult);
          }

          if (binding.resize) {
            var lastSize = getSize(el);
            var resizeHandler = function (e) {
              var size = getSize(el);
              if (size.w === 0 && size.h === 0)
                return;
              if (size.w === lastSize.w && size.h === lastSize.h)
                return;
              lastSize = size;
              binding.resize(el, size.w, size.h, initResult);
            };

            on(window, "resize", resizeHandler);

            // This is needed for cases where we're running in a Shiny
            // app, but the widget itself is not a Shiny output, but
            // rather a simple static widget. One example of this is
            // an rmarkdown document that has runtime:shiny and widget
            // that isn't in a render function. Shiny only knows to
            // call resize handlers for Shiny outputs, not for static
            // widgets, so we do it ourselves.
            if (window.jQuery) {
              window.jQuery(document).on(
                "shown.htmlwidgets shown.bs.tab.htmlwidgets shown.bs.collapse.htmlwidgets",
                resizeHandler
              );
              window.jQuery(document).on(
                "hidden.htmlwidgets hidden.bs.tab.htmlwidgets hidden.bs.collapse.htmlwidgets",
                resizeHandler
              );
            }

            // This is needed for the specific case of ioslides, which
            // flips slides between display:none and display:block.
            // Ideally we would not have to have ioslide-specific code
            // here, but rather have ioslides raise a generic event,
            // but the rmarkdown package just went to CRAN so the
            // window to getting that fixed may be long.
            if (window.addEventListener) {
              // It's OK to limit this to window.addEventListener
              // browsers because ioslides itself only supports
              // such browsers.
              on(document, "slideenter", resizeHandler);
              on(document, "slideleave", resizeHandler);
            }
          }

          var scriptData = document.querySelector("script[data-for='" + el.id + "'][type='application/json']");
          if (scriptData) {
            var data = JSON.parse(scriptData.textContent || scriptData.text);
            // Resolve strings marked as javascript literals to objects
            if (!(data.evals instanceof Array)) data.evals = [data.evals];
            for (var k = 0; data.evals && k < data.evals.length; k++) {
              window.HTMLWidgets.evaluateStringMember(data.x, data.evals[k]);
            }
            binding.renderValue(el, data.x, initResult);
            evalAndRun(data.jsHooks.render, initResult, [el, data.x]);
          }
        });
      });

      invokePostRenderHandlers();
    }


    function has_jQuery3() {
      if (!window.jQuery) {
        return false;
      }
      var $version = window.jQuery.fn.jquery;
      var $major_version = parseInt($version.split(".")[0]);
      return $major_version >= 3;
    }

    /*
    / Shiny 1.4 bumped jQuery from 1.x to 3.x which means jQuery's
    / on-ready handler (i.e., $(fn)) is now asyncronous (i.e., it now
    / really means $(setTimeout(fn)).
    / https://jquery.com/upgrade-guide/3.0/#breaking-change-document-ready-handlers-are-now-asynchronous
    /
    / Since Shiny uses $() to schedule initShiny, shiny>=1.4 calls initShiny
    / one tick later than it did before, which means staticRender() is
    / called renderValue() earlier than (advanced) widget authors might be expecting.
    / https://github.com/rstudio/shiny/issues/2630
    /
    / For a concrete example, leaflet has some methods (e.g., updateBounds)
    / which reference Shiny methods registered in initShiny (e.g., setInputValue).
    / Since leaflet is privy to this life-cycle, it knows to use setTimeout() to
    / delay execution of those methods (until Shiny methods are ready)
    / https://github.com/rstudio/leaflet/blob/18ec981/javascript/src/index.js#L266-L268
    /
    / Ideally widget authors wouldn't need to use this setTimeout() hack that
    / leaflet uses to call Shiny methods on a staticRender(). In the long run,
    / the logic initShiny should be broken up so that method registration happens
    / right away, but binding happens later.
    */
    function maybeStaticRenderLater() {
      if (shinyMode && has_jQuery3()) {
        window.jQuery(window.HTMLWidgets.staticRender);
      } else {
        window.HTMLWidgets.staticRender();
      }
    }

    if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", function () {
        document.removeEventListener("DOMContentLoaded", arguments.callee, false);
        maybeStaticRenderLater();
      }, false);
    } else if (document.attachEvent) {
      document.attachEvent("onreadystatechange", function () {
        if (document.readyState === "complete") {
          document.detachEvent("onreadystatechange", arguments.callee);
          maybeStaticRenderLater();
        }
      });
    }


    window.HTMLWidgets.getAttachmentUrl = function (depname, key) {
      // If no key, default to the first item
      if (typeof (key) === "undefined")
        key = 1;

      var link = document.getElementById(depname + "-" + key + "-attachment");
      if (!link) {
        throw new Error("Attachment " + depname + "/" + key + " not found in document");
      }
      return link.getAttribute("href");
    };

    window.HTMLWidgets.dataframeToD3 = function (df) {
      var names = [];
      var length;
      for (var name in df) {
        if (df.hasOwnProperty(name))
          names.push(name);
        if (typeof (df[name]) !== "object" || typeof (df[name].length) === "undefined") {
          throw new Error("All fields must be arrays");
        } else if (typeof (length) !== "undefined" && length !== df[name].length) {
          throw new Error("All fields must be arrays of the same length");
        }
        length = df[name].length;
      }
      var results = [];
      var item;
      for (var row = 0; row < length; row++) {
        item = {};
        for (var col = 0; col < names.length; col++) {
          item[names[col]] = df[names[col]][row];
        }
        results.push(item);
      }
      return results;
    };

    window.HTMLWidgets.transposeArray2D = function (array) {
      if (array.length === 0) return array;
      var newArray = array[0].map(function (col, i) {
        return array.map(function (row) {
          return row[i]
        })
      });
      return newArray;
    };
    // Split value at splitChar, but allow splitChar to be escaped
    // using escapeChar. Any other characters escaped by escapeChar
    // will be included as usual (including escapeChar itself).
    function splitWithEscape(value, splitChar, escapeChar) {
      var results = [];
      var escapeMode = false;
      var currentResult = "";
      for (var pos = 0; pos < value.length; pos++) {
        if (!escapeMode) {
          if (value[pos] === splitChar) {
            results.push(currentResult);
            currentResult = "";
          } else if (value[pos] === escapeChar) {
            escapeMode = true;
          } else {
            currentResult += value[pos];
          }
        } else {
          currentResult += value[pos];
          escapeMode = false;
        }
      }
      if (currentResult !== "") {
        results.push(currentResult);
      }
      return results;
    }
    // Function authored by Yihui/JJ Allaire
    window.HTMLWidgets.evaluateStringMember = function (o, member) {
      var parts = splitWithEscape(member, '.', '\\');
      for (var i = 0, l = parts.length; i < l; i++) {
        var part = parts[i];
        // part may be a character or 'numeric' member name
        if (o !== null && typeof o === "object" && part in o) {
          if (i == (l - 1)) { // if we are at the end of the line then evalulate
            if (typeof o[part] === "string")
              o[part] = tryEval(o[part]);
          } else { // otherwise continue to next embedded object
            o = o[part];
          }
        }
      }
    };

    // Retrieve the HTMLWidget instance (i.e. the return value of an
    // HTMLWidget binding's initialize() or factory() function)
    // associated with an element, or null if none.
    window.HTMLWidgets.getInstance = function (el) {
      return elementData(el, "init_result");
    };

    // Finds the first element in the scope that matches the selector,
    // and returns the HTMLWidget instance (i.e. the return value of
    // an HTMLWidget binding's initialize() or factory() function)
    // associated with that element, if any. If no element matches the
    // selector, or the first matching element has no HTMLWidget
    // instance associated with it, then null is returned.
    //
    // The scope argument is optional, and defaults to window.document.
    window.HTMLWidgets.find = function (scope, selector) {
      if (arguments.length == 1) {
        selector = scope;
        scope = document;
      }

      var el = scope.querySelector(selector);
      if (el === null) {
        return null;
      } else {
        return window.HTMLWidgets.getInstance(el);
      }
    };

    // Finds all elements in the scope that match the selector, and
    // returns the HTMLWidget instances (i.e. the return values of
    // an HTMLWidget binding's initialize() or factory() function)
    // associated with the elements, in an array. If elements that
    // match the selector don't have an associated HTMLWidget
    // instance, the returned array will contain nulls.
    //
    // The scope argument is optional, and defaults to window.document.
    window.HTMLWidgets.findAll = function (scope, selector) {
      if (arguments.length == 1) {
        selector = scope;
        scope = document;
      }

      var nodes = scope.querySelectorAll(selector);
      var results = [];
      for (var i = 0; i < nodes.length; i++) {
        results.push(window.HTMLWidgets.getInstance(nodes[i]));
      }
      return results;
    };

    var postRenderHandlers = [];
    function invokePostRenderHandlers() {
      while (postRenderHandlers.length) {
        var handler = postRenderHandlers.shift();
        if (handler) {
          handler();
        }
      }
    }

    // Register the given callback function to be invoked after the
    // next time static widgets are rendered.
    window.HTMLWidgets.addPostRenderHandler = function (callback) {
      postRenderHandlers.push(callback);
    };

    // Takes a new-style instance-bound definition, and returns an
    // old-style class-bound definition. This saves us from having
    // to rewrite all the logic in this file to accomodate both
    // types of definitions.
    function createLegacyDefinitionAdapter(defn) {
      var result = {
        name: defn.name,
        type: defn.type,
        initialize: function (el, width, height) {
          return defn.factory(el, width, height);
        },
        renderValue: function (el, x, instance) {
          return instance.renderValue(x);
        },
        resize: function (el, width, height, instance) {
          return instance.resize(width, height);
        }
      };

      if (defn.find)
        result.find = defn.find;
      if (defn.renderError)
        result.renderError = defn.renderError;
      if (defn.clearError)
        result.clearError = defn.clearError;

      return result;
    }
  })();

/*!
* wordcloud2.js
* http://timdream.org/wordcloud2.js/
*
* Copyright 2011 - 2013 Tim Chien
* Released under the MIT license
*/

  'use strict';

  // setImmediate
  if (!window.setImmediate) {
    window.setImmediate = (function setupSetImmediate() {
      return window.msSetImmediate ||
        window.webkitSetImmediate ||
        window.mozSetImmediate ||
        window.oSetImmediate ||
        (function setupSetZeroTimeout() {
          if (!window.postMessage || !window.addEventListener) {
            return null;
          }

          var callbacks = [undefined];
          var message = 'zero-timeout-message';

          // Like setTimeout, but only takes a function argument.  There's
          // no time argument (always zero) and no arguments (you have to
          // use a closure).
          var setZeroTimeout = function setZeroTimeout(callback) {
            var id = callbacks.length;
            callbacks.push(callback);
            window.postMessage(message + id.toString(36), '*');

            return id;
          };

          window.addEventListener('message', function setZeroTimeoutMessage(evt) {
            // Skipping checking event source, retarded IE confused this window
            // object with another in the presence of iframe
            if (typeof evt.data !== 'string' ||
              evt.data.substr(0, message.length) !== message/* ||
          evt.source !== window */) {
              return;
            }

            evt.stopImmediatePropagation();

            var id = parseInt(evt.data.substr(message.length), 36);
            if (!callbacks[id]) {
              return;
            }

            callbacks[id]();
            callbacks[id] = undefined;
          }, true);

          /* specify clearImmediate() here since we need the scope */
          window.clearImmediate = function clearZeroTimeout(id) {
            if (!callbacks[id]) {
              return;
            }

            callbacks[id] = undefined;
          };

          return setZeroTimeout;
        })() ||
        // fallback
        function setImmediateFallback(fn) {
          window.setTimeout(fn, 0);
        };
    })();
  }

  if (!window.clearImmediate) {
    window.clearImmediate = (function setupClearImmediate() {
      return window.msClearImmediate ||
        window.webkitClearImmediate ||
        window.mozClearImmediate ||
        window.oClearImmediate ||
        // "clearZeroTimeout" is implement on the previous block ||
        // fallback
        function clearImmediateFallback(timer) {
          window.clearTimeout(timer);
        };
    })();
  }

  (function (global) {

    // Check if WordCloud can run on this browser
    var isSupported = (function isSupported() {
      var canvas = document.createElement('canvas');
      if (!canvas || !canvas.getContext) {
        return false;
      }

      var ctx = canvas.getContext('2d');
      if (!ctx.getImageData) {
        return false;
      }
      if (!ctx.fillText) {
        return false;
      }

      if (!Array.prototype.some) {
        return false;
      }
      if (!Array.prototype.push) {
        return false;
      }

      return true;
    }());

    // Find out if the browser impose minium font size by
    // drawing small texts on a canvas and measure it's width.
    var minFontSize = (function getMinFontSize() {
      if (!isSupported) {
        return;
      }

      var ctx = document.createElement('canvas').getContext('2d');

      // start from 20
      var size = 20;

      // two sizes to measure
      var hanWidth, mWidth;

      while (size) {
        ctx.font = size.toString(10) + 'px sans-serif';
        if ((ctx.measureText('\uFF37').width === hanWidth) &&
          (ctx.measureText('m').width) === mWidth) {
          return (size + 1);
        }

        hanWidth = ctx.measureText('\uFF37').width;
        mWidth = ctx.measureText('m').width;

        size--;
      }

      return 0;
    })();

    // Based on http://jsfromhell.com/array/shuffle
    var shuffleArray = function shuffleArray(arr) {
      for (var j, x, i = arr.length; i;
        j = Math.floor(Math.random() * i),
        x = arr[--i], arr[i] = arr[j],
        arr[j] = x) { }
      return arr;
    };

    var WordCloud = function WordCloud(elements, options) {
      if (!isSupported) {
        return;
      }

      if (!Array.isArray(elements)) {
        elements = [elements];
      }

      elements.forEach(function (el, i) {
        if (typeof el === 'string') {
          elements[i] = document.getElementById(el);
          if (!elements[i]) {
            throw 'The element id specified is not found.';
          }
        } else if (!el.tagName && !el.appendChild) {
          throw 'You must pass valid HTML elements, or ID of the element.';
        }
      });

      /* Default values to be overwritten by options object */
      var settings = {
        list: [],
        fontFamily: '"Trebuchet MS", "Heiti TC", "微軟正黑體", ' +
          '"Arial Unicode MS", "Droid Fallback Sans", sans-serif',
        fontWeight: 'normal',
        color: 'random-dark',
        minSize: 0, // 0 to disable
        weightFactor: 1,
        clearCanvas: true,
        backgroundColor: '#fff',  // opaque white = rgba(255, 255, 255, 1)

        gridSize: 8,
        origin: null,

        drawMask: false,
        maskColor: 'rgba(255,0,0,0.3)',
        maskGapWidth: 0.3,

        wait: 0,
        abortThreshold: 0, // disabled
        abort: function noop() { },

        minRotation: - Math.PI / 2,
        maxRotation: Math.PI / 2,

        shuffle: true,
        rotateRatio: 0.1,

        shape: 'circle',
        ellipticity: 0.65,

        classes: null,

        hover: null,
        click: null
      };

      if (options) {
        for (var key in options) {
          if (key in settings) {
            settings[key] = options[key];
          }
        }
      }

      /* Convert weightFactor into a function */
      if (typeof settings.weightFactor !== 'function') {
        var factor = settings.weightFactor;
        settings.weightFactor = function weightFactor(pt) {
          return pt * factor; //in px
        };
      }

      /* Convert shape into a function */
      if (typeof settings.shape !== 'function') {
        switch (settings.shape) {
          case 'circle':
          /* falls through */
          default:
            // 'circle' is the default and a shortcut in the code loop.
            settings.shape = 'circle';
            break;

          case 'cardioid':
            settings.shape = function shapeCardioid(theta) {
              return 1 - Math.sin(theta);
            };
            break;

          /*
  
          To work out an X-gon, one has to calculate "m",
          where 1/(cos(2*PI/X)+m*sin(2*PI/X)) = 1/(cos(0)+m*sin(0))
          http://www.wolframalpha.com/input/?i=1%2F%28cos%282*PI%2FX%29%2Bm*sin%28
          2*PI%2FX%29%29+%3D+1%2F%28cos%280%29%2Bm*sin%280%29%29
  
          Copy the solution into polar equation r = 1/(cos(t') + m*sin(t'))
          where t' equals to mod(t, 2PI/X);
  
          */

          case 'diamond':
          case 'square':
            // http://www.wolframalpha.com/input/?i=plot+r+%3D+1%2F%28cos%28mod+
            // %28t%2C+PI%2F2%29%29%2Bsin%28mod+%28t%2C+PI%2F2%29%29%29%2C+t+%3D
            // +0+..+2*PI
            settings.shape = function shapeSquare(theta) {
              var thetaPrime = theta % (2 * Math.PI / 4);
              return 1 / (Math.cos(thetaPrime) + Math.sin(thetaPrime));
            };
            break;

          case 'triangle-forward':
            // http://www.wolframalpha.com/input/?i=plot+r+%3D+1%2F%28cos%28mod+
            // %28t%2C+2*PI%2F3%29%29%2Bsqrt%283%29sin%28mod+%28t%2C+2*PI%2F3%29
            // %29%29%2C+t+%3D+0+..+2*PI
            settings.shape = function shapeTriangle(theta) {
              var thetaPrime = theta % (2 * Math.PI / 3);
              return 1 / (Math.cos(thetaPrime) +
                Math.sqrt(3) * Math.sin(thetaPrime));
            };
            break;

          case 'triangle':
          case 'triangle-upright':
            settings.shape = function shapeTriangle(theta) {
              var thetaPrime = (theta + Math.PI * 3 / 2) % (2 * Math.PI / 3);
              return 1 / (Math.cos(thetaPrime) +
                Math.sqrt(3) * Math.sin(thetaPrime));
            };
            break;

          case 'pentagon':
            settings.shape = function shapePentagon(theta) {
              var thetaPrime = (theta + 0.955) % (2 * Math.PI / 5);
              return 1 / (Math.cos(thetaPrime) +
                0.726543 * Math.sin(thetaPrime));
            };
            break;

          case 'star':
            settings.shape = function shapeStar(theta) {
              var thetaPrime = (theta + 0.955) % (2 * Math.PI / 10);
              if ((theta + 0.955) % (2 * Math.PI / 5) - (2 * Math.PI / 10) >= 0) {
                return 1 / (Math.cos((2 * Math.PI / 10) - thetaPrime) +
                  3.07768 * Math.sin((2 * Math.PI / 10) - thetaPrime));
              } else {
                return 1 / (Math.cos(thetaPrime) +
                  3.07768 * Math.sin(thetaPrime));
              }
            };
            break;
        }
      }

      /* Make sure gridSize is a whole number and is not smaller than 4px */
      settings.gridSize = Math.max(Math.floor(settings.gridSize), 4);

      /* shorthand */
      var g = settings.gridSize;
      var maskRectWidth = g - settings.maskGapWidth;

      /* normalize rotation settings */
      var rotationRange = Math.abs(settings.maxRotation - settings.minRotation);
      var minRotation = Math.min(settings.maxRotation, settings.minRotation);

      /* information/object available to all functions, set when start() */
      var grid, // 2d array containing filling information
        ngx, ngy, // width and height of the grid
        center, // position of the center of the cloud
        maxRadius;

      /* timestamp for measuring each putWord() action */
      var escapeTime;

      /* function for getting the color of the text */
      var getTextColor;
      function random_hsl_color(min, max) {
        return 'hsl(' +
          (Math.random() * 360).toFixed() + ',' +
          (Math.random() * 30 + 70).toFixed() + '%,' +
          (Math.random() * (max - min) + min).toFixed() + '%)';
      }
      switch (settings.color) {
        case 'random-dark':
          getTextColor = function getRandomDarkColor() {
            return random_hsl_color(10, 50);
          };
          break;

        case 'random-light':
          getTextColor = function getRandomLightColor() {
            return random_hsl_color(50, 90);
          };
          break;

        default:
          if (typeof settings.color === 'function') {
            getTextColor = settings.color;
          }
          break;
      }

      /* function for getting the classes of the text */
      var getTextClasses = null;
      if (typeof settings.classes === 'function') {
        getTextClasses = settings.classes;
      }

      /* Interactive */
      var interactive = false;
      var infoGrid = [];
      var hovered;

      var getInfoGridFromMouseTouchEvent =
        function getInfoGridFromMouseTouchEvent(evt) {
          var canvas = evt.currentTarget;
          var rect = canvas.getBoundingClientRect();
          var clientX;
          var clientY;
          /** Detect if touches are available */
          if (evt.touches) {
            clientX = evt.touches[0].clientX;
            clientY = evt.touches[0].clientY;
          } else {
            clientX = evt.clientX;
            clientY = evt.clientY;
          }
          var eventX = clientX - rect.left;
          var eventY = clientY - rect.top;

          var x = Math.floor(eventX * ((canvas.width / rect.width) || 1) / g);
          var y = Math.floor(eventY * ((canvas.height / rect.height) || 1) / g);

          return infoGrid[x][y];
        };

      var wordcloudhover = function wordcloudhover(evt) {
        var info = getInfoGridFromMouseTouchEvent(evt);

        if (hovered === info) {
          return;
        }

        hovered = info;
        if (!info) {
          settings.hover(undefined, undefined, evt);

          return;
        }

        settings.hover(info.item, info.dimension, evt);

      };

      var wordcloudclick = function wordcloudclick(evt) {
        var info = getInfoGridFromMouseTouchEvent(evt);
        if (!info) {
          return;
        }

        settings.click(info.item, info.dimension, evt);
        evt.preventDefault();
      };

      /* Get points on the grid for a given radius away from the center */
      var pointsAtRadius = [];
      var getPointsAtRadius = function getPointsAtRadius(radius) {
        if (pointsAtRadius[radius]) {
          return pointsAtRadius[radius];
        }

        // Look for these number of points on each radius
        var T = radius * 8;

        // Getting all the points at this radius
        var t = T;
        var points = [];

        if (radius === 0) {
          points.push([center[0], center[1], 0]);
        }

        while (t--) {
          // distort the radius to put the cloud in shape
          var rx = 1;
          if (settings.shape !== 'circle') {
            rx = settings.shape(t / T * 2 * Math.PI); // 0 to 1
          }

          // Push [x, y, t]; t is used solely for getTextColor()
          points.push([
            center[0] + radius * rx * Math.cos(-t / T * 2 * Math.PI),
            center[1] + radius * rx * Math.sin(-t / T * 2 * Math.PI) *
            settings.ellipticity,
            t / T * 2 * Math.PI]);
        }

        pointsAtRadius[radius] = points;
        return points;
      };

      /* Return true if we had spent too much time */
      var exceedTime = function exceedTime() {
        return ((settings.abortThreshold > 0) &&
          ((new Date()).getTime() - escapeTime > settings.abortThreshold));
      };

      /* Get the deg of rotation according to settings, and luck. */
      var getRotateDeg = function getRotateDeg() {
        if (settings.rotateRatio === 0) {
          return 0;
        }

        if (Math.random() > settings.rotateRatio) {
          return 0;
        }

        if (rotationRange === 0) {
          return minRotation;
        }

        return minRotation + Math.random() * rotationRange;
      };

      var getTextInfo = function getTextInfo(word, weight, rotateDeg) {
        // calculate the acutal font size
        // fontSize === 0 means weightFactor function wants the text skipped,
        // and size < minSize means we cannot draw the text.
        var debug = false;
        var fontSize = settings.weightFactor(weight);
        if (fontSize <= settings.minSize) {
          return false;
        }

        // Scale factor here is to make sure fillText is not limited by
        // the minium font size set by browser.
        // It will always be 1 or 2n.
        var mu = 1;
        if (fontSize < minFontSize) {
          mu = (function calculateScaleFactor() {
            var mu = 2;
            while (mu * fontSize < minFontSize) {
              mu += 2;
            }
            return mu;
          })();
        }

        var fcanvas = document.createElement('canvas');
        var fctx = fcanvas.getContext('2d', { willReadFrequently: true });

        fctx.font = settings.fontWeight + ' ' +
          (fontSize * mu).toString(10) + 'px ' + settings.fontFamily;

        // Estimate the dimension of the text with measureText().
        var fw = fctx.measureText(word).width / mu;
        var fh = Math.max(fontSize * mu,
          fctx.measureText('m').width,
          fctx.measureText('\uFF37').width) / mu;

        // Create a boundary box that is larger than our estimates,
        // so text don't get cut of (it sill might)
        var boxWidth = fw + fh * 2;
        var boxHeight = fh * 3;
        var fgw = Math.ceil(boxWidth / g);
        var fgh = Math.ceil(boxHeight / g);
        boxWidth = fgw * g;
        boxHeight = fgh * g;

        // Calculate the proper offsets to make the text centered at
        // the preferred position.

        // This is simply half of the width.
        var fillTextOffsetX = - fw / 2;
        // Instead of moving the box to the exact middle of the preferred
        // position, for Y-offset we move 0.4 instead, so Latin alphabets look
        // vertical centered.
        var fillTextOffsetY = - fh * 0.4;

        // Calculate the actual dimension of the canvas, considering the rotation.
        var cgh = Math.ceil((boxWidth * Math.abs(Math.sin(rotateDeg)) +
          boxHeight * Math.abs(Math.cos(rotateDeg))) / g);
        var cgw = Math.ceil((boxWidth * Math.abs(Math.cos(rotateDeg)) +
          boxHeight * Math.abs(Math.sin(rotateDeg))) / g);
        var width = cgw * g;
        var height = cgh * g;

        fcanvas.setAttribute('width', width);
        fcanvas.setAttribute('height', height);

        if (debug) {
          // Attach fcanvas to the DOM
          document.body.appendChild(fcanvas);
          // Save it's state so that we could restore and draw the grid correctly.
          fctx.save();
        }

        // Scale the canvas with |mu|.
        fctx.scale(1 / mu, 1 / mu);
        fctx.translate(width * mu / 2, height * mu / 2);
        fctx.rotate(- rotateDeg);

        // Once the width/height is set, ctx info will be reset.
        // Set it again here.
        fctx.font = settings.fontWeight + ' ' +
          (fontSize * mu).toString(10) + 'px ' + settings.fontFamily;

        // Fill the text into the fcanvas.
        // XXX: We cannot because textBaseline = 'top' here because
        // Firefox and Chrome uses different default line-height for canvas.
        // Please read https://bugzil.la/737852#c6.
        // Here, we use textBaseline = 'middle' and draw the text at exactly
        // 0.5 * fontSize lower.
        fctx.fillStyle = '#000';
        fctx.textBaseline = 'middle';
        fctx.fillText(word, fillTextOffsetX * mu,
          (fillTextOffsetY + fontSize * 0.5) * mu);

        // Get the pixels of the text
        var imageData = fctx.getImageData(0, 0, width, height).data;

        if (exceedTime()) {
          return false;
        }

        if (debug) {
          // Draw the box of the original estimation
          fctx.strokeRect(fillTextOffsetX * mu,
            fillTextOffsetY, fw * mu, fh * mu);
          fctx.restore();
        }

        // Read the pixels and save the information to the occupied array
        var occupied = [];
        var gx = cgw, gy, x, y;
        var bounds = [cgh / 2, cgw / 2, cgh / 2, cgw / 2];
        while (gx--) {
          gy = cgh;
          while (gy--) {
            y = g;
            singleGridLoop: {
              while (y--) {
                x = g;
                while (x--) {
                  if (imageData[((gy * g + y) * width +
                    (gx * g + x)) * 4 + 3]) {
                    occupied.push([gx, gy]);

                    if (gx < bounds[3]) {
                      bounds[3] = gx;
                    }
                    if (gx > bounds[1]) {
                      bounds[1] = gx;
                    }
                    if (gy < bounds[0]) {
                      bounds[0] = gy;
                    }
                    if (gy > bounds[2]) {
                      bounds[2] = gy;
                    }

                    if (debug) {
                      fctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
                      fctx.fillRect(gx * g, gy * g, g - 0.5, g - 0.5);
                    }
                    break singleGridLoop;
                  }
                }
              }
              if (debug) {
                fctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
                fctx.fillRect(gx * g, gy * g, g - 0.5, g - 0.5);
              }
            }
          }
        }

        if (debug) {
          fctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
          fctx.fillRect(bounds[3] * g,
            bounds[0] * g,
            (bounds[1] - bounds[3] + 1) * g,
            (bounds[2] - bounds[0] + 1) * g);
        }

        // Return information needed to create the text on the real canvas
        return {
          mu: mu,
          occupied: occupied,
          bounds: bounds,
          gw: cgw,
          gh: cgh,
          fillTextOffsetX: fillTextOffsetX,
          fillTextOffsetY: fillTextOffsetY,
          fillTextWidth: fw,
          fillTextHeight: fh,
          fontSize: fontSize
        };
      };

      /* Determine if there is room available in the given dimension */
      var canFitText = function canFitText(gx, gy, gw, gh, occupied) {
        // Go through the occupied points,
        // return false if the space is not available.
        var i = occupied.length;
        while (i--) {
          var px = gx + occupied[i][0];
          var py = gy + occupied[i][1];

          if (px >= ngx || py >= ngy || px < 0 || py < 0 || !grid[px][py]) {
            return false;
          }
        }
        return true;
      };

      /* Actually draw the text on the grid */
      var drawText = function drawText(gx, gy, info, word, weight,
        distance, theta, rotateDeg, attributes) {

        var fontSize = info.fontSize;
        var color;
        if (getTextColor) {
          color = getTextColor(word, weight, fontSize, distance, theta);
        } else if (settings.color instanceof Array) {
          color = settings.color.shift() || 'black'; // pass a array in setting, default 'black'
        } else {
          color = settings.color;
        }

        var classes;
        if (getTextClasses) {
          classes = getTextClasses(word, weight, fontSize, distance, theta);
        } else {
          classes = settings.classes;
        }

        var dimension;
        var bounds = info.bounds;
        dimension = {
          x: (gx + bounds[3]) * g,
          y: (gy + bounds[0]) * g,
          w: (bounds[1] - bounds[3] + 1) * g,
          h: (bounds[2] - bounds[0] + 1) * g
        };

        elements.forEach(function (el) {
          if (el.getContext) {
            var ctx = el.getContext('2d');
            var mu = info.mu;

            // Save the current state before messing it
            ctx.save();
            ctx.scale(1 / mu, 1 / mu);

            ctx.font = settings.fontWeight + ' ' +
              (fontSize * mu).toString(10) + 'px ' + settings.fontFamily;
            ctx.fillStyle = color;

            // Translate the canvas position to the origin coordinate of where
            // the text should be put.
            ctx.translate((gx + info.gw / 2) * g * mu,
              (gy + info.gh / 2) * g * mu);

            if (rotateDeg !== 0) {
              ctx.rotate(- rotateDeg);
            }

            // Finally, fill the text.

            // XXX: We cannot because textBaseline = 'top' here because
            // Firefox and Chrome uses different default line-height for canvas.
            // Please read https://bugzil.la/737852#c6.
            // Here, we use textBaseline = 'middle' and draw the text at exactly
            // 0.5 * fontSize lower.
            ctx.textBaseline = 'middle';
            ctx.fillText(word, info.fillTextOffsetX * mu,
              (info.fillTextOffsetY + fontSize * 0.5) * mu);

            // The below box is always matches how <span>s are positioned
            /* ctx.strokeRect(info.fillTextOffsetX, info.fillTextOffsetY,
              info.fillTextWidth, info.fillTextHeight); */

            // Restore the state.
            ctx.restore();
          } else {
            // drawText on DIV element
            var span = document.createElement('span');
            var transformRule = '';
            transformRule = 'rotate(' + (- rotateDeg / Math.PI * 180) + 'deg) ';
            if (info.mu !== 1) {
              transformRule +=
                'translateX(-' + (info.fillTextWidth / 4) + 'px) ' +
                'scale(' + (1 / info.mu) + ')';
            }
            var styleRules = {
              'position': 'absolute',
              'display': 'block',
              'font': settings.fontWeight + ' ' +
                (fontSize * info.mu) + 'px ' + settings.fontFamily,
              'left': ((gx + info.gw / 2) * g + info.fillTextOffsetX) + 'px',
              'top': ((gy + info.gh / 2) * g + info.fillTextOffsetY) + 'px',
              'width': info.fillTextWidth + 'px',
              'height': info.fillTextHeight + 'px',
              'lineHeight': fontSize + 'px',
              'whiteSpace': 'nowrap',
              'transform': transformRule,
              'webkitTransform': transformRule,
              'msTransform': transformRule,
              'transformOrigin': '50% 40%',
              'webkitTransformOrigin': '50% 40%',
              'msTransformOrigin': '50% 40%'
            };
            if (color) {
              styleRules.color = color;
            }
            span.textContent = word;
            for (var cssProp in styleRules) {
              span.style[cssProp] = styleRules[cssProp];
            }
            if (attributes) {
              for (var attribute in attributes) {
                span.setAttribute(attribute, attributes[attribute]);
              }
            }
            if (classes) {
              span.className += classes;
            }
            el.appendChild(span);
          }
        });
      };

      /* Help function to updateGrid */
      var fillGridAt = function fillGridAt(x, y, drawMask, dimension, item) {
        if (x >= ngx || y >= ngy || x < 0 || y < 0) {
          return;
        }

        grid[x][y] = false;

        if (drawMask) {
          var ctx = elements[0].getContext('2d');
          ctx.fillRect(x * g, y * g, maskRectWidth, maskRectWidth);
        }

        if (interactive) {
          infoGrid[x][y] = { item: item, dimension: dimension };
        }
      };

      /* Update the filling information of the given space with occupied points.
         Draw the mask on the canvas if necessary. */
      var updateGrid = function updateGrid(gx, gy, gw, gh, info, item) {
        var occupied = info.occupied;
        var drawMask = settings.drawMask;
        var ctx;
        if (drawMask) {
          ctx = elements[0].getContext('2d');
          ctx.save();
          ctx.fillStyle = settings.maskColor;
        }

        var dimension;
        if (interactive) {
          var bounds = info.bounds;
          dimension = {
            x: (gx + bounds[3]) * g,
            y: (gy + bounds[0]) * g,
            w: (bounds[1] - bounds[3] + 1) * g,
            h: (bounds[2] - bounds[0] + 1) * g
          };
        }

        var i = occupied.length;
        while (i--) {
          fillGridAt(gx + occupied[i][0], gy + occupied[i][1],
            drawMask, dimension, item);
        }

        if (drawMask) {
          ctx.restore();
        }
      };

      /* putWord() processes each item on the list,
         calculate it's size and determine it's position, and actually
         put it on the canvas. */
      var putWord = function putWord(item) {
        var word, weight, attributes;
        if (Array.isArray(item)) {
          word = item[0];
          weight = item[1];
        } else {
          word = item.word;
          weight = item.weight;
          attributes = item.attributes;
        }
        var rotateDeg = getRotateDeg();

        // get info needed to put the text onto the canvas
        var info = getTextInfo(word, weight, rotateDeg);

        // not getting the info means we shouldn't be drawing this one.
        if (!info) {
          return false;
        }

        if (exceedTime()) {
          return false;
        }

        // Skip the loop if we have already know the bounding box of
        // word is larger than the canvas.
        var bounds = info.bounds;
        if ((bounds[1] - bounds[3] + 1) > ngx ||
          (bounds[2] - bounds[0] + 1) > ngy) {
          return false;
        }

        // Determine the position to put the text by
        // start looking for the nearest points
        var r = maxRadius + 1;

        var tryToPutWordAtPoint = function (gxy) {
          var gx = Math.floor(gxy[0] - info.gw / 2);
          var gy = Math.floor(gxy[1] - info.gh / 2);
          var gw = info.gw;
          var gh = info.gh;

          // If we cannot fit the text at this position, return false
          // and go to the next position.
          if (!canFitText(gx, gy, gw, gh, info.occupied)) {
            return false;
          }

          // Actually put the text on the canvas
          drawText(gx, gy, info, word, weight,
            (maxRadius - r), gxy[2], rotateDeg, attributes);

          // Mark the spaces on the grid as filled
          updateGrid(gx, gy, gw, gh, info, item);

          // Return true so some() will stop and also return true.
          return true;
        };

        while (r--) {
          var points = getPointsAtRadius(maxRadius - r);

          if (settings.shuffle) {
            points = [].concat(points);
            shuffleArray(points);
          }

          // Try to fit the words by looking at each point.
          // array.some() will stop and return true
          // when putWordAtPoint() returns true.
          // If all the points returns false, array.some() returns false.
          var drawn = points.some(tryToPutWordAtPoint);

          if (drawn) {
            // leave putWord() and return true
            return true;
          }
        }
        // we tried all distances but text won't fit, return false
        return false;
      };

      /* Send DOM event to all elements. Will stop sending event and return
         if the previous one is canceled (for cancelable events). */
      var sendEvent = function sendEvent(type, cancelable, detail) {
        if (cancelable) {
          return !elements.some(function (el) {
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(type, true, cancelable, detail || {});
            return !el.dispatchEvent(evt);
          }, this);
        } else {
          elements.forEach(function (el) {
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(type, true, cancelable, detail || {});
            el.dispatchEvent(evt);
          }, this);
        }
      };

      /* Start drawing on a canvas */
      var start = function start() {
        // For dimensions, clearCanvas etc.,
        // we only care about the first element.
        var canvas = elements[0];

        if (canvas.getContext) {
          ngx = Math.floor(canvas.width / g);
          ngy = Math.floor(canvas.height / g);
        } else {
          var rect = canvas.getBoundingClientRect();
          ngx = Math.floor(rect.width / g);
          ngy = Math.floor(rect.height / g);
        }

        // Sending a wordcloudstart event which cause the previous loop to stop.
        // Do nothing if the event is canceled.
        if (!sendEvent('wordcloudstart', true)) {
          return;
        }

        // Determine the center of the word cloud
        center = (settings.origin) ?
          [settings.origin[0] / g, settings.origin[1] / g] :
          [ngx / 2, ngy / 2];

        // Maxium radius to look for space
        maxRadius = Math.floor(Math.sqrt(ngx * ngx + ngy * ngy));

        /* Clear the canvas only if the clearCanvas is set,
           if not, update the grid to the current canvas state */
        grid = [];

        var gx, gy, i;
        if (!canvas.getContext || settings.clearCanvas) {
          elements.forEach(function (el) {
            if (el.getContext) {
              var ctx = el.getContext('2d');
              ctx.fillStyle = settings.backgroundColor;
              ctx.clearRect(0, 0, ngx * (g + 1), ngy * (g + 1));
              ctx.fillRect(0, 0, ngx * (g + 1), ngy * (g + 1));
            } else {
              el.textContent = '';
              el.style.backgroundColor = settings.backgroundColor;
            }
          });

          /* fill the grid with empty state */
          gx = ngx;
          while (gx--) {
            grid[gx] = [];
            gy = ngy;
            while (gy--) {
              grid[gx][gy] = true;
            }
          }
        } else {
          /* Determine bgPixel by creating
             another canvas and fill the specified background color. */
          var bctx = document.createElement('canvas').getContext('2d');

          bctx.fillStyle = settings.backgroundColor;
          bctx.fillRect(0, 0, 1, 1);
          var bgPixel = bctx.getImageData(0, 0, 1, 1).data;

          /* Read back the pixels of the canvas we got to tell which part of the
             canvas is empty.
             (no clearCanvas only works with a canvas, not divs) */
          var imageData =
            canvas.getContext('2d').getImageData(0, 0, ngx * g, ngy * g).data;

          gx = ngx;
          var x, y;
          while (gx--) {
            grid[gx] = [];
            gy = ngy;
            while (gy--) {
              y = g;
              singleGridLoop: while (y--) {
                x = g;
                while (x--) {
                  i = 4;
                  while (i--) {
                    if (imageData[((gy * g + y) * ngx * g +
                      (gx * g + x)) * 4 + i] !== bgPixel[i]) {
                      grid[gx][gy] = false;
                      break singleGridLoop;
                    }
                  }
                }
              }
              if (grid[gx][gy] !== false) {
                grid[gx][gy] = true;
              }
            }
          }

          imageData = bctx = bgPixel = undefined;
        }

        // fill the infoGrid with empty state if we need it
        if (settings.hover || settings.click) {

          interactive = true;

          /* fill the grid with empty state */
          gx = ngx + 1;
          while (gx--) {
            infoGrid[gx] = [];
          }

          if (settings.hover) {
            canvas.addEventListener('mousemove', wordcloudhover);
          }

          if (settings.click) {
            canvas.addEventListener('click', wordcloudclick);
            canvas.addEventListener('touchstart', wordcloudclick);
            canvas.addEventListener('touchend', function (e) {
              e.preventDefault();
            });
            canvas.style.webkitTapHighlightColor = 'rgba(0, 0, 0, 0)';
          }

          canvas.addEventListener('wordcloudstart', function stopInteraction() {
            canvas.removeEventListener('wordcloudstart', stopInteraction);

            canvas.removeEventListener('mousemove', wordcloudhover);
            canvas.removeEventListener('click', wordcloudclick);
            hovered = undefined;
          });
        }

        i = 0;
        var loopingFunction, stoppingFunction;
        if (settings.wait !== 0) {
          loopingFunction = window.setTimeout;
          stoppingFunction = window.clearTimeout;
        } else {
          loopingFunction = window.setImmediate;
          stoppingFunction = window.clearImmediate;
        }

        var addEventListener = function addEventListener(type, listener) {
          elements.forEach(function (el) {
            el.addEventListener(type, listener);
          }, this);
        };

        var removeEventListener = function removeEventListener(type, listener) {
          elements.forEach(function (el) {
            el.removeEventListener(type, listener);
          }, this);
        };

        var anotherWordCloudStart = function anotherWordCloudStart() {
          removeEventListener('wordcloudstart', anotherWordCloudStart);
          stoppingFunction(timer);
        };

        addEventListener('wordcloudstart', anotherWordCloudStart);

        var timer = loopingFunction(function loop() {
          if (i >= settings.list.length) {
            stoppingFunction(timer);
            sendEvent('wordcloudstop', false);
            removeEventListener('wordcloudstart', anotherWordCloudStart);

            return;
          }
          escapeTime = (new Date()).getTime();
          var drawn = putWord(settings.list[i]);
          var canceled = !sendEvent('wordclouddrawn', true, {
            item: settings.list[i], drawn: drawn
          });
          if (exceedTime() || canceled) {
            stoppingFunction(timer);
            settings.abort();
            sendEvent('wordcloudabort', false);
            sendEvent('wordcloudstop', false);
            removeEventListener('wordcloudstart', anotherWordCloudStart);
            return;
          }
          i++;
          timer = loopingFunction(loop, settings.wait);
        }, settings.wait);
      };

      // All set, start the drawing
      start();
    };

    WordCloud.isSupported = isSupported;
    WordCloud.minFontSize = minFontSize;

    // Expose the library as an AMD module
    if (typeof define === 'function' && define.amd) {
      define('wordcloud', [], function () { return WordCloud; });
    } else if (typeof module !== 'undefined' && module.exports) {
      module.exports = WordCloud;
    } else {
      global.WordCloud = WordCloud;
    }

  })(this); //jshint ignore:line

  // create element
  function newlabel(el) {
    var newDiv = document.createElement("div");
    var newSpan = document.createElement("span");
    newDiv.id = 'wcLabel';
    newSpan.id = "wcSpan";
    el.appendChild(newDiv);
    document.getElementById("wcLabel").appendChild(newSpan);
  }

  // hover function
  function cv_handleHover(item, dimension, evt) {
    var el = document.getElementById("wcLabel");
    if (!item) {
      el.setAttribute('hidden', true);

      return;
    }

    el.removeAttribute('hidden');
    // console.log(evt.srcElement.offsetLeft);

    el.style.left = dimension.x + evt.srcElement.offsetLeft + 'px';
    el.style.top = dimension.y + evt.srcElement.offsetTop + 'px';
    el.style.width = dimension.w + 'px';
    el.style.height = dimension.h + 'px';

    this.hoverDimension = dimension;

    document.getElementById("wcSpan").setAttribute(
      'data-l10n-args', JSON.stringify({ word: item[0], count: item[1] }));
    document.getElementById("wcSpan").innerHTML = item[0] + ":" + item[1];

  }

  function updateCanvasMask(maskCanvas) {
    var ctx = maskCanvas.getContext('2d');
    var imageData = ctx.getImageData(
      0, 0, maskCanvas.width, maskCanvas.height);
    var newImageData = ctx.createImageData(imageData);

    var toneSum = 0;
    var toneCnt = 0;
    for (var i = 0; i < imageData.data.length; i += 4) {
      var alpha = imageData.data[i + 3];
      if (alpha > 128) {
        var tone = imageData.data[i]
          + imageData.data[i + 1]
          + imageData.data[i + 2];
        toneSum += tone;
        ++toneCnt;
      }
    }
    var threshold = toneSum / toneCnt;

    for (var i = 0; i < imageData.data.length; i += 4) {
      var tone = imageData.data[i]
        + imageData.data[i + 1]
        + imageData.data[i + 2];
      var alpha = imageData.data[i + 3];

      if (alpha < 128 || tone > threshold) {
        // Area not to draw
        newImageData.data[i] = 0;
        newImageData.data[i + 1] = 0;
        newImageData.data[i + 2] = 0;
        newImageData.data[i + 3] = 0;
      }
      else {
        // Area to draw
        // The color must be same with backgroundColor
        newImageData.data[i] = 255;
        newImageData.data[i + 1] = 255;
        newImageData.data[i + 2] = 255;
        newImageData.data[i + 3] = 255;
      }
    }

    ctx.putImageData(newImageData, 0, 0);
    console.log(maskCanvas.toDataURL());
  }

  //mask function
  function maskInit(el, x) {
    console.log(1)
    str = x.figBase64;
    //console.log(str)
    var newImg = new Image();
    newImg.src = str;
    newImg.style.position = 'absolute';
    newImg.style.left = 0;
    // console.log(el.clientHeight);
    newImg.width = el.clientWidth;
    newImg.height = el.clientHeight;
    // maskCanvas = init(el, x, newImg);
    vvalue = 128

    ctx = el.firstChild.getContext('2d');

    ctx.drawImage(newImg, 0, 0, canvas.width, canvas.height);
    updateCanvasMask(ctx);





    WordCloud(el.firstChild, {
      list: listData,
      fontFamily: x.fontFamily,
      fontWeight: x.fontWeight,
      color: x.color,
      minSize: x.minSize,
      weightFactor: x.weightFactor,
      backgroundColor: x.backgroundColor,
      gridSize: x.gridSize,
      minRotation: x.minRotation,
      maxRotation: x.maxRotation,
      shuffle: x.shuffle,
      shape: x.shape,
      rotateRatio: x.rotateRatio,
      ellipticity: x.ellipticity,
      clearCanvas: false,
      drawMask: true,
      hover: x.hover || cv_handleHover,
      abortThreshold: 3000
    });
  }

  HTMLWidgets.widget({

    name: 'wordcloud2',

    type: 'output',

    initialize: function (el, width, height) {
      var newCanvas = document.createElement("canvas");
      newCanvas.height = height;
      newCanvas.width = width;
      newCanvas.id = "canvas";

      el.appendChild(newCanvas);
      newlabel(el);
      return (el.firstChild);
    },
    renderValue: function (el, x, instance) {
      // parse gexf data
      listData = [];
      for (var i = 0; i < x.word.length; i++) {
        listData.push([x.word[i], x.freq[i]]);
      }
      if (x.figBase64) {

        maskInit(el, x);
        console.log(3)

      } else {
        WordCloud(el.firstChild, {
          list: listData,
          fontFamily: x.fontFamily,
          fontWeight: x.fontWeight,
          color: x.color,
          minSize: x.minSize,
          weightFactor: x.weightFactor,
          backgroundColor: x.backgroundColor,
          gridSize: x.gridSize,
          minRotation: x.minRotation,
          maxRotation: x.maxRotation,
          shuffle: x.shuffle,
          shape: x.shape,
          rotateRatio: x.rotateRatio,
          ellipticity: x.ellipticity,
          drawMask: x.drawMask,
          maskColor: x.maskColor,
          maskGapWidth: x.maskGapWidth,
          hover: x.hover || cv_handleHover
        });
      }
    },
    resize: function (el, width, height) {
    }

  });
