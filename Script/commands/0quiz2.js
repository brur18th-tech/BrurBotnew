const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "quiz2",
  version: "1.2.0",
  hasPermssion: 0,
  credits: "English Literature Bot",
  description: "Test your knowledge with randomized English Literature Quizzes",
  commandCategory: "Education",
  usages: "/quiz",
  cooldowns: 3,
  usePrefix: true
};

// গ্লোবাল হিস্ট্রি অ্যারেই (যাতে ব্যবহৃত প্রশ্ন সেভ থাকে)
if (!global.quizHistory) {
  global.quizHistory = {};
}

module.exports.run = async function ({ api, event }) {
  try {
    const jsonPath = path.join(__dirname, "cache", "quiz.json");

    if (!fs.existsSync(jsonPath)) {
      return api.sendMessage("❌ quiz.json file not found in cache folder!", event.threadID, event.messageID);
    }

    const quizData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

    if (!quizData || quizData.length === 0) {
      return api.sendMessage("❌ No questions found in quiz.json file!", event.threadID, event.messageID);
    }

    const threadID = event.threadID;
    if (!global.quizHistory[threadID]) {
      global.quizHistory[threadID] = [];
    }

    // অলরেডি ইউজ করা হয়ে যাওয়া প্রশ্নগুলো ফিল্টার করে বাদ দেওয়া
    let availableQuizzes = quizData.filter((_, index) => !global.quizHistory[threadID].includes(index));

    // যদি গ্রুপের সব প্রশ্ন একবার দেখানো হয়ে যায়, তবে হিস্ট্রি রিসেট হবে
    if (availableQuizzes.length === 0) {
      global.quizHistory[threadID] = [];
      availableQuizzes = quizData;
    }

    // এলোমেলো প্রশ্ন পাওয়ার জন্য Fisher-Yates Shuffle
    const randomIndex = Math.floor(Math.random() * availableQuizzes.length);
    const randomQuiz = availableQuizzes[randomIndex];

    // আসল ডাটাবেজের ইনডেক্স খুঁজে বের করে হিস্ট্রিতে সেভ করা
    const originalIndex = quizData.findIndex(q => q.question === randomQuiz.question);
    global.quizHistory[threadID].push(originalIndex);

    const msgText = `📚 𝐄𝐍𝐆𝐋𝐈𝐒𝐇 𝐋𝐈𝐓𝐄𝐑𝐀𝐓𝐔𝐑𝐄 𝐐𝐔𝐈𝐙 📚\n\n` +
      `❓ ${randomQuiz.question}\n\n` +
      `${randomQuiz.options.join("\n")}\n\n` +
      `👉 Reply with A, B, C, or D!`;

    return api.sendMessage(msgText, event.threadID, (err, info) => {
      if (err) return;
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: event.senderID,
        correctAnswer: randomQuiz.answer
      });
    }, event.messageID);

  } catch (error) {
    return api.sendMessage(`❌ Error loading quiz: ${error.message}`, event.threadID, event.messageID);
  }
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  const userAnswer = event.body.trim().toUpperCase();

  if (!["A", "B", "C", "D"].includes(userAnswer)) {
    return api.sendMessage("⚠️ Invalid option! Please reply with only A, B, C, or D.", event.threadID, event.messageID);
  }

  if (userAnswer === handleReply.correctAnswer) {
    return api.sendMessage(`🎉 Correct Answer! Excellent job! ✨`, event.threadID, event.messageID);
  } else {
    return api.sendMessage(`❌ Wrong Answer!\nThe correct answer was: [ ${handleReply.correctAnswer} ]`, event.threadID, event.messageID);
  }
};
