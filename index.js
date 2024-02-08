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
        console.log('Connected to MongoDB');
        client.login(BOT_TOKEN);
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.listen(port, () => {
    console.log(`Web server started on port ${port}`);
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageDelete', async message => {
    try {
        const log = new Log({
            event: 'messageDelete',
            user: message.author.username,
            content: message.content,
            channel: message.channel.name,
            createdAt: new Date()
        });
        await log.save();
    } catch (err) {
        console.error(err);
    }
});

// Diğer olayları da logla
