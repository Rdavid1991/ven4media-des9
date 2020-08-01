require('colors');
const mongoose = require('mongoose');

let DB_SERVER;

if (process.env.NODE_ENV === 'production') {
    DB_SERVER = process.env.MONGODB_PROD;
} else {
    DB_SERVER = process.env.MONGODB_DEV;
}

mongoose.connect(`mongodb://${DB_SERVER}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`, {
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    // eslint-disable-next-line no-unused-vars
    .then(db => console.log('DB is connect'.yellow))
    .catch(err => console.error('DataBase is not connect for ', err));