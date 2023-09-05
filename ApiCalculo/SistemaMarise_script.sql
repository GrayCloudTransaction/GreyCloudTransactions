CREATE DATABASE SistemaMarise;
USE SistemaMarise;

CREATE TABLE Registro(
idRegistro INT PRIMARY KEY AUTO_INCREMENT,
tipoRegistro VARCHAR(100),
valorRegistro FLOAT,
unidadeRegistro VARCHAR(50),
dataHora DATETIME
) auto_increment = 1;

select * from Registro;

CREATE TABLE IF NOT EXISTS `ScriptGCT`.`Registro` (
  `idRegistro` INT PRIMARY KEY AUTO_INCREMENT,
  `ValorRegistro` DOUBLE,
  `DataRegistro` DATETIME,
  `fkSubComponente` INT,
    FOREIGN KEY (`fkSubComponente`) REFERENCES `ScriptGCT`.`SubComponente` (`idSubComponentes`)
);

CREATE TABLE IF NOT EXISTS `ScriptGCT`.`UnidadeMedida` (
  `idUnidadeMedida` INT PRIMARY KEY AUTO_INCREMENT,
  `UnidadeDeMedida` VARCHAR(60),
  `TipoMedida` VARCHAR(60)
);



