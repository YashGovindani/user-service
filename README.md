# user-service
User Mirco Service for Pratilipi Assignment



## for database:
```
create database pratilipi_user_db;
create user pratilipi with password 'pratilipi';
grant all privileges on database "pratilipi_user_db" to pratilipi;
```
### to add schema
```
psql -U pratilipi -d pragati_user_db -f ./schema.sql
```