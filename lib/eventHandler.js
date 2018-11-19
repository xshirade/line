const cheerio = require('cheerio');
const { client } = require('./line');

const request = require('request')

const eventHandler = (event, callback) => {
    const text = event.message.text;
    if (text.match(/教えて/) !== null) {
        request.request({
            method: 'GET',
            uri: process.env.URL
        }, (err, _, body) => {
            if (err) {
                callback(err);
            }
            const $ = cheerio.load(body);
            const text = $('.event_name').text().replace(/\s+/g, '');
            callback(null, client.replyMessage(event.replyToken, {
                type: 'text',
                text: `${text} - ${process.env.URL}`
            }));
        })
    } else {
        callback(null, client.replyMessage(event.replyToken, {
            type: 'text',
            text: '寝てないよ！開発中だよ！'
        }));
    }
};

module.exports = eventHandler;