const cheerio = require('cheerio');
const { Client } = require("@line/bot-sdk");
const client = new Client({
    channelAccessToken: process.env.LINE_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET 
});
const request = require('./request')

const eventHandler = (event, callback) => {
    const text = event.message.text;
    if (text.match(/教えて/) !== null) {
        request.get((err, body) => {
            if (err) {
                callback(err);
            }
            const $ = cheerio.load(body);
            const lessons = $('table').eq(1).find('tbody > tr').toArray().map(item => {
                const path = $(item).find('td > a').eq(0).attr('href')
                return cheerio.load(item).text().replace(/\s+/g, '\n') + '\n' + path
            }).map(item => {
                return item.split('\n').slice(1, -1)
            }).filter(item => {
                return item.length > 5
            }).map(item => {
                return {
                    date: item.slice(0, 2).join(''),
                    availability: item[2],
                    coach: item[3],
                    place: item[4],
                    title: item.slice(5, -1).join(''),
                    id: item.slice(-1)[0].slice(-4)
                }
            })
            console.log(JSON.stringify(lessons, null, 2))
            const text = lessons.filter(lesson => {
                return lesson.availability.match(/空/) !== null && lesson.place == '東京';
            }).map(lesson => {
                return `${lesson.date}@${lesson.place} - ${lesson.availability}\n${lesson.title} `;
            }).join('\n\n');
            callback(null, client.replyMessage(event.replyToken, {
                type: 'text',
                text: `空き情報だよ！！！\n\n${text}`
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