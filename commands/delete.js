const Discord = require("discord.js");
const fs = require("fs");
const { DateTime } = require("luxon");

module.exports = async (interaction) => {
  const data = JSON.parse(fs.readFileSync("./temp/delete.json", "utf-8"));
  data.channel = interaction.guild.channels.cache.get(data.channelId);

  const embed = new Discord.MessageEmbed({
    color: "RED",
    title: "The Latest Deleted Message",
    description: "> *DISCLAIMER:* This shit broken as hell.",
    fields: [
      { name: "Message Sender:", value: `<@${data.authorId}>` },
      { name: "Channel Name:", value: `\`${data.channel.name}\`` },
      {
        name: "Message Sent At:",
        value: `\`${DateTime.fromMillis(data.createdTimestamp)
          .setZone("UTC+6")
          .toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)}\``,
      },
      {
        name: "Message:",
        value: `${!data.content ? "No Content" : data.content}`,
      },
    ],
  });

  if (data.attachments.length) {
    const files = fs
      .readdirSync("./temp/attachments")
      .map((item) => `./temp/attachments/${item}`);
    await interaction.reply({ embeds: [embed], files: files });
  } else {
    await interaction.reply({ embeds: [embed] });
  }
};
