DROP SCHEMA IF EXISTS `ScriptGCT` ;
CREATE SCHEMA IF NOT EXISTS `ScriptGCT`;
USE `ScriptGCT` ;

DROP TABLE IF EXISTS `ScriptGCT`.`Empresa` ;

CREATE TABLE IF NOT EXISTS `ScriptGCT`.`Empresa` (
  `idEmpresa` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `RazaoSocial` VARCHAR(120) NOT NULL,
  `CNPJ` CHAR(14)  NOT NULL,
  `Logradouro` VARCHAR(55) NOT NULL,
  `Numero` INT  NOT NULL,
  `CEP` CHAR(8)  NOT NULL,
  `Email` VARCHAR(150) NOT  NULL,
  `Telefone` CHAR(11)  NOT NULL
);

DROP TABLE IF EXISTS `ScriptGCT`.`Funcionario` ;

CREATE TABLE IF NOT EXISTS `ScriptGCT`.`Funcionario` (
  `idFuncionario` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `Nome` VARCHAR(120) NULL,
  `Email` VARCHAR(150) NULL,
  `Senha` VARCHAR(150) NULL,
  `Cargo` VARCHAR(90) NULL,
  `CPF` CHAR(11) NULL,
  `Permissao` CHAR(1) not null,
   constraint `chkPermissao` check (`Permissao` = '1' or `Permissao` = '2'  or `Permissao` = '3' ),
  `fkGerente` INT,
  `fkEmpresa` INT NOT NULL,
    FOREIGN KEY (`fkGerente`) REFERENCES `ScriptGCT`.`Funcionario` (`idFuncionario`),
    FOREIGN KEY (`fkEmpresa`) REFERENCES `ScriptGCT`.`Empresa` (`idEmpresa`)
   );

DROP TABLE IF EXISTS `ScriptGCT`.`Maquina` ;

CREATE TABLE IF NOT EXISTS `ScriptGCT`.`Maquina` (
  `idMaquina` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `Nome` VARCHAR(60) NULL,
  `Codigo` VARCHAR(50) NULL,
  `fkEmpresa` INT NOT NULL,
  FOREIGN KEY (`fkEmpresa`) REFERENCES `ScriptGCT`.`Empresa` (`idEmpresa`)
);

DROP TABLE IF EXISTS `ScriptGCT`.`UnidadeMedida` ;

CREATE TABLE IF NOT EXISTS `ScriptGCT`.`UnidadeMedida` (
  `idUnidadeMedida` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `UnidadeDeMedida` VARCHAR(60) NULL,
  `TipoMedida` VARCHAR(60) NULL
  );

DROP TABLE IF EXISTS `ScriptGCT`.`Componente` ;

CREATE TABLE IF NOT EXISTS `ScriptGCT`.`Componente` (
  `idComponente` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `TipoComponente` VARCHAR(60) NULL
  );

DROP TABLE IF EXISTS `ScriptGCT`.`SubComponente` ;

CREATE TABLE IF NOT EXISTS `ScriptGCT`.`SubComponente` (
  `idSubComponentes` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `Nome` VARCHAR(60) NULL,
  `fkUnidadeMedida` INT NOT NULL,
  `fkComponente` INT NOT NULL,
  FOREIGN KEY (`fkUnidadeMedida`) REFERENCES `ScriptGCT`.`UnidadeMedida` (`idUnidadeMedida`),
  FOREIGN KEY (`fkComponente`) REFERENCES `ScriptGCT`.`Componente` (`idComponente`)
);

DROP TABLE IF EXISTS `ScriptGCT`.`Registro` ;

CREATE TABLE IF NOT EXISTS `ScriptGCT`.`Registro` (
  `idRegistro` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `ValorRegistro` DOUBLE NULL,
  `DataRegistro` DATETIME NULL,
  `fkSubComponente` INT NOT NULL,
    FOREIGN KEY (`fkSubComponente`) REFERENCES `ScriptGCT`.`SubComponente` (`idSubComponentes`)
);

DROP TABLE IF EXISTS `ScriptGCT`.`MetricaSubComponente` ;

CREATE TABLE IF NOT EXISTS `ScriptGCT`.`MetricaSubComponente` (
  `idMetricaSubComponente` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `MetricaMinima` VARCHAR(50) NULL,
  `MetricaMaxima` VARCHAR(50) NULL,
  `fkSubComponente` INT NOT NULL,
    FOREIGN KEY (`fkSubComponente`) REFERENCES `ScriptGCT`.`SubComponente` (`idSubComponentes`)
);

DROP TABLE IF EXISTS `ScriptGCT`.`ModeloComponente` ;

CREATE TABLE IF NOT EXISTS `ScriptGCT`.`ModeloComponente` (
  `idModeloComponente` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `Modelo` VARCHAR(50) NULL,
  `Fabricante` VARCHAR(60) NULL,
  `fkMaquina` INT NOT NULL,
  `fkComponente` INT NOT NULL,
    FOREIGN KEY (`fkMaquina`) REFERENCES `ScriptGCT`.`Maquina` (`idMaquina`),
    FOREIGN KEY (`fkComponente`) REFERENCES `ScriptGCT`.`Componente` (`idComponente`)
);

select * from Empresa;
select * from Funcionario;