CREATE TABLE Category(
	id serial not null primary key,
	name VARCHAR(50) not null
);

Create table Recipe(
	id serial not null primary key,
	name varchar(80) not null,
	slug varchar(80) not null,
	chef varchar(120) not null,
	preparation varchar(5000) null,
	raters int not null,
	rating decimal(3,2) not null,
	categoryId integer not null,
	foreign key (categoryId) references Category(id)
);

Create table Ingredient(
	id serial not null primary key,
	name varchar(120) not null,
	amount varchar(50) not null,
	recipeId integer not null,
	foreign key(recipeId) references Recipe(id)
);

Create table Comment(
	id serial not null primary key,
	content varchar(250) not null,
	recipeId integer not null,
	foreign key(recipeId) references Recipe(id)
);