const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mongo/index');
const session = require('express-session');
const path = require('path');
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const helper = require('../helper/uitilty');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
    function(username, password, done) {
      db.Users.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));
app.use(express.static(__dirname + '/../react-client/dist'));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'very very secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/signup', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email
    db.Users.findOne({ username: username }, (err, data) => {
        if (err) {
            throw err
        } else {
            if (data.length > 0) {
                res.sendStatus(401)
            } else {
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    if (err) {
                        throw err
                    } else {
                        bcrypt.hash(password, salt, (err, hash) => {
                            if (err) {
                                throw err
                            } else {
                                let user = new db.Users({
                                    username: username,
                                    email: email,
                                    password: hash
                                })
                                user.save((err, data) => {
                                    if(err){
                                        throw err
                                    }else{
                                        helper.createSession(req, res, data.username); 
                                    } 
                                })
                            }
                        })
                    }

                })
            }
        }
    })

})


app.post('/login', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    db.Users.findOne({ username: username }, (err, data) => {
        if (err) {
            throw err
        } else {
            if (data === null) {
                res.sendStatus(403)
            } else {
                bcrypt.compare(password, data.password, (err, found) => {
                    if (err) {
                        throw err
                    } else {
                        helper.createSession(req, res, data.username)
                    }
                })
            }
        }
    })
})

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
