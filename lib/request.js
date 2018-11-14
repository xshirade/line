const request = require('request');
const cheerio = require('cheerio');

const get = (callback) => {
    request({
        method: 'GET',
        uri: process.env.URL
    }, (err, res, body) => {
        if (err) {
            callback(err);
        }
        const $ = cheerio.load(body);
        // check events
    });
};

module.exports = {
    get
};