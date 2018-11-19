const request = require('request');
const cron = require('node-cron');
const cheerio = require('cheerio');
const { client } = require('./line');

cron.schedule('0 8,12,18,22 * * *', () => {
    request({
        method: 'GET',
        uri: process.env.URL
    }, (err, _, body) => {
        if (err) {
            console.error(err);
        }
        const $ = cheerio.load(body);
        const text = $('.event_name').text().replace(/\s+/g, '');
        if (text.match(/空/) !== null) {
            client.pushMessage(process.env.USER_ID, {
                type: 'text',
                text: `${text} - ${process.env.URL}`
            });
        } else {
            console.log('キャンセルはありませんでした');
        }
    });
});