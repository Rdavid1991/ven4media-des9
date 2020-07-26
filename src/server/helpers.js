const moment = require('moment');

module.exports = {
    timeago: timestamp => {
        return moment(timestamp).locale("es").startOf("minite").fromNow();
    },

    unitAmount: amount =>{ 
        return amount.charAt(0) +"." +amount.substr(amount.length - 2);
    }
};