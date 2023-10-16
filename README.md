# user-service
User Mirco Service for Pratilipi Assignment

## Usage
### initiate
```
npm i
```
```
npm docker:compose
```
in another terminal
```
npm run start
```

## Database used
POSTGRESQL

## Swagger Doc
```
http://localhost:9088/doc.html
```

## for database:
```
create database pratilipi_user_db;
create user pratilipi with password 'pratilipi';
grant all privileges on database "pratilipi_user_db" to pratilipi;
```
### to add schema
```
psql -U pratilipi -d pratilipi_user_db -f ./schema.sql
```

## Postman:
```
https://api.postman.com/collections/15620684-82d33233-e0f3-4cef-9654-abfda8dba25e?access_key=PMAT-01HCTV1CQRHTYGTXBJEQ9K5YC9
``` 