const { Client, Intents, Permissions } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const GUN = require('gun/gun');
let gun = new GUN();
const prefix = "$"
const token = "replaceme" //REPLACE ME WITH YOUR TOKEN
const groupName = "theVortexImperium" //replace me with your group name, snake case to make i teasier
let baseDB = gun.get('thesimplestxpbotintheentireuniverse').get(groupName);
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', function(message) {
    let cmd = `${prefix}${message.content}`
    if (cmd === '$getMyXP') {
        let dbEntry = baseDB.get(`${message.author.id}`)
        try {
            dbEntry.on((xp) => { message.channel.send(`${xp} XP`) });
        } catch {
            message.channel.send("0 XP")
        }
    } else if (cmd === '$addXP') {
        let splitCmd = cmd.split(' ')
        let uid = splitCmd[1]
        let xp = Number(splitCmd[2])
        if (message.author.fetchFlags(Permissions.FLAGS.KICK_MEMBERS) || message.author.fetchFlags(Permissions.FLAGS.ADMINISTRATOR)) { 
            let dbEntry = baseDB.get(`${uid}`)
        try {
            dbEntry.put(xp)
        } catch {
            message.channel.send("Error while setting XP!")
        }
        } else {
            message.channel.send("You are not able to kick members, thus you shall not be able to set XP.")
        }
    }
});

client.login(token);
