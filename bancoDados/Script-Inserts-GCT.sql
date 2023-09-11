
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