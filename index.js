const { default: axios } = require('axios');
const { Client,   Intents, Team } = require('discord.js');
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

let staticData = {
    webMobile: {
        roleId: "946891041146019880",
        color: "#23b41a"
    },
    gameDev: {
        roleId: "946891278321319987",
        color: "#f56a04"
    },
    marketing: {
        roleId: "946891361754427493",
        color: "#182bee"
    },
    algo: {
        roleId: "946891501013712916",
        color: "#08ddd4"
    }
}

client.on("messageCreate", async message => {

    // message.guild.roles.cache.forEach(role => {
    //     console.log(role.name, role.id);
    // })

    if (message.author.bot) return;

    const command = message.content.trim();
    if (message.channelId == '946865824906510416') {

        let team = await axios.get(`https://fiicode-api.asii.ro/teams/code/${command}`).catch(() => {
            return {}
        })

        if (team.data && team.data.success) {
            team = team.data.data;
            if (team.section == 1) {
                await message.guild.members.cache.get(message.author.id).roles.add(staticData.algo.roleId);
            }
            else {
                let toSearchCategoryName = (team.selectedArea == 2 ? "W&M " : team.selectedArea == 3 ? "GD " : "MKT ") + team.teamName;
                let targetGroup = await message.guild.channels.cache.find(r => r.name === toSearchCategoryName);
                if (targetGroup == undefined) {

                    let newRole = await message.guild.roles.create({
                        name: toSearchCategoryName,
                        color: team.selectedArea == 2 ? staticData.webMobile.color : team.selectedArea == 3 ? staticData.gameDev.color : staticData.marketing.color
                    })

                    await message.guild.members.cache.get(message.author.id).roles.add(newRole.id);
                    await message.guild.members.cache.get(message.author.id).roles.add(team.selectedArea == 2 ? staticData.webMobile.roleId : team.selectedArea == 3 ? staticData.gameDev.roleId : staticData.marketing.roleId);
                    let newCategory = await message.guild.channels.create(toSearchCategoryName,
                        {
                            type: "GUILD_CATEGORY", permissionOverwrites: [
                                {
                                    id: newRole.id,
                                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
                                    deny: []
                                },
                                {
                                    id: message.guild.roles.everyone,
                                    allow: [],
                                    deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                                }
                            ]
                        });

                    let newGeneralTexhChannel = await message.guild.channels.create("general",
                        {
                            type: "GUILD_TEXT", permissionOverwrites: [
                                {
                                    id: newRole.id,
                                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
                                    deny: []
                                },
                                {
                                    id: message.guild.roles.everyone,
                                    allow: [],
                                    deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                                }
                            ]
                        });

                    let newGeneralVoiceChannel = await message.guild.channels.create("voice-channel",
                        {
                            type: "GUILD_VOICE", permissionOverwrites: [
                                {
                                    id: newRole.id,
                                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
                                    deny: []
                                },
                                {
                                    id: message.guild.roles.everyone,
                                    allow: [],
                                    deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                                }
                            ]
                        });
                    newGeneralVoiceChannel.setParent(newCategory);
                    newGeneralTexhChannel.setParent(newCategory);
                }
                else {
                    let targetRole = message.guild.roles.cache.find(r => r.name === toSearchCategoryName);
                    await message.guild.members.cache.get(message.author.id).roles.add(targetRole.id);

                    await message.guild.members.cache.get(message.author.id).roles.add(team.selectedArea == 1 ? staticData.webMobile.roleId : team.selectedArea == 2 ? staticData.gameDev.roleId : staticData.marketing.roleId);
                }
            }
        }
        else {
            message.channel.send(`${message.member.user}, you have entered an invalid code.`)
        }
    }
});

client.login(config.token);
