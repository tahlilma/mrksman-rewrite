const fs = require("fs");
const Discord = require("discord.js");
const { DateTime } = require("luxon");

module.exports = (interaction, options) => {
  const index = parseInt(options.getNumber("index"));

  const cache = JSON.parse(fs.readFileSync("./temp/cache.json", "utf-8"));

  if (index && index < 5 && index >= 0) {
    const query = cache[index];
    query.channel = interaction.guild.channels.cache.get(query.channelId);

    const queryEmbed = new Discord.MessageEmbed({
      color: "#FFC0CB",
      title: `Cached Message (${index})`,
      description: "> *DISCLAIMER:* This shit broken as hell.",
      fields: [
        { name: "Message Sender:", value: `<@${query.authorId}>` },
        { name: "Channel Name:", value: `\`${query.channel.name}\`` },
        {
          name: "Message Sent At:",
          value: `\`${DateTime.fromMillis(query.createdTimestamp)
            .setZone("UTC+6")
            .toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)}\``,
        },
        {
          name: "Message:",
          value: `${!query.content ? "No Content" : query.content}`,
        },
      ],
    });

    interaction.reply({ embeds: [queryEmbed] });

    return;
  }

  const values = cache.map((item, index) => {
    return {
      name: `Index: ${index}`,
      value: `${!item.content ? "No Content" : item.content}`,
    };
  });

  const listEmbed = new Discord.MessageEmbed({
    color: "#FFC0CB",
    title: "Cache",
    description: `> These are the last 5 cached deleted messages. You can view more info about a message by using \`\\cache <index>\`. Example: \`\\cache 2\` will return the information regarding the second cached message.`,
    fields: values,
  });

  interaction.reply({ embeds: [listEmbed] });
};
