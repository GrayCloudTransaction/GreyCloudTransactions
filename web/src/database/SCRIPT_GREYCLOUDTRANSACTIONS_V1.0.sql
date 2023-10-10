-- Active: 1696953654739@@127.0.0.1@3306@ScriptGCT
DROP DATABASE ScriptGCT;
CREATE DATABASE IF NOT EXISTS `ScriptGCT` DEFAULT CHARACTER SET utf8 ;
USE `ScriptGCT`;

CREATE TABLE IF NOT EXISTS `componente` (
  `id_componente` INT NOT NULL auto_increment,
  `tipo_componente` VARCHAR(60) NULL,
  PRIMARY KEY (`id_componente`))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `empresa` (
  `id_empresa` INT NOT NULL auto_increment,
  `razao_social` VARCHAR(120) NULL,
  `cnpj` CHAR(18) NULL,
  `numero_imovel` INT NULL,
  `cep` CHAR(9) NULL,
  `email` VARCHAR(150) NULL,
  `telefone` VARCHAR(13) NULL,
  PRIMARY KEY (`id_empresa`)
);

CREATE TABLE IF NOT EXISTS `chamados` (
  `id_chamados` INT NOT NULL auto_increment,
  `titulo` VARCHAR(60) NULL,
  `descricao` VARCHAR(200) NULL,
  `data_hora` DATETIME NULL,
  `status` VARCHAR(30) NULL,
  `fk_componente` INT NOT NULL,
  `fk_empresa` INT NOT NULL,
  PRIMARY KEY (`id_chamados`),
  FOREIGN KEY (`fk_componente`) REFERENCES `componente` (`id_componente`) ON DELETE CASCADE,
  FOREIGN KEY (`fk_empresa`) REFERENCES `empresa` (id_empresa) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `funcionario` (
  `id_funcionario` INT NOT NULL primary key auto_increment,
  `nome` VARCHAR(120) NULL,
  `email` VARCHAR(150) NULL,
  `senha` VARCHAR(150) NULL,
  `cargo` VARCHAR(90) NULL,
  `cpf` CHAR(14) NULL,
  `permissao` INT NOT NULL,
  `fk_gerente` INT,
  `fk_empresa` INT NOT NULL,
  FOREIGN KEY (`fk_gerente`) REFERENCES funcionario(`id_funcionario`) ON DELETE CASCADE,
  FOREIGN KEY (`fk_empresa`) REFERENCES empresa(`id_empresa`) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS `servidor` (
  `id_servidor` INT NOT NULL auto_increment,
  `nome` VARCHAR(60) NULL,
  `codigo` VARCHAR(50) NULL,
  `tipo` VARCHAR(100) NULL,
  `descricao` VARCHAR(200) NULL,
  `fk_empresa` INT NOT NULL,
  PRIMARY KEY (`id_servidor`),
  FOREIGN KEY (`fk_empresa`) REFERENCES `empresa` (`id_empresa`) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS `unidade_medida` (
  `id_unidade_medida` INT NOT NULL auto_increment,
  `unidade_medida` VARCHAR(60) NULL,
  `tipo_medida` VARCHAR(60) NULL,
  `fk_componente` INT NOT NULL,
  PRIMARY KEY (`id_unidade_medida`),
  FOREIGN KEY (`fk_componente`) REFERENCES `componente` (`id_componente`) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS `modelo_componente` (
  `id_modelo_componente` INT NOT NULL auto_increment,
  `modelo` VARCHAR(50) NULL,
  `fabricante` VARCHAR(60) NULL,
  `fk_servidor` INT NOT NULL,
  `fk_componente` INT NOT NULL,
  `metrica_maxima` VARCHAR(45) NULL,
  PRIMARY KEY (`id_modelo_componente`), 
  FOREIGN KEY (`fk_servidor`) REFERENCES `servidor` (`id_servidor`) ON DELETE CASCADE,
  FOREIGN KEY (`fk_componente`) REFERENCES `componente` (`id_componente`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `registro` (
  `id_registro` INT NOT NULL auto_increment,
  `valor_registro` DOUBLE NULL,
  `data_registro` DATETIME NULL,
  `fk_modelo_componente` INT NOT NULL,
  PRIMARY KEY (`id_registro`),
  FOREIGN KEY (`fk_modelo_componente`) REFERENCES `modelo_componente` (`id_modelo_componente`) ON DELETE CASCADE
);

-- Cadastro de Empresas
INSERT INTO `empresa` (`razao_social`, `cnpj`, `numero_imovel`, `cep`, `email`, `telefone`) 
VALUES ('Pague Seguro',"61.186.888/0093-01", 763, '09260-640', 'pagueSeguro@gmail.com', '123123123')
	, ('SPTECH', "61.186.888/0093-01", 298,'09260-640', 'sptech@gmail.com', '456456456')
	, ('Amazon', "61.186.888/0093-01", 234,'09260-640', 'amazon@gmail.com', '889877677');
Select * from `empresa`;


-- Cadastro de Gerentes
INSERT INTO `funcionario` (`nome`, `email`, `senha`, `cargo`, `cpf`, `permissao`, `fk_gerente`, `fk_empresa`)
VALUES ('Gabriel', 'gabriel@gmail.com', '12345', 'Gerente', '690.969.360-43', '1', null, 1)
	, ('Fernando Brandão', 'fernado@gmail.com', '12345', 'Presidente', '226.146.010-47', '1', null, 2)
    , ('Cláudio', 'claudio@gmail.com', '12345', 'Gerente', '810.791.190-35', '1', null, 3);


-- Cadastro de Funcionários
INSERT INTO `funcionario` (`nome`, `email`, `senha`, `cargo`, `cpf`, `permissao`, `fk_gerente`, `fk_empresa`)
values ('Cleiton Rodrigues', 'cleiton@gmail.com', '12345', 'Analísta Junior', "514.184.580-07", '2', 1, 1)
	, ('Carlos Souza', 'carlos@gmail.com', '12345', 'Analísta Sênior', "541.886.660-56", '1', 2, 2)
    , ('Pedro Henrique', 'pedro@gmail.com', '12345', 'Analísta Sênior', "091.045.750-67", '1', 3, 3);

SELECT * FROM `funcionario`;

-- Cadastro de Servidores 
INSERT INTO `servidor` (`nome`, `codigo`, `tipo`, `descricao`, `fk_empresa`)
VALUES ('SERVER-AHRL1NB', 'XPTO-0987', 'Servidor Principal', 'Servidor responsável por executar X tarefa', 1)
	, ('SERVER-9HJD2AL', 'XP-9384', 'Servidor de Backup', 'Servidor responsável por backups', 1)
    , ('SERVER-UHD71P6', 'LOC-0284', 'Servidor de Homologação', 'Servidor responsável por Homologações ', 1);


-- Cadastro de Componentes
INSERT INTO `componente` (`tipo_componente`) VALUES 
('CPU'),
('RAM'),
('Disco');



-- Cadastro de Modelo de Componentes
INSERT INTO `modelo_componente` (`modelo`, `fabricante`, `fk_servidor`, `fk_componente`, `metrica_maxima`)
VALUES
('Intel Core i7 13700K', 'Intel', 1, 1, '70'),
('AMD Ryzen 7 7800X', 'AMD', 1, 1, '70'),
('Apple M1 Max', 'Apple', 1, 1, '70'),
('DDR4 3200MHz 16GB', 'Corsair', 1, 2, '70'),
('DDR5 4800MHz 32GB', 'G.Skill', 1, 2, '70'),
('LPDDR5 6400MHz 64GB', 'Samsung', 1, 2, '70'),
('Samsung 980 Pro 1TB', 'Samsung', 1, 3, '70'),
('WD Black SN850 2TB', 'Western Digital', 1, 3, '70'),
('Seagate FireCuda 530 4TB', 'Seagate', 1, 3, '70');

-- Cadastro de Registros (para modelo de componentes)
-- CPU
INSERT INTO `registro` (`valor_registro`, `data_registro`, `fk_modelo_componente`) VALUES
(8, "2023-10-09 14:05:32", 1), -- qtdCores
(16, "2023-10-09 14:05:32", 1), -- qtdThreads
(10, "2023-10-09 14:05:32", 1), -- temposCpu.user
(20, "2023-10-09 14:05:32", 1), -- temposCpu.system
(70, "2023-10-09 14:05:32", 1), -- temposCpu.idle
(70, "2023-10-09 14:05:32", 1), -- UtilizacaoCore
(70, "2023-10-09 14:05:32", 1), -- porcentagemUtilizacaoCPU
(3.5, "2023-10-09 14:05:32", 1), -- frequenciaCpu.current
(2.5, "2023-10-09 14:05:32", 1); -- freqCpuMin

-- Disco
INSERT INTO `registro` (`valor_registro`, `data_registro`, `fk_modelo_componente`) VALUES
(1000, "2023-10-09 14:05:32", 7), -- Quantidade total de massa
(750, "2023-10-09 14:05:32", 7), -- Quantidade livre de massa
(250, "2023-10-09 14:05:32", 7), -- Quantidade de massa em uso
(25, "2023-10-09 14:05:32", 7); -- Porcentagem em uso

-- RAM
INSERT INTO `registro` (`valor_registro`, `data_registro`, `fk_modelo_componente`) VALUES
(16, "2023-10-09 14:05:32", 4), -- ramByteToGigabyteTotal
(12, "2023-10-09 14:05:32", 4), -- ramByteToGigabyteDisponivel
(4, "2023-10-09 14:05:32", 4), -- ramByteToGigabyteUsando
(12, "2023-10-09 14:05:32", 4), -- ramByteToGigabyteLivre
(25, "2023-10-09 14:05:32", 4); -- ramPercentualUtilizado