create database if not exists my_app1;

use my_app1;

create table posts(
    id varchar(100),
    username varchar(100),
    title varchar(300) default "add Title please",
    description varchar(1000),
    filename varchar(200),
    filepath varchar(200)
);