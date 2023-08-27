DROP SCHEMA IF EXISTS `ScriptGCT` ;
CREATE SCHEMA IF NOT EXISTS `ScriptGCT`;
USE `ScriptGCT` ;

DROP TABLE IF EXISTS `ScriptGCT`.`Empresa` ;

CREATE TABLE IF NOT EXISTS `ScriptGCT`.`Empresa` (
  `idEmpresa` INT AUTO_INCREMENT,
  `RazaoSocial` VARCHAR(45),
  `CNPJ` INT,
  `Logradouro` VARCHAR(120),
  `CEP` INT,
  `Email` VARCHAR(150),
  `Telefone` INT,
  PRIMARY KEY (`idEmpresa`)
  );

DROP TABLE IF EXISTS `ScriptGCT`.`Funcionario`;

CREATE TABLE IF NOT EXISTS `ScriptGCT`.`Funcionario` (
  `idFuncionario` INT AUTO_INCREMENT,
  `Nome` VARCHAR(45),
  `Cargo` VARCHAR(45),
  `CPF` INT NULL,
  `Supervisor` INT,
  `fkEmpresa` INT,
  PRIMARY KEY (`idFuncionario`),
  FOREIGN KEY (`fkSupervisor`) REFERENCES `ScriptGCT`.`Funcionario` (`idFuncionario`),
  FOREIGN KEY (`fkEmpresa`) REFERENCES `ScriptGCT`.`Empresa` (`idEmpresa`)
 );

DROP TABLE IF EXISTS `ScriptGCT`.`Maquina` ;

CREATE TABLE IF NOT EXISTS `ScriptGCT`.`Maquina` (
  `idMaquina` INT AUTO_INCREMENT,
  `Nome` VARCHAR(45),
  `Codigo` VARCHAR(45),
  `fkEmpresa` INT,
  PRIMARY KEY (`idMaquina`),
  FOREIGN KEY (`fkEmpresa`) REFERENCES `ScriptGCT`.`Empresa` (`idEmpresa`)
);

DROP TABLE IF EXISTS `ScriptGCT`.`ModeloComponente` ;

CREATE TABLE IF NOT EXISTS `ScriptGCT`.`ModeloComponente` (
  `idModeloComponente` INT AUTO_INCREMENT,
  `Modelo` VARCHAR(45),
  `Marca` VARCHAR(45),
  `TipoComponente` VARCHAR(45),
  `metricaMin` VARCHAR(45),
  `metricaMax` VARCHAR(45),
  PRIMARY KEY (`idModeloComponente`)
);

DROP TABLE IF EXISTS `ScriptGCT`.`Componente` ;

CREATE TABLE IF NOT EXISTS `ScriptGCT`.`Componente` (
  `idComponente` INT AUTO_INCREMENT,
  `fkModeloComponente` INT,
  `Maquina_idMaquina` INT,
  PRIMARY KEY (`idComponente`),
  FOREIGN KEY (`fkModeloComponente`) REFERENCES `ScriptGCT`.`ModeloComponente` (`idModeloComponente`),
  FOREIGN KEY (`Maquina_idMaquina`) REFERENCES `ScriptGCT`.`Maquina` (`idMaquina`)
);

DROP TABLE IF EXISTS `ScriptGCT`.`UnidadeMedida` ;

CREATE TABLE IF NOT EXISTS `ScriptGCT`.`UnidadeMedida` (
  `idUnidadeMedida` INT AUTO_INCREMENT,
  `UnidadeDeMedida` VARCHAR(45),
  `TipoMedida` VARCHAR(45),
  PRIMARY KEY (`idUnidadeMedida`))
;

DROP TABLE IF EXISTS `ScriptGCT`.`SubComponente` ;

CREATE TABLE IF NOT EXISTS `ScriptGCT`.`SubComponente` (
  `idSubComponentes` INT NOT NULL AUTO_INCREMENT,
  `fkComponente` INT NOT NULL,
  `Nome` VARCHAR(120),
  `fkUnidadeMedida` INT,
  PRIMARY KEY (`idSubComponentes`, `fkComponente`),
  FOREIGN KEY (`fkComponente`) REFERENCES `ScriptGCT`.`Componente` (`idComponente`),
  FOREIGN KEY (`fkUnidadeMedida`) REFERENCES `ScriptGCT`.`UnidadeMedida` (`idUnidadeMedida`)
);

DROP TABLE IF EXISTS `ScriptGCT`.`Registro` ;

CREATE TABLE IF NOT EXISTS `ScriptGCT`.`Registro` (
  `idRegistro` INT AUTO_INCREMENT,
  `ValorRegistro` FLOAT,
  `fkSubComponente` INT,
  `DataRegistro` DATETIME,
  PRIMARY KEY (`idRegistro`),
  FOREIGN KEY (`fkSubComponente`) REFERENCES `ScriptGCT`.`SubComponente` (`idSubComponentes`)
);

