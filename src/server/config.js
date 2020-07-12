const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const errorhandler = require('errorhandler');

//Para solucionar un error temporalmente
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const routes = require('../routes/index');

module.exports = app => {

    app.set('port', process.env.PORT);
    app.set('views', path.join(__dirname, '../views'));
    app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers'),
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    }));
    app.set('view engine', '.hbs');

    //middlewares
    app.use(morgan('dev'));
    app.use(multer({ dest: path.join(__dirname, '../public/upload/temp') }).single("file"));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use('/public', express.static(path.join(__dirname, '../public')));


    //session
    app.use(session({
        secret: 'mysecretsession',
        resave: false,
        saveUninitialized: false
    }));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use((req, res, next) => {
        app.locals.signupMessage = req.flash('signupMessage');
        app.locals.signinMessage = req.flash('signinMessage');
        app.locals.user = req.user;
        next();
    });

    //routes
    routes(app);

    //errorhandler
    if ('development' === app.get('env')) {
        app.use(errorhandler);
    }
    return app;
};