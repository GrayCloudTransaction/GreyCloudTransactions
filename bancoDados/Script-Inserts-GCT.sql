INSERT INTO Empresa values 
(null, 'Coca-Cola',12345678,'Marco Aurélio', 984,'09260640', 'cocacola@gmail.com', 123123123),
(null, 'SPTECH',124456789,'Haddock Lobo', 298,'09260640', 'sptech@gmail.com', 456456456),
(null, 'Amazon',884456889,'Califórnia', 234,'09260640', 'amazon@gmail.com', 889877677)
;
Select * from Empresa;

Insert into Funcionario values
(null,'Gabriel','gabriel@gmail.com','12345','presidente','09348571', '1', null, 1);

insert into Funcionario values
(null,'Raphael','raphael@gmail.com','12345','Analísta Junior',09343343, '2', 1, 1),
(null,'Carlos','carlos@gmail.com','12345','Analísta Sênior',09309848, '1', null, 2)
;
desc Funcionario;

-- Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (`scriptgct`.`funcionario`, CONSTRAINT `funcionario_ibfk_1` FOREIGN KEY (`fkGerente`) REFERENCES `funcionario` (`idFuncionario`))


select * from Funcionario;

select * from Funcionario where email = 'gabriel@gmail.com' and senha = '12345';

Insert into Maquina values
(null, 'Servidor-18-08', 024, 1),
(null, 'Servidor-19-07', 357, 2),
(null, 'Servidor-14-12', 504, 3);