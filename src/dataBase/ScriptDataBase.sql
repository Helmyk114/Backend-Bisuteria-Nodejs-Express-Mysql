
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
    
create table state(
	idState int not null auto_increment,
    states varchar(10) not null,
    primary key (idState)
);

insert into state (states)
	values('Creado'),('Procesado'),('Terminado'),('Activo'),('Inactivo'),('Pagado'),('En proceso'),('Pago');
    
create table products(
	idProduct varchar(50) not null unique,
    nameProduct varchar(50) not null,
    price int not null,
    laborPrice int not null,
    image varchar(250) not null,
    idCategory int not null,
    idState int not null,
    primary key (idProduct),
    foreign key (idCategory) references category(idCategory),
    foreign key (idState) references state(idState)
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
    userName varchar(30) not null unique,
    password varchar(300) not null,
    photo varchar(250) not null,
    idRole int not null,
    idBank int not null,
    numberBank varchar(15) not null,
    idState int not null,
    primary key (idCardWorker),
    foreign key (idRole) references role(idRole),
    foreign key (idBank) references bank(idBank),
	foreign key (idState) references state(idState)
);

create table client(
    idCardClient int not null,
    clientname varchar(100) not null,
    clientAddress varchar(250) not null,
    clientPhone varchar(15) not null,
    primary key (idCardClient)
);

create table orders(
	idOrder varchar(50) not null unique,
    idCardWorker int not null,
    orderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total int not null,
    quantityProducts int not null,
    idState int not null,
    primary key (idorder),
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
    subTotal int not null,
    maxQuantity int not null,
    idProduct varchar(50) not null,
    idOrder varchar(50) not null,
    primary key (idOrderDetail),
    foreign key (idProduct) references products(idProduct),
    foreign key (idOrder) references orders(idOrder)
);

create table workList(
	idWorkList varchar(50) not null unique,
    listName varchar(50) not null,
    total int not null,
    creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    idCardWorker int not null,
    idState int not null,
    primary key (idWorkList),
    foreign key (idCardWorker) references worker(idCardWorker),
    foreign key (idState ) references state(idState)
);

create table listDetail(
	idListDateil int not null auto_increment,
    quantity int not null,
    subTotal int not null,
    idWorkList varchar(50) not null,
    idProduct varchar(50) not null,
    primary key (idListDateil),
    foreign key (idWorkList) references workList(idWorkList),
    foreign key (idProduct) references products(idProduct)
);

create table orderList(
	idOrderList int not null auto_increment,
    idOrder varchar(50) not null,
    idWorkList varchar(59) not null,
    primary key (idOrderList),
    foreign key (idWorkList) references workList(idWorkList),
    foreign key (idOrder) references orders(idOrder)
);

create table notification(
	idNotification int not null auto_increment,
    title varchar(250) not null,
    message varchar(500) not null,
    orderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    idCardWorker int not null,
    primary key (idNotification),
    foreign key (idCardWorker) references worker(idCardWorker)
);