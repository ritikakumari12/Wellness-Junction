## Project Title: 📛

Wellness Junction

## About the Project:

'Wellness Junction' application is built using React on the front end and Node on the backend with all CRUD functions, user authentication, and authorization
using a JWT token. To access the full functionality of the application, users must create an account and log in. A user can use the add-to-cart functionality to buy items.
The website incorporates filtering, sorting, & pagination for easy navigation and quick access to products. An admin panel is also present in which the admin can create,
edit and delete products as well as categories.

## Screenshots:

![Wellness-Junction](https://i.ibb.co/kMcNDFh/SCSD.png)

## Technologies:

<p>
<img src="https://img.shields.io/badge/Client-ReactJS-blue?logo=react">
<img src="https://img.shields.io/badge/Server-NodeJS-green?logo=node.js">
<img src="https://img.shields.io/badge/Server-Express-green?logo=express">
<img src="https://img.shields.io/badge/DataBase-MongoDB-lightgreen?logo=mongoDB">
<img src="https://img.shields.io/badge/Auth-JWT-white?logo=JSON Web Tokens">
</p>

## Setup:

### 1. Clone repo

```
$ git clone git@github.com:ritika-kumari12/Wellness-Junction.git
$ cd Wellness-Junction
```

### 2. Create .env File

- create a .env file in server folder with following environmental variables

```
PORT=
MONGODB_URL=
TOKEN_SECRET=
CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_API_SECRET=
```

### 3. Setup MongoDB

- Local MongoDB
  - Install it from [here](https://www.mongodb.com/try/download/community)
  - In .env file update MONGODB_URI=mongodb://localhost/justajournal
- OR Atlas Cloud MongoDB
  - Create database at [https://cloud.mongodb.com](https://cloud.mongodb.com)
  - In .env file update MONGODB_URI=mongodb+srv://your-db-connection

### 4. Run Backend

```
$ npm install
$ npm start
```

### 5. Run Frontend

```
# open new terminal
$ cd client
$ npm install
$ npm start
```

### 6. Run locally

- Run this on browser: http://localhost:3000
