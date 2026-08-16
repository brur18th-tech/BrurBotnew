module.exports.config = {
  name: "birthday",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "TAWHID ISLAM SIAM",
  description: "Send creative birthday wishes to mentioned user",
  commandCategory: "group",
  usages: "[@mention]",
  cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
  try {
    if (Object.keys(event.mentions).length === 0) {
      return api.sendMessage("❌ কাকে জন্মদিনের শুভেচ্ছা জানাতে চান, তাকে মেনশন করুন! 🎂", event.threadID, event.messageID);
    }

    const mention = Object.keys(event.mentions)[0];
    const name = event.mentions[mention].replace("@", "");
    const arraytag = [{ id: mention, tag: name }];

    const sendMessage = (msg) => {
      api.sendMessage({ body: msg, mentions: arraytag }, event.threadID);
    };

    // ১ম স্বাগতম মেসেজ
    sendMessage(`🎂 ✨ 𝗛𝗔𝗣𝗣𝗬 𝗕𝗜𝗥𝗧𝗛𝗗𝗔𝗬 ✨ 🎂\n\nআমাদের সবার প্রিয় @${name} কে জন্মদিনের অনেক অনেক শুভকামনা! 🎉🥳`);

    const messages = [
      { 
        delay: 3000, 
        msg: `জীবনের আরও একটি বছর পার করে ফেললে! বয়স কিন্তু এক বছর বেড়ে গেল, কিন্তু বুদ্ধি কি বাড়ল? 😜\n\nশুভ জন্মদিন প্রিয় @${name}! 🥰` 
      },
      { 
        delay: 7000, 
        msg: `আজ তোমার শুভ দিনে একটাই চাওয়া—তোমার মুখের এই মিষ্টি হাসি যেন সারাজীবন এমন অমলিন থাকে! 💖\n\nHAPPY BIRTHDAY @${name}! 🎈` 
      },
      { 
        delay: 11000, 
        msg: `শুভেচ্ছা তো অনেক হলো, এবার আসল কথায় আসি—বার্থডে ট্রিট কোথায় আর কবে দিচ্ছ বৎস? 🍔🍕\n\nট্রিট ছাড়া কোনো ছাড় নেই @${name}! 😋` 
      },
      { 
        delay: 15000, 
        msg: `তোমার জীবনের আগামী দিনগুলো ভরে উঠুক সাফল্য, শান্তি আর অফুরন্ত ভালোবাসায়! 🌟\n\nঅনেক শুভকামনা রইল @${name}! 🌸` 
      },
      { 
        delay: 19000, 
        msg: `ক্যাম্পাসের আড্ডা থেকে শুরু করে জীবনের প্রতিটি পদে তুমি এভাবেই সবাইকে মাতিয়ে রাখো! 💫\n\nHave a blast, @${name}! 🎉` 
      },
      { 
        delay: 23000, 
        msg: `দোয়া করি যেন তোমার সব স্বপ্ন সত্যি হয়, জীবনের প্রতিটি লক্ষ্য অর্জিত হয়! 🤲✨\n\nশুভ শুভ শুভদিন, শুভ হোক জন্মদিন @${name}! ❤️` 
      },
      { 
        delay: 27000, 
        msg: `পৃথিবীর সব আনন্দ আর সুখ আজ ছোঁয়ে যাক তোমার মন। সুন্দর হোক তোমার আগামী প্রতিটি মুহূর্ত! 🌺\n\nHappy Birthday Dear @${name}! 🎁` 
      },
      { 
        delay: 31000, 
        msg: `সুখে-দুঃখে যেকোনো প্রয়োজনে আমাদের পুরো গ্রুপ সবসময় তোমার পাশে আছে ও থাকবে ইনশাআল্লাহ! 🤝\n\nএকসাথে চলো বহুদূর @${name}! 🚀` 
      },
      { 
        delay: 35000, 
        msg: `সবশেষে একটাই কথা—অনেক বেশি ভালো থেকো, সুস্থ থেকো আর এভাবেই আমাদের মুখে হাসি ফুটিয়ে রেখো! 🥰😘\n\nMany Many Happy Returns of the Day, @${name}! 🎂🎉` 
      }
    ];

    messages.forEach(({ delay, msg }) => {
      setTimeout(() => sendMessage(msg), delay);
    });

  } catch (error) {
    console.error("Birthday command error:", error);
    return api.sendMessage("❌ বার্তা পাঠাতে সমস্যা হয়েছে! দয়া করে আবার চেষ্টা করুন।", event.threadID, event.messageID);
  }
};
