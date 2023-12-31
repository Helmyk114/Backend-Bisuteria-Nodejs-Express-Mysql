
drop schema if exists irisbisuteria;

create database irisbisuteria;
use irisbisuteria;

create table category (
	idCategory int not null auto_increment,
    categorys varchar(10),
    primary key (idCategory)
);

insert into category (categorys)
	values('Pulceras'),('Chokers'),('Anillos'),('Aretas');
    
create table products(
	idProduct varchar(50) not null unique,
    nameProduct varchar(25) not null,
    price int not null,
    laborPrice int not null,
    image varchar(250) not null,
    idCategory int not null,
    primary key (idProduct),
    foreign key (idCategory) references category(idCategory)
);

create table role(
	idRole int not null auto_increment,
    roles varchar(20) not null,
    primary key (idRole)
);

insert into role (roles)
	values('Administrador'),('Artesano'),('Vendedor');
    
create table bank(
	idBank int not null auto_increment,
    banks varchar(20),
    primary key (idBank)
);

insert into bank (banks)
	values('Bancolombia'),('Daviplata'),('Nequi');

create table worker(
	idCardWorker int not null unique,
    workerName varchar(50) not null,
    workerLastName varchar(50) not null,
    workerEmail varchar(100) not null,
    workerPhone varchar(15) not null,
    userName varchar(20) not null unique,
    password varchar(225) not null,
    photo varchar(250) not null,
    idRole int not null,
    primary key (idCardWorker),
    foreign key (idRole) references role(idRole)
);
    
create table bankAccount(
	idCardWorker int not null unique,
    accountNumber int not null unique,
    idBank int not null,
    primary key (idCardWorker),
    foreign key (idCardWorker) references worker(idCardWorker),
    foreign key (idBank) references bank(idBank)
);

create table client(
    idCardClient int not null,
    clientname varchar(100) not null,
    clientAddress varchar(250) not null,
    clientPhone varchar(15) not null,
    primary key (idCardClient)
);

create table state(
	idState int not null auto_increment,
    states varchar(10) not null,
    primary key (idState)
);

insert into state (states)
	values('Creado'),('En proceso'),('Terminado');

create table orders(
	idOrder varchar(50) not null unique,
    idCardClient int not null,
    idCardWorker int not null,
    orderDate DATE,
    finishDate date not null,
    idState int not null,
    primary key (idorder),
    foreign key (idCardClient) references client(idCardClient),
    foreign key (idCardWorker) references worker(idCardWorker),
    foreign key (idState ) references state(idState)
);

create table orderClient(
	idOrderClient int not null auto_increment,
    idOrder varchar(50) not null,
    idCardClient int not null,
    primary key (idOrderClient),
    foreign key (idOrder) references orders(idOrder),
    foreign key (idCardClient) references client(idCardClient)
);

create table orderDetail(
	idOrderDetail int not null auto_increment,
    quantity int not null,
    total int not null,
    idProduct varchar(50) not null,
    idOrder varchar(50) not null,
    primary key (idOrderDetail),
    foreign key (idProduct) references products(idProduct),
    foreign key (idOrder) references orders(idOrder)
);

create table workList(
	idWorkList int not null auto_increment,
    listName varchar(50) not null,
    creationDate date,
    idCardWorker int not null,
    idState int not null,
    primary key (idWorkList),
    foreign key (idCardWorker) references worker(idCardWorker),
    foreign key (idState ) references state(idState)
);

create table listDetail(
	idListDateil int not null auto_increment,
    idWorkList int not null,
    idProduct varchar(50) not null,
    primary key (idListDateil),
    foreign key (idWorkList) references workList(idWorkList),
    foreign key (idProduct) references products(idProduct)
)

