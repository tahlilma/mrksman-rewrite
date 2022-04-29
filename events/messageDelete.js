const fs = require("fs");
const path = require("path");
const download = require("download");

module.exports = {
  name: "messageDelete",
  handler: (message) => {
    // Something related to embeds having a text limit (fuck you nehan)
    if (message.content.length > 1024) return;

    // Clear old attachments
    fs.readdir("./temp/attachments", (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join("./temp/attachments", file), (err) => {
          if (err) throw err;
        });
      }
    });

    // Check for an attachment(s) and if so download them
    if (message.attachments.first()) {
      message.attachments.forEach(async (item) => {
        await download(item.url, "./temp/attachments");
      });
    }

    // Save the message object
    fs.writeFile("./temp/delete.json", JSON.stringify(message), "utf-8", () => {
      console.log("DELETE Detected and Cached");
    });

    // i like big boobs
    const cache = JSON.parse(fs.readFileSync("./temp/cache.json"), "utf8");
    if (cache.length === 5) cache.shift();
    cache.push(message);
    fs.writeFileSync("./temp/cache.json", JSON.stringify(cache));
  },
};
