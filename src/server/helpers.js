const moment = require('moment');

module.exports = {
    timeago: timestamp => {
        return moment(timestamp).startOf('minute').fromNow();
    },
    substring: str =>{
        return str.substr(0,100) + "...";
    }
};