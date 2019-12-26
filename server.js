var express = require('express');
var mongoose = require('./assets/mongoose');
var cookieParser = require('cookie-parser')
var session = require("express-session");
var app = express();

//set up template engine
app.set('view engine', 'ejs');

app.use(cookieParser())
//static files
app.use(express.static('./public'))

//fire controllers
mongoose(app);



// app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 3600000, httpOnly: true }
  }))

  
//listen to port
app.listen(8000);
console.log('You are listening to port 8000');