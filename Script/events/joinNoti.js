module.exports.config = {
  name: "joinnoti",
  eventType: ["log:subscribe"],
  version: "1.0.0",
  credits: "Bot",
  description: "Welcome message with optional image/video",
  dependencies: {
    "fs-extra": "",
    "path": ""
  }
};

module.exports.onLoad = function () {
  const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
  const { join } = global.nodemodule["path"];
  const paths = [
    join(__dirname, "cache", "joinGif"),
    join(__dirname, "cache", "randomgif")
  ];
  for (const path of paths) {
    if (!existsSync(path)) mkdirSync(path, { recursive: true });
  }
};

module.exports.run = async function({ api, event }) {
  const fs = require("fs");
  const path = require("path");
  const { threadID } = event;
  
  const botPrefix = global.config.PREFIX || "/";
  const botName = global.config.BOTNAME || "Chat Bot";

  if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    await api.changeNickname(`[ ${botPrefix} ] • ${botName}`, threadID, api.getCurrentUserID());

    api.sendMessage(`Hello everyone! I am now ready to chat with you!`, threadID, () => {
      const randomGifPath = path.join(__dirname, "cache", "randomgif");
      const allFiles = fs.readdirSync(randomGifPath).filter(file =>
        [".mp4", ".jpg", ".png", ".jpeg", ".gif", ".mp3"].some(ext => file.endsWith(ext))
      );

      const selected = allFiles.length > 0 
        ? fs.createReadStream(path.join(randomGifPath, allFiles[Math.floor(Math.random() * allFiles.length)])) 
        : null;

      const messageBody = `╭•┄┅═══❁🌺❁═══┅┄•╮
        WELCOME
╰•┄┅═══❁🌺❁═══┅┄•╯

Thank you so much for adding me to your group! 🤗
I am always here to serve you. ❤️

To view available commands:
${botPrefix}help
${botPrefix}info`;

      if (selected) {
        api.sendMessage({ body: messageBody, attachment: selected }, threadID);
      } else {
        api.sendMessage(messageBody, threadID);
      }
    });

    return;
  }

  try {
    const { createReadStream, readdirSync } = global.nodemodule["fs-extra"];
    let { threadName, participantIDs } = await api.getThreadInfo(threadID);
    const threadData = global.data.threadData.get(parseInt(threadID)) || {};
    let mentions = [], nameArray = [], memLength = [], i = 0;

    for (let id in event.logMessageData.addedParticipants) {
      const userName = event.logMessageData.addedParticipants[id].fullName;
      nameArray.push(userName);
      mentions.push({ tag: userName, id });
      memLength.push(participantIDs.length - i++);
    }
    memLength.sort((a, b) => a - b);

    let msg = (typeof threadData.customJoin === "undefined") ? `╭•┄┅═══❁🌺❁═══┅┄•╮
     WELCOME TO THE GROUP
╰•┄┅═══❁🌺❁═══┅┄•╯

Welcome! We hope you have a great time chatting and sharing friendly moments with us. 🥰

➤ Enjoy chatting and make new friends. 😍
➤ Be respectful and polite to everyone. 😉
➤ Avoid abusive language or provocations. 🚫
➤ Follow group rules and admin instructions. ✅

›› Welcome {name}!
›› You are the {soThanhVien}th member of this group.

›› Group Name: {threadName}

💌 🌺 HAVE A GREAT TIME 🌺 💌` : threadData.customJoin;

    msg = msg
      .replace(/\{name}/g, nameArray.join(', '))
      .replace(/\{soThanhVien}/g, memLength.join(', '))
      .replace(/\{threadName}/g, threadName);

    const joinGifPath = path.join(__dirname, "cache", "joinGif");
    const files = readdirSync(joinGifPath).filter(file =>
      [".mp4", ".jpg", ".png", ".jpeg", ".gif", ".mp3"].some(ext => file.endsWith(ext))
    );
    const randomFile = files.length > 0 
      ? createReadStream(path.join(joinGifPath, files[Math.floor(Math.random() * files.length)])) 
      : null;

    return api.sendMessage(
      randomFile ? { body: msg, attachment: randomFile, mentions } : { body: msg, mentions },
      threadID
    );
  } catch (e) {
    console.error(e);
  }
};
