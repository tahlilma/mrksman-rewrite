const prefix = "/";
const Discord = require("discord.js");

module.exports = (interaction) => {
  const embed = new Discord.MessageEmbed({
    color: "GREEN",
    title: "Mrksman Help",
    description:
      "> A discord bot that keeps track of the latest deleted/edited message in a server. It's been written hastily and shit is guaranteed to break so in the case that it does please tag me.",
    fields: [
      { name: `${prefix}help`, value: "```Shows this menu.```" },
      {
        name: `${prefix}delete`,
        value:
          "```Shows the latest deleted message along with the time it was originally sent and the author. (In the case that the image was a group of attachments, it sends the first one)```",
      },
      {
        name: `${prefix}edit`,
        value:
          "```Shows the latest edited message. It sends the old message and the new one along with who sent it.```",
      },
      {
        name: `${prefix}cache`,
        value:
          "```Gives a list of the 5 earlier deleted messages. You can view more info about them by invoking their indexes.```",
      },
    ],
    footer: { text: "Mrksman v3.0 @tahlil (Discord JS 13 Rewrite)" },
  });

  interaction.reply({ embeds: [embed] });
};
