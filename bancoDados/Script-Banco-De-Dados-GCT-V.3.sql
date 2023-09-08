DROP SCHEMA IF EXISTS `ScriptGCT` ;
CREATE SCHEMA IF NOT EXISTS `ScriptGCT`;
USE `ScriptGCT` ;

DROP TABLE IF EXISTS `Empresa` ;

CREATE USER IF NOT EXISTS urubu100 IDENTIFIED BY 'urubu100';
GRANT SELECT, INSERT, UPDATE, DELETE ON ScriptGCT.* TO urubu100;
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS `Empresa` (
  `idEmpresa` INT auto_increment,
  `RazaoSocial` VARCHAR(45),
  `CNPJ` INT,
  `Logradouro` VARCHAR(120),
  `Número` INT,
  `CEP` INT,
  `Email` VARCHAR(45),
  `Telefone` INT,
  PRIMARY KEY (`idEmpresa`)
  ) auto_increment = 10;
  

  
DROP TABLE IF EXISTS `Funcionario` ;

CREATE TABLE IF NOT EXISTS `Funcionario` (
  `idFuncionario` INT auto_increment,
  `Nome` VARCHAR(45),
  `Email` VARCHAR(45),
  `Senha` VARCHAR(45),
  `Cargo` VARCHAR(45),
  `CPF` INT,
  `Permissao` CHAR(1) not null,
   constraint `chkPermissao` check (`Permissao` = '1' or `Permissao` = '2'  or `Permissao` = '3' ),
  -- fkGerente
  `fkGerente` INT,
  `fkEmpresa` INT,
  PRIMARY KEY (`idFuncionario`),
  FOREIGN KEY (`fkGerente`) REFERENCES `Funcionario` (`idFuncionario`),
  FOREIGN KEY (`fkEmpresa`) REFERENCES `Empresa` (`idEmpresa`)
  ) auto_increment = 100;

DROP TABLE IF EXISTS `Maquina` ;

CREATE TABLE IF NOT EXISTS `Maquina` (
  `idMaquina` INT auto_increment,
  `Nome` VARCHAR(45),
  `Codigo` VARCHAR(45),
  `fkEmpresa` INT,
  PRIMARY KEY (`idMaquina`),
  FOREIGN KEY (`fkEmpresa`) REFERENCES `Empresa` (`idEmpresa`)
) auto_increment = 1000;

DROP TABLE IF EXISTS `Metrica` ;

CREATE TABLE IF NOT EXISTS `Metrica` (
  `idMetrica` INT auto_increment,
  `Metrica` VARCHAR(45),
  PRIMARY KEY (`idMetrica`)
  ) auto_increment = 1;

DROP TABLE IF EXISTS `TipoComponente` ;

CREATE TABLE IF NOT EXISTS `TipoComponente` (
  `idTipoComponente` INT auto_increment,
  `Tipo` VARCHAR(45),
  PRIMARY KEY (`idTipoComponente`)
  );

DROP TABLE IF EXISTS `Componente` ;

CREATE TABLE IF NOT EXISTS `Componente` (
  `idComponente` INT auto_increment,
  `Modelo` VARCHAR(45),
  `Marca` VARCHAR(45),
  `fkMetrica` INT,
  `fkTipoComponente` INT,
  `metricaMin` INT,
  `metricaMax` INT,
  PRIMARY KEY (`idComponente`),
  FOREIGN KEY (`fkMetrica`) REFERENCES `Metrica` (`idMetrica`),
  FOREIGN KEY (`fkTipoComponente`) REFERENCES `TipoComponente` (`idTipoComponente`)
  ) auto_increment = 10000;

DROP TABLE IF EXISTS `Registro` ;

CREATE TABLE IF NOT EXISTS `Registro` (
  `fkMaquina` INT auto_increment,
  `fkComponente` INT,
  `idRegistro` INT,
  `ValorRegistro` INT,
  PRIMARY KEY (`idRegistro`),
  FOREIGN KEY (`fkMaquina`) REFERENCES `Maquina` (`idMaquina`),
  FOREIGN KEY (`fkComponente`) REFERENCES `Componente` (`idComponente`)
)auto_increment = 10000;

 -- DESC Empresa;
-- DESC Funcionario;
-- DESC Maquina;
-- DESC Metrica;
-- DESC TipoComponente;
-- DESC Componente;
-- DESC Registro;

INSERT INTO Empresa values 
(null, "Coca-Cola",12345678,"Marco Aurélio", 984, 09260640, "cocacola@gmail.com", 123123123),
(null, "SPTECH",124456789,"Haddock Lobo", 298,0609260641, "sptech@gmail.com", 456456456),
(null, "Amazon",884456889,"Califórnia", 234,0609260641, "amazon@gmail.com", 889877677)
;
-- Select * from Empresa;

Insert into Funcionario values
(null,"Gabriel","gabriel@gmail.com","12345","presidente",09348571, '1', null, 10),
(null,"Raphael","raphael@gmail.com","12345","Analísta Junior",09343343, '2', 100, 10),
(null,"Carlos","carlos@gmail.com","12345","Analísta Sênior",09309848, '1', null, 11)
;
-- select * from Funcionario;

select * from Funcionario where email = "gabriel@gmail.com" and senha = "12345";

Insert into Maquina values
(null, "Servidor-18-08", 024, 10),
(null, "Servidor-19-07", 357, 11),
(null, "Servidor-14-12", 504, 12)
;
-- select * from Maquina;
;