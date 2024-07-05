require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const path = require('path')

const app = express();
/* express.json()  parses incoming JSON requests and puts the parsed data in req.body.
 Without `express.json()`, `req.body` is undefined.*/
app.use(express.json());
app.use(cookieParser());
/* The Same Origin Policy is an important security measure that basically says
 “Only requests from the same origin (the same IP address or URL) should be allowed to access this API”.
 So we need to enable Cors */
app.use(cors());
app.use(fileUpload({
    useTempFiles: true
}));

// Routes
app.use('/user', require('./routes/userRouter.js'))
app.use('/api', require('./routes/categoryRouter.js'))
app.use('/api', require('./routes/upload.js'))
app.use('/api', require('./routes/productRouter.js'))

// Connect to MongoDB
const URI = process.env.MONGODB_URL;
mongoose.connect(URI, err => {
    if (err) throw err;
    console.log('Connected to MongoDB');
});

//This variable is automatically setup by render
if(process.env.NODE_ENV === 'production'){
    // It serves the static files of the client-side 
    // application located in the client/build directory using Express's express.static middleware.
    app.use(express.static('client/build'))
    // When a request is made to any URL that hasn't been matched by other routes, the server responds by sending the index.html file 
    // located in the client/build directory back to the client. 
    // This index.html file is the main entry point of the client-side application. 
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })

    //Routing is handled by reactJS

    // This setup is common in modern web applications, especially with React-based applications, 
    // where the server mainly serves the initial HTML file and the client-side 
    // application handles the routing and rendering of different views/pages on the client side. 
}
// Listen Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
