require('colors');
const mongoose = require('mongoose');

let DB_PORT;

if (process.env.NODE_ENV === 'production') {
    DB_PORT = process.env.MONGODB_DOCKER;
}else{
    DB_PORT = process.env.MONGODB_LOCAL;
}

mongoose.connect(DB_PORT, { useNewUrlParser: true, useUnifiedTopology: true })
    // eslint-disable-next-line no-unused-vars
    .then(db => console.log('DB is connect'.yellow))
    .catch(err => console.error('DataBase is not connect for ', err));