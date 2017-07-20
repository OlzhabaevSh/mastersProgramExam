CREATE TABLE Region (
	Id int PRIMARY KEY,
	Title varchar(50) NOT NULL
)

INSERT INTO Region(Id, Title) VALUES(1, 'Kazakhstan')
INSERT INTO Region(Id, Title) VALUES(2, 'Russia')
INSERT INTO Region(Id, Title) VALUES(3, 'USA')
INSERT INTO Region(Id, Title) VALUES(4, 'German')




CREATE TABLE People (
	Id int PRIMARY KEY IDENTITY,
	Firstname varchar(25) NOT NULL,
	Lastname varchar(25)  NOT NULL,
	RegionId int NOT NULL
	FOREIGN KEY(RegionId) REFERENCES Region(Id)
)

INSERT INTO People(Firstname, Lastname, RegionId) VALUES('Aibek', 'Karataev', 1)
INSERT INTO People(Firstname, Lastname, RegionId) VALUES('Anton', 'Tishin', 1)
INSERT INTO People(Firstname, Lastname, RegionId) VALUES('Samat', 'Yeshenkulov', 1)

INSERT INTO People(Firstname, Lastname, RegionId) VALUES('Sergey', 'Pushkin', 2)
INSERT INTO People(Firstname, Lastname, RegionId) VALUES('Azamat', 'Beketov', 2)

INSERT INTO People(Firstname, Lastname, RegionId) VALUES('Elvis', 'Presli', 3)
INSERT INTO People(Firstname, Lastname, RegionId) VALUES('Gendalf', 'White', 3)
INSERT INTO People(Firstname, Lastname, RegionId) VALUES('Aero', 'Smith', 3)
INSERT INTO People(Firstname, Lastname, RegionId) VALUES('Tomas', 'Medison', 3)

INSERT INTO People(Firstname, Lastname, RegionId) VALUES('Mark', 'Neece', 4)
INSERT INTO People(Firstname, Lastname, RegionId) VALUES('Gans', 'Bell', 4)



CREATE PROCEDURE GetPerson
(
	@RegionId int,
	@StartId int,
	@Count
)
AS


