module.exports.config = {
  name: "helpall",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "TAWHID ISLAM SIAM",
  description: "Displays all available commands in one page",
  commandCategory: "system",
  usages: "[No args]",
  cooldowns: 5,
  usePrefix: true
};

module.exports.run = async function ({ api, event }) {
  try {
    const { commands } = global.client;
    const { threadID, messageID } = event;

    const allCommands = [];

    for (let [name] of commands) {
      if (name && name.trim() !== "") {
        allCommands.push(name.trim());
      }
    }

    allCommands.sort();

    const finalText = 
`╔═══❖ 🌟 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐋𝐈𝐒𝐓 🌟 ❖═══╗
${allCommands.map(cmd => `║ ➔ ${cmd}`).join("\n")}
╠═════🔰 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎 🔰═════╣
║ 🤖 𝐁𝐨𝐭: BRUR Chat Bot
║ 👨‍💻 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫: TAWHID ISLAM SIAM
║ 📦 𝐓𝐨𝐭𝐚𝐥 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬: ${allCommands.length} 
╚═══════════════════════╝`;

    return api.sendMessage(finalText, threadID, messageID);

  } catch (err) {
    return api.sendMessage("❌ Error: " + err.message, event.threadID, event.messageID);
  }
};
