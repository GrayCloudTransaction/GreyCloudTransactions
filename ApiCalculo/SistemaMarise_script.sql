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
