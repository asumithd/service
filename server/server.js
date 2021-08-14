const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const documents = {};

const passport = require('passport');
const customerpassport = require('passport');
const keyPublishable = 'pk_test_1gcuA4agFTW8D1qYc9rWfVbX';
const keySecret = 'sk_test_KDzTh4Am9tg70GvcqynpMmky';

// import and create stripe object 
const stripe = require("stripe")(keySecret);

// parse requests of content-type - application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use('/assets', express.static('assets'));

// allow-cors
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // allow preflight
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});



// Error Handing in Middleware
app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500; // Sets a generic server error status code if none is part of the err
    if (err.shouldRedirect) {
        res.render('myErrorPage') // Renders a myErrorPage.html for the user
    } else {
        res.status(err.statusCode).send(err.message); // If shouldRedirect is not defined in our error, sends our original err data
    }
});


const dbConfig = require('./config/database.config.js');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// mongoose.connect(dbConfig.url, { useNewUrlParser: true }).then(() => {
//     console.log('Connected to database');
// }).catch(err => {
//     console.log('Error in database connection', err);
//     process.exit();
// })


mongoose.connect(dbConfig.url, { useNewUrlParser: true });

mongoose.connection.on('error', function(error) {
    console.error('Database connection error:', error);
});

mongoose.connection.once('open', function() {
    console.log('Database connected');
});


mongoose.set('useCreateIndex', true);

app.get('/', (req, res) => {
    res.json('Welcome!!!');
});

require('./app/routes/index.js')(app);
require('./config/passport.config.js');
require('./config/customerpassport.config.js');


app.use(passport.initialize());
app.use(customerpassport.initialize());


app.listen(3000, () => console.log('App listening port 3000'));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({ "message": err.name + ": " + err.message });
    }
});


// socket io

io.on("connection", socket => {
    // console.log('connection starts');
    let previousId;
    const safeJoin = currentId => {
        console.log('currentid', currentId)
        socket.leave(previousId);
        socket.join(currentId);
        previousId = currentId;
    };

    socket.on("getDoc", docId => {
        console.log('getDoc', docId);
        safeJoin(docId);
        socket.emit("document", documents[docId]);
    });

    socket.on("addDoc", doc => {
        console.log('new doc Created', doc)
        documents[doc.id] = doc;
        safeJoin(doc.id);
        io.emit("documents", Object.keys(documents));
        socket.emit("document", doc);
    });

    socket.on("editDoc", doc => {
        console.log('Edit doc', doc);
        documents[doc.id] = doc;
        socket.to(doc.id).emit("document", doc);
    });

    io.emit("documents", Object.keys(documents));
});

http.listen(4444);