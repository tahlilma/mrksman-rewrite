const Discord = require("discord.js");

module.exports = {
  name: "ready",
  handler: (client) => {
    console.log(`Bot Logged In As ${client.user.tag}`);
    client.user.setPresence({ activities: [{ name: "with your mom" }] });

    const guild = client.guilds.cache.get("765104599840587787");
    let commands;

    if (guild) {
      commands = guild.commands;
    } else {
      commands = client.application.commands;
    }

    commands.create({
      name: "help",
      description: "Shows the help menu.",
    });

    commands.create({
      name: "delete",
      description: "Shows the latest deleted message.",
    });

    commands.create({
      name: "edit",
      description: "Shows the latest edited message.",
    });

    commands.create({
      name: "cache",
      description:
        "Shows the last 5 deleted messages, pass in a number from 0-4 to get more info.",
      options: [
        {
          name: "index",
          description: "The index to see more info. Must be from 0-4",
          type: Discord.Constants.ApplicationCommandOptionTypes.NUMBER,
        },
      ],
    });
  },
};
