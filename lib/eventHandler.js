const request = require('request');
const cheerio = require('cheerio');
const { client } = require('./line');

const eventHandler = (event, callback) => {
    console.log(event);
    if (event.type === 'message') {
        const text = event.message.text;
        if (text.match(/教えて/) !== null) {
            request({
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
            });
        } else {
            callback(null, client.replyMessage(event.replyToken, {
                type: 'text',
                text: '開発中だよ！ちょっと待っててね！'
            }));
        }
    }
};

module.exports = eventHandler;