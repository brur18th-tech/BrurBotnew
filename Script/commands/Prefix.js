module.exports.config = {
  name: "prefix",
  version: "1.0.0", 
  hasPermssion: 0,
  credits: "SHAHADAT SAHU",
  description: "Display the bot's prefix and system info",
  commandCategory: "Information",
  usages: "",
  cooldowns: 5
};

module.exports.handleEvent = async ({ event, api, Threads }) => {
  var { threadID, messageID, body } = event;
  if (!body) return;

  var dataThread = await Threads.getData(threadID);
  var data = dataThread.data || {};
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const prefix = threadSetting.PREFIX || global.config.PREFIX;
  const groupName = dataThread.threadInfo?.threadName || "Unnamed Group";

  const triggerWords = [
    "prefix", "mprefix", "mpre", "bot prefix", "what is the prefix", "bot name",
    "how to use bot", "bot not working", "bot is offline", "prefx", "prfix",
    "perfix", "bot not talking", "where is bot", "bot dead", "bots dead",
    "dấu lệnh", "daulenh", "what prefix", "freefix", "what is bot", "what prefix bot",
    "how use bot", "where are the bots", "where prefix"
  ];

  let lowerBody = body.toLowerCase();
  if (triggerWords.includes(lowerBody)) {
    return api.sendMessage(
`━━━━━━━━━━━━━━━━━━━━
📌 SYSTEM PREFIX INFO
━━━━━━━━━━━━━━━━━━━━

🤖 Bot Name : ${global.config.BOTNAME || "Chat Bot"}
⚙️ Global Prefix : [ ${global.config.PREFIX} ]
💬 Group Prefix  : [ ${prefix} ]

👥 Group Name : ${groupName}
🆔 Thread ID   : ${threadID}

━━━━━━━━━━━━━━━━━━━━
💡 Type [ ${prefix}help ] to see all available commands!`,
      threadID,
      messageID
    );
  }
};

module.exports.run = async ({ event, api }) => {
  return api.sendMessage("Type 'prefix' or 'bot prefix' to see the bot info.", event.threadID);
};
