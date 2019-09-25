//imports
const express = require('express')
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


//initializing app for express
const app = express();
//import Routes
const userRoutes = require('./routes/user');

//connect to db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to mongodb Database'))
    .catch(err => console.log(`could not connect to database: ${err}`))

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//middleware to protect against cors errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        res.status(200).json({});
    }
    next();
});

//Routes
app.get('/', (req, res) => {
    res.status(200).send('HELLO WORLD')
});
// app.get('/user', userRoutes)

//Error Handlers
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

//Server Listener
const port = process.env.PORT || 1234
app.listen(port, () => console.log(`Server running on port ${port} 🔥`));