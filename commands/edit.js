const Discord = require("discord.js");
const { DateTime } = require("luxon");
const fs = require("fs");

module.exports = (interaction) => {
  const data = JSON.parse(fs.readFileSync("./temp/edit.json", "utf-8"));
  const oldMessage = data.oldMessage;
  oldMessage.channel = interaction.guild.channels.cache.get(
    oldMessage.channelId
  );
  const newMessage = data.newMessage;

  const embed = new Discord.MessageEmbed({
    color: "YELLOW",
    title: "The Latest Edited Message",
    description:
      "> *Disclaimer:* This command is janky as shit and will break.",
    fields: [
      { name: "Message Sender:", value: `<@${oldMessage.authorId}>` },
      { name: "Channel Name:", value: `\`${oldMessage.channel.name}\`` },
      {
        name: "Original Message Sent At:",
        value: `\`${DateTime.fromMillis(oldMessage.createdTimestamp)
          .setZone("UTC+6")
          .toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)}\``,
      },
      {
        name: "Message Edited At:",
        value: `\`${DateTime.fromMillis(newMessage.editedTimestamp)
          .setZone("UTC+6")
          .toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)}\``,
      },
      {
        name: "Original Content:",
        value: !oldMessage.content ? "No Content" : oldMessage.content,
      },
      { name: "Edited Content:", value: newMessage.content },
    ],
  });

  interaction.reply({ embeds: [embed] });
};
