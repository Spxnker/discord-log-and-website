/// ARAKDAŞLAR BU LOGLARIDA EKLEYEBİLİRSİNİZ İNDEX.JS 'E STAR ATMAYAN HAİNDİR

client.on('messageUpdate', async (oldMessage, newMessage) => {
    logla('Mesaj Güncellendi', oldMessage.author.username, `Eski: ${oldMessage.content} \nYeni: ${newMessage.content}`, newMessage.channel.name);
});

client.on('messageReactionAdd', async (reaction, user) => {
    logla('Reaksiyon Eklendi', user.username, `Emoji: ${reaction.emoji.name}`, reaction.message.channel.name);
});

client.on('messageReactionRemove', async (reaction, user) => {
    logla('Reaksiyon Kaldırıldı', user.username, `Emoji: ${reaction.emoji.name}`, reaction.message.channel.name);
});

client.on('guildMemberAdd', async member => {
    logla('Üye Katıldı', member.user.username, 'Sunucuya katıldı', 'Sunucu Genel');
});

client.on('guildMemberRemove', async member => {
    logla('Üye Ayrıldı', member.user.username, 'Sunucudan ayrıldı', 'Sunucu Genel');
});

async function logla(event, kullanıcı, içerik, kanal) {
    try {
        const log = new Log({
            event: event,
            kullanıcı: kullanıcı,
            içerik: içerik,
            kanal: kanal,
            oluşturulmaTarihi: new Date()
        });
        await log.save();
    } catch (err) {
        console.error(err);
    }
}
