CREATE DATABASE SistemaMarise;
USE SistemaMarise;

CREATE TABLE Registro(
idRegistro INT PRIMARY KEY AUTO_INCREMENT,
idServidor INT,
tipoRegistro VARCHAR(100),
valorRegistro FLOAT,
unidadeRegistro VARCHAR(50),
dateNow DATETIME
) auto_increment = 1;

select * from Registro;

select tipoRegistro, unidadeRegistro from registro order by tipoRegistro ;

create view cpu_porcentagem as select idServidor, valorRegistro, unidadeRegistro, dateNow from registro where unidadeRegistro = '%' and tipoRegistro like 'Porcentagem%';
create view ram_porcentagem as select idServidor, valorRegistro, unidadeRegistro, dateNow from registro where unidadeRegistro = '%' and tipoRegistro like 'Memória RAM%';
create view disco_porcentagem as select idServidor, valorRegistro, unidadeRegistro, dateNow from registro where unidadeRegistro = '%' and tipoRegistro like 'Memória de%';

select * from ram_porcentagem;
select * from cpu_porcentagem;
select* from disco_porcentagem;

drop view view_dados;
create view view_dados as 
	select cpu_porcentagem.idServidor as 'Servidor', cpu_porcentagem.valorRegistro as 'CPU',
		ram_porcentagem.valorRegistro as 'RAM',disco_porcentagem.valorRegistro as 'DISCO', cpu_porcentagem.unidadeRegistro as 'Unidade de medida', cpu_porcentagem.dateNow as 'Data Hora CPU',
        ram_porcentagem.dateNow as 'Data Hora RAM', disco_porcentagem.dateNow as 'Data Hora DISCO'
	from cpu_porcentagem join ram_porcentagem join disco_porcentagem;

select * from view_dados;

