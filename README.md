# quizapp-api-sequelize-jwt-auth
This is a mini quiz app rest API made with Nodejs, Sequelize, JWT, Express and MySQL

# Live demo
Check [here](https://quizapi.emmynem.com) for live demo

### Default Admin Details
`email` - `johndoe@example.com`

`password` - `John-Doe-1`

# Header
Accepts : x-access-token **for authentication

# Routes

## Auth Routes
Login for Admin, visit `POST` - ```/api/auth/backoffice/signin```

Signup for Admin, visit `POST` - ```/api/auth/backoffice/signup```


Login for User, visit `POST` -  ```/api/auth/signin```

Signup for User, visit `POST` -  ```/api/auth/signup```

## Question Routes
Get Questions, visit `GET` -  ```/api/questions```

Get Question, visit `GET` -  ```/api/question```


Get Questions - Admin, visit `GET` -  ```/api/backoffice/questions``` **requires authentication

Get Question - Admin, visit `GET` -  ```/api/backoffice/question``` **requires authentication

Add Question - Admin, visit `POST` -  ```/api/backoffice/question``` **requires authentication

Edit Question - Admin, visit `PUT` -  ```/api/backoffice/question/update``` **requires authentication

Delete Question - Admin, visit `DELETE` -  ```/api/backoffice/question/remove``` **requires authentication

## Admin Routes
Get Admins, visit `GET` -  ```/api/backoffice/admins``` **requires authentication

Get Admin, visit `GET` -  ```/api/backoffice/admin``` **requires authentication

Add Admin, visit `POST` -  ```/api/backoffice/admin``` **requires authentication

Edit Admin Details, visit `PUT` -  ```/api/backoffice/admin/update``` **requires authentication

Delete Admin, visit `DELETE` -  ```/api/backoffice/admin/remove``` **requires authentication

## User Routes
Get Users - Admin, visit `GET` -  ```/api/backoffice/users``` **requires authentication

Get User, visit `GET` -  ```/api/user``` **requires authentication

Edit User, visit `PUT` -  ```/api/user``` **requires authentication

Delete User, visit `DELETE` -  ```/api/user``` **requires authentication

## Result Routes
Get Results - Admin, visit `GET` -  ```/api/backoffice/results``` **requires authentication

Get Results - User, visit `GET` -  ```/api/results``` **requires authentication

Add Result - User, visit `POST` -  ```/api/result``` **requires authentication
 
# Project install
```
npm install
```

# Run
```
npm run start
```

## Run - dev (watch)
```
npm run start:dev
```
