const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
  name: "routine",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "TAWHID ISLAM SIAM",
  description: "Send class routine image to students",
  commandCategory: "utility",
  usages: "routine",
  cooldowns: 3,
  usePrefix: true
};

module.exports.run = async function({ api, event }) {
  try {
    // 🔗 আপনার রুটিনের ছবির ডাইরেক্ট লিঙ্কটি নিচের ফাঁকা কোটেশনের ( " " ) ভেতর বসিয়ে দিন:
    const routineImageUrl = "https://i.ibb.co/4nCmrJb9/d59610bf8d.jpg";

    if (!routineImageUrl || routineImageUrl === "আপনার_ফটোর_লিঙ্ক_এখানে_বসাবেন") {
      return api.sendMessage("❌ রুটিনের ইমেজের লিঙ্ক এখনো সেট করা হয়নি!", event.threadID, event.messageID);
    }

    const cachePath = __dirname + "/cache/routine.jpg";

    const callback = () => {
      api.sendMessage(
        {
          body: "📅 আমাদের ক্লাসের রুটিন:",
          attachment: fs.createReadStream(cachePath)
        },
        event.threadID,
        () => {
          if (fs.existsSync(cachePath)) {
            fs.unlinkSync(cachePath);
          }
        },
        event.messageID // ইউজারকে রিপ্লাই হিসেবে পাঠানোর জন্য
      );
    };

    return request(routineImageUrl)
      .pipe(fs.createWriteStream(cachePath))
      .on("close", () => callback());

  } catch (err) {
    return api.sendMessage(
      "❌ Error fetching routine image: " + err.message,
      event.threadID,
      event.messageID
    );
  }
};

              
