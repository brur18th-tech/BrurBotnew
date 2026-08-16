module.exports.config = {
  name: "info",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "TAWHID ISLAM SIAM",
  description: "Bot information command",
  commandCategory: "For users",
  hide: true,
  usages: "",
  cooldowns: 5,
  usePrefix: true
};

module.exports.run = async function ({ api, event, Threads }) {
  try {
    const { threadID, messageID } = event;

    const { configPath } = global.client;
    delete require.cache[require.resolve(configPath)];
    const config = require(configPath);

    const { commands } = global.client;
    const threadSetting = (await Threads.getData(String(threadID))).data || {};
    const prefix = threadSetting.hasOwnProperty("PREFIX") ? threadSetting.PREFIX : config.PREFIX;

    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    const totalUsers = global.data.allUserID.length;
    const totalThreads = global.data.allThreadID.length;

    const msg = 
`╭⭓ ⪩ 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍 ⪨
│
├─ 🎓 𝗧𝘆𝗽𝗲 : BRUR Official Student Bot
├─ 🤖 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲 : Chat Bot
├─ ☢️ 𝗣𝗿𝗲𝗳𝗶𝘅 : ${prefix}
├─ 🔶 𝗠𝗼𝗱𝘂𝗹𝗲𝘀 : ${commands.size} Commands
├─ 🔰 𝗣𝗶𝗻𝗴 : ${Date.now() - event.timestamp}ms
│
╰───────⭓

╭⭓ ⪩ 𝗔𝗖𝗧𝗜𝗩𝗜𝗧𝗜𝗘𝗦 ⪨
│
├─ ⏳ 𝗨𝗽𝘁𝗶𝗺𝗲 : ${hours}h ${minutes}m ${seconds}s
├─ 📣 𝗚𝗿𝗼𝘂𝗽𝘀 : ${totalThreads}
├─ 🧿 𝗧𝗼𝘁𝗮𝗹 𝗨𝘀𝗲𝗿𝘀 : ${totalUsers}
│
╰───────⭓

👨‍💻 𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗲𝗿 : TAWHID ISLAM SIAM
❤️ Thanks for using 🌺`;

    return api.sendMessage(msg, threadID, messageID);

  } catch (err) {
    return api.sendMessage("❌ Error: " + err.message, event.threadID, event.messageID);
  }
};
