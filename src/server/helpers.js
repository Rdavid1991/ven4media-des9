const moment = require('moment');
const { get } = require('mongoose');

module.exports = {
    timeago: timestamp => {
        return moment(timestamp).startOf('minute').fromNow();
    },

    getType: type => {
        console.log(type);
        return true;
    }
};