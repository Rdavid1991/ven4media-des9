const moment = require('moment');

module.exports = {
    timeago: timestamp => {
        return moment(timestamp).locale("es").startOf("minite").fromNow();
    },
};