CREATE TABLE Region (
	Id int PRIMARY KEY,
	Title varchar(50) NOT NULL
);

INSERT INTO Region(Id, Title) VALUES(1, 'Kazakhstan');
INSERT INTO Region(Id, Title) VALUES(2, 'Russia');
INSERT INTO Region(Id, Title) VALUES(3, 'USA');
INSERT INTO Region(Id, Title) VALUES(4, 'German');




CREATE TABLE People (
	Id int PRIMARY KEY IDENTITY,
	Firstname varchar(25) NOT NULL,
	Lastname varchar(25)  NOT NULL,
	RegionId int NOT NULL
	FOREIGN KEY(RegionId) REFERENCES Region(Id)
);

INSERT INTO People(Firstname, Lastname, RegionId) VALUES('Aibek', 'Karataev', 1);
INSERT INTO People(Firstname, Lastname, RegionId) VALUES('Anton', 'Tishin', 1);
INSERT INTO People(Firstname, Lastname, RegionId) VALUES('Samat', 'Yeshenkulov', 1);

INSERT INTO People(Firstname, Lastname, RegionId) VALUES('Sergey', 'Pushkin', 2);
INSERT INTO People(Firstname, Lastname, RegionId) VALUES('Azamat', 'Beketov', 2);

INSERT INTO People(Firstname, Lastname, RegionId) VALUES('Elvis', 'Presli', 3);
INSERT INTO People(Firstname, Lastname, RegionId) VALUES('Gendalf', 'White', 3);
INSERT INTO People(Firstname, Lastname, RegionId) VALUES('Aero', 'Smith', 3);
INSERT INTO People(Firstname, Lastname, RegionId) VALUES('Tomas', 'Medison', 3);

INSERT INTO People(Firstname, Lastname, RegionId) VALUES('Mark', 'Neece', 4);
INSERT INTO People(Firstname, Lastname, RegionId) VALUES('Gans', 'Bell', 4);




CREATE PROCEDURE Get_People
	@StartFrom int,
	@PageSize int
AS
	SELECT TOP(@PageSize)
		ppl.Id,
		ppl.Firstname,
		ppl.Lastname,
		rgn.Id,
		rgn.Title
	FROM People ppl
	JOIN Region rgn ON ppl.RegionId = rgn.Id
	WHERE ppl.Id > @StartFrom;
RETURN 0





CREATE PROCEDURE Update_Person
	@PersonId int,
	@Firstname varchar(25),
	@Lastname varchar(25),
	@RegionId int
AS
	UPDATE People 
	SET
		Firstname = @Firstname,
		Lastname = @Lastname,
		RegionId = @RegionId
	WHERE Id = @PersonId




CREATE PROC Delete_Person
	@PersonId int
AS
	DELETE People WHERE Id = @PersonId