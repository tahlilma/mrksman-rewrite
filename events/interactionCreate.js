const help = require("../commands/help");
const del = require("../commands/delete");
const edit = require("../commands/edit");
const cache = require("../commands/cache");

module.exports = {
  name: "interactionCreate",
  handler: async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    switch (commandName) {
      case "help":
        help(interaction);
        break;
      case "delete":
        del(interaction);
        break;
      case "edit":
        edit(interaction);
        break;
      case "cache":
        cache(interaction, options);
        break;
    }
  },
};
