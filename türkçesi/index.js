const Discord = require('discord.js');
const client = new Discord.Client();
const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');

const app = express();
const port = 3000;

const Log = require('./models/log');

const BOT_TOKEN = 'BOT_TOKEN';
const MONGODB_URI = 'MONGODB_URI';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB\'ye bağlanıldı');
        client.login(BOT_TOKEN);
    })
    .catch(err => console.error('MongoDB\'ye bağlanırken hata oluştu:', err));

app.listen(port, () => {
    console.log(`Web sunucusu ${port} portunda başlatıldı`);
});

client.on('ready', () => {
    console.log(`Bot olarak giriş yapıldı: ${client.user.tag}`);
});

client.on('messageDelete', async message => {
    try {
        const log = new Log({
            event: 'Mesaj Silindi',
            kullanıcı: message.author.username,
            içerik: message.content,
            kanal: message.channel.name,
            oluşturulmaTarihi: new Date()
        });
        await log.save();
    } catch (err) {
        console.error(err);
    }
});

// Diğer olayları da logla
