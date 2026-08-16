module.exports.config = {
  name: "help",
  version: "4.0.0",
  hasPermssion: 0,
  credits: "TAWHID ISLAM SIAM",
  description: "Shows clean and essential commands list",
  commandCategory: "system",
  usages: "help",
  cooldowns: 2,
  usePrefix: true
};

module.exports.run = function ({ api, event }) {
  const { threadID, messageID } = event;

  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const prefix = threadSetting.PREFIX || global.config.PREFIX;

  const helpText = 
`📜 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗟𝗜𝗦𝗧

🎓 𝗩𝗔𝗥𝗦𝗜𝗧𝗬 & 𝗜𝗡𝗙𝗢
› routine | nextclass | notice
› admin | info | uptime | wiki

🧠 𝗔𝗜 & 𝗜𝗠𝗔𝗚𝗘 𝗧𝗢𝗢𝗟𝗦
› gpt | gemini | prompt | art
› removebg | font | imgur

🛡️ 𝗔𝗗𝗠𝗜𝗡 & 𝗚𝗥𝗢𝗨𝗣
› setprefix | boxadmin | kick
› adduser | antiout | setname
› unsend | onlyadmin | pending

🎬 𝗠𝗘𝗗𝗜𝗔 & 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗
› song | video | mp3
› autodl | fblink | voice

👤 𝗨𝗦𝗘𝗥 & 𝗣𝗥𝗢𝗙𝗜𝗟𝗘
› profile | pp | uid | tid
› age | birthday | rankup

🎮 𝗙𝗨𝗡 & 𝗚𝗔𝗠𝗘𝗦
› tictactoe | slot | roast
› baby | say | pair | quiz

⚙️ Prefix: ${prefix}
🤖 Bot: BRUR Chat Bot
👨‍💻 Dev: TAWHID ISLAM SIAM`;

  return api.sendMessage(helpText, threadID, messageID);
};
