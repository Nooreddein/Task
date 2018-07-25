const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mongo');
const session = require('express-session'); 
const path = require('path'); 
const app = express();
const bcrypt = require('bcrypt'); 
const saltRounds = 10; 
const helper = require('../helper/uitilty');
 app.use(express.static(__dirname + '/../react-client/dist'));

 app.use(bodyParser.json({limit: '50mb'})); 
 app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); 
 app.use(session({
     secret: 'very very secret', 
     resave: true, 
     saveUninitialized: true
 })); 

 app.get('/*', (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, '../react-client/dist/index.html')))
});

const PORT = process.env.PORT || 3000; 

if (!module.parent) {
    app.listen(PORT, () => {
        console.log(`The Port : ${PORT}`);
    });
}

module.exports = app;
