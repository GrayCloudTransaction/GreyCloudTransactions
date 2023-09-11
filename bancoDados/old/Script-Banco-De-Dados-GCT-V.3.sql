DROP SCHEMA IF EXISTS `ScriptGCT` ;
CREATE SCHEMA IF NOT EXISTS `ScriptGCT`;
USE `ScriptGCT`;

DROP TABLE IF EXISTS `ScriptGCT`.`Empresa` ;

CREATE TABLE IF NOT EXISTS `ScriptGCT`.`Empresa` (
  `idEmpresa` INT PRIMARY KEY AUTO_INCREMENT,
  `RazaoSocial` VARCHAR(120),
  `CNPJ` INT,
  `Logradouro` INT,
  `CEP` INT,
  `Email` VARCHAR(150),
  `Telefone` INT
);

DROP TABLE IF EXISTS `ScriptGCT`.`Funcionario` ;

CREATE TABLE IF NOT EXISTS `ScriptGCT`.`Funcionario` (
  `idFuncionario` INT PRIMARY KEY AUTO_INCREMENT,
  `Nome` VARCHAR(120),
  `Email` VARCHAR(150),
  `Senha` VARCHAR(150),
  `Cargo` VARCHAR(90),
  `CPF` INT,
  `Permissao` INT,
  `fkGerente` INT,
  `fkEmpresa` INT,
  FOREIGN KEY (`fkGerente`) REFERENCES `ScriptGCT`.`Funcionario` (`idFuncionario`),
  FOREIGN KEY (`fkEmpresa`) REFERENCES `ScriptGCT`.`Empresa` (`idEmpresa`)
);

DROP TABLE IF EXISTS `ScriptGCT`.`Maquina` ;

CREATE TABLE IF NOT EXISTS `ScriptGCT`.`Maquina` (
  `idMaquina` INT PRIMARY KEY AUTO_INCREMENT,
  `Nome` VARCHAR(60),
  `Codigo` VARCHAR(50),
  `fkEmpresa` INT,
  FOREIGN KEY (`fkEmpresa`) REFERENCES `ScriptGCT`.`Empresa` (`idEmpresa`)
);

DROP TABLE IF EXISTS `ScriptGCT`.`UnidadeMedida` ;

CREATE TABLE IF NOT EXISTS `ScriptGCT`.`UnidadeMedida` (
  `idUnidadeMedida` INT PRIMARY KEY AUTO_INCREMENT,
  `UnidadeDeMedida` VARCHAR(60),
  `TipoMedida` VARCHAR(60)
);

DROP TABLE IF EXISTS `ScriptGCT`.`ModeloComponente`;

CREATE TABLE IF NOT EXISTS `ScriptGCT`.`ModeloComponente`(
  `idModeloComponente` INT PRIMARY KEY AUTO_INCREMENT,
  `Modelo` VARCHAR(60),
  `Fabricante` VARCHAR(60)
);

DROP TABLE IF EXISTS `ScriptGCT`.`SubComponente` ;

CREATE TABLE IF NOT EXISTS `ScriptGCT`.`SubComponente` (
  `idSubComponentes` INT PRIMARY KEY AUTO_INCREMENT,
  `Nome` VARCHAR(60),
  `fkUnidadeMedida` INT,
  `fkModeloComponente` INT,
    FOREIGN KEY (`fkUnidadeMedida`) REFERENCES `ScriptGCT`.`UnidadeMedida` (`idUnidadeMedida`),
    FOREIGN KEY (`fkModeloComponente`) REFERENCES `ScriptGCT`.`ModeloComponente` (`idModeloComponente`)
);

DROP TABLE IF EXISTS `ScriptGCT`.`Registro` ;

CREATE TABLE IF NOT EXISTS `ScriptGCT`.`Registro` (
  `idRegistro` INT PRIMARY KEY AUTO_INCREMENT,
  `ValorRegistro` DOUBLE,
  `DataRegistro` DATETIME,
  `fkSubComponente` INT,
    FOREIGN KEY (`fkSubComponente`) REFERENCES `ScriptGCT`.`SubComponente` (`idSubComponentes`)
);

DROP TABLE IF EXISTS `ScriptGCT`.`Componente` ;

CREATE TABLE IF NOT EXISTS `ScriptGCT`.`Componente` (
  `idComponente` INT PRIMARY KEY AUTO_INCREMENT,
  `fkMaquina` INT,
  `TipoComponente` VARCHAR(60),
  `fkModeloComponente` INT,
    FOREIGN KEY (`fkMaquina`) REFERENCES `ScriptGCT`.`Maquina` (`idMaquina`),
    FOREIGN KEY (`fkModeloComponente`) REFERENCES `ScriptGCT`.`ModeloComponente` (`idModeloComponente`)
);

DROP TABLE IF EXISTS `ScriptGCT`.`MetricaSubComponente` ;

CREATE TABLE IF NOT EXISTS `ScriptGCT`.`MetricaSubComponente` (
  `idMetricaSubComponente` INT PRIMARY KEY AUTO_INCREMENT,
  `MetricaMinima` VARCHAR(50),
  `MetricaMaxima` VARCHAR(50),
  `fkSubComponente` INT,
    FOREIGN KEY (`fkSubComponente`) REFERENCES `ScriptGCT`.`SubComponente` (`idSubComponentes`)
);