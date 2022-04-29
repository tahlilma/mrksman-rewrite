const fs = require("fs");

module.exports = {
  name: "messageUpdate",
  handler: (oldMessage, newMessage) => {
    if (oldMessage.content.length > 1024 || newMessage.content.length > 1024)
      return;

    // When a link gets sent it creates an embed which is registered as an edit
    const linkRegexp =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    if (linkRegexp.test(oldMessage.content)) return;

    // Write that shit
    fs.writeFile(
      "./temp/edit.json",
      JSON.stringify({ oldMessage: oldMessage, newMessage: newMessage }),
      "utf-8",
      () => {
        console.log("EDIT Detected and Cached");
      }
    );
  },
};
