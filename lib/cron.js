const request = require('request');
const cron = require('node-cron');
const cheerio = require('cheerio');
const { client } = require('./line');

cron.schedule('* * * * *', () => {
    console.log('running a task every minute');
    request({
        method: 'GET',
        uri: process.env.URL
    }, (err, _, body) => {
        if (err) {
            console.error(err);
        }
        const $ = cheerio.load(body);
        const text = $('.event_name').text().replace(/\s+/g, '');
        client.pushMessage(process.env.USER_ID, {
            type: 'text',
            text: `${text} - ${process.env.URL}`
        });
    });
});