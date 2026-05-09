## Overview
This is an application that registers participants in a census-application.
It works by publishing, viewing, changing and removing relevant data regarding participants.
It's runs only in backend. All requests must be sendt via Postman or other similar tools.
The app is Deployed on Render. The server is located in Frankfurt. Central EU.
When the app is live, every request is sendt back and forth between the user and Frankfurt.


# Application Installation and Usage Instructions
Clone the repository:

git clone https://github.com/MagnusFlod/aug25ft_srv_ca_1_MagnusFlod
cd aug25ft_srv_ca_1_MagnusFlod

Install dependencies:

npm install

Start the application:

npm start



## Commands that was used in Terminal/PowerShell

npm install -g express-generator

npm install

npm install sequelize

npm install dotenv

npm install mysql2


## Environment Variables Example

Make a .env-file in the root of the project-folder and include the following:

HOST=your_aiven_host
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_password
DATABASE_NAME=censusAPI
DB_PORT=21178
DIALECT=mysql
PORT=3000


## Database Setup
CREATE DATABASE censusAPI;
USE censusAPI;


## Authentication
Go to authorization-field in Postman. Select 'basic auth'.
Write correct username and password.
This has to be done on every API-endpoint. Notice the 'isAuth-call' on the start of every API request in routes/participants.js
The username and password are coded in the middleware/middleware.js-file.


## API Endpoints for both development-phase and after deployment

# Participant list
POST http://localhost:3000/participant/add
POST https://aug25ft-srv-ca-1-magnusflod.onrender.com/participant/add

GET http://localhost:3000/participant
GET https://aug25ft-srv-ca-1-magnusflod.onrender.com/participant


# Participant details
GET http://localhost:3000/participant/details
GET https://aug25ft-srv-ca-1-magnusflod.onrender.com/participant/details


GET http://localhost:3000/participant/details/examplemail@example.com
GET https://aug25ft-srv-ca-1-magnusflod.onrender.com/participant/details/examplemail@example.com


GET http://localhost:3000/participant/work/examplemail@example.com
GET https://aug25ft-srv-ca-1-magnusflod.onrender.com/participant/work/examplemail@example.com


GET http://localhost:3000/participant/home/examplemail@example.com
GET https://aug25ft-srv-ca-1-magnusflod.onrender.com/participant/home/examplemail@example.com


# Deleting / Updating the participant
DELETE http://localhost:3000/participant/examplemail@example.com
DELETE https://aug25ft-srv-ca-1-magnusflod.onrender.com/participant/examplemail@example.com


PUT http://localhost:3000/participant/examplemail@example.com
PUT https://aug25ft-srv-ca-1-magnusflod.onrender.com/participant/examplemail@example.com



## Technologies Used
Node.js
Express.js
MySQL
Sequelize