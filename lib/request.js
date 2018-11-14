const request = require('request');

const get = (callback) => {
    request({
        method: 'GET',
        uri: process.env.URL
    }, (err, res, body) => callback(err, body));
};

module.exports = {
    get
};