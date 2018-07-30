const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mongo/index');
const session = require('express-session');
const path = require('path');
const app = express();
const bcrypt = require('bcrypt');
const logger = require('morgan');
const saltRounds = 10;
const helper = require('../helper/uitilty');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const async = require('async');
const crypto = require('crypto');
const flash = require('express-flash');

passport.use(new LocalStrategy(
    function (username, password, done) {
        db.Users.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    db.Users.findById(id, function (err, user) {
        done(err, user);
    });
});
app.use(flash());
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(logger('dev'));
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

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
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
                                    if (err) {
                                        throw err
                                    } else {
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



app.post('/forgot', function (req, res, next) {
    let email = req.body.email
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            db.Users.findOne({ email: email }, function (err, user) {
                if (!user) {
                    req.flash('error', 'No account with that email address exists.');
                    return res.redirect('/forgot');
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function (err) {
                    done(err, token, user);
                });
            });
        },
        function (token, user, done) {
            var smtpTransport = nodemailer.createTransport('SMTP', {
                service: 'SendGrid',
                auth: {
                    user: '!!! YOUR SENDGRID USERNAME !!!',
                    pass: '!!! YOUR SENDGRID PASSWORD !!!'
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'mohd.alduraidi@gmail.com',
                subject: 'Node.js Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                done(err, 'done');
            });
        }
    ], function (err) {
        if (err) return next(err);
        res.redirect('/forgot');
    });
});



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