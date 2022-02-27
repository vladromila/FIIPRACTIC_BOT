const { Client, Intents } = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    ],
    partials: ["MESSAGE", "CHANNEL", "REACTION"]
});

const config = require("./config.json");

client.on("ready", () => {
    client.user.setActivity(`Having fun!`);
    console.log('Bot has started!');
});


client.on("messageCreate", async message => {

    if (message.author.bot) return;

    const command = message.content.trim();
    console.log(command);

    if (message.channelId == '942022109306163243') {

        if (command === "fSeGsEH7hBJSZdZTKzhLZQ") {
            console.log("am intrat varu")
            await message.guild.members.cache.get(message.author.id).roles.add('942474079418609755');
            await message.channel.send(`${message.member.user}, your roles have been assigned. Hurray!`);
        }
        else
            await message.channel.send(`${message.member.user}, you have entered an invalid code.`);
        return;
    }
    else
        return;
});

client.login(config.token);