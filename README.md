## Overview
This is an application that registers participants in a census-application. It works by publishing relevant data regarding participants.
It's runs ONLY in backend. All requests must be sendt via Postman or other similar tools.
All requests require Basic Auth in Postman. Correct username and password are necessary.


# Application Installation and Usage Instructions
Clone the repository:

git clone aug25ft-api-ca-1-MagnusFlod-1
cd aug25ft-api-ca-1-MagnusFlod-1

Install dependencies:

npm install

Start the application:

npm start



## Commands that was used in Terminal/PowerShell

npm install -g express-generator

npm install

npm install seqielize

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



## Authentication



## API Endpoints



## Technologies Used