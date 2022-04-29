require("dotenv").config();
const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});

const eventFiles = fs.readdirSync("./events");
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  client.on(event.name, (...args) => event.handler(...args));
}

client.login(process.env.TOKEN);
