const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "quiz",
  version: "1.1.0",
  hasPermssion: 0,
  credits: "TAWHID ISLAM SIAM",
  description: "English Literature Quiz",
  commandCategory: "Education",
  usages: "quiz",
  cooldowns: 3,
  usePrefix: true
};

// ======================================================
// QUIZ FILE PATH
// ======================================================

const QUIZ_FILE = path.join(__dirname, "cache", "quiz.json");

// ======================================================
// ASKED QUESTIONS
// ======================================================

const askedQuestions = new Set();

// ======================================================
// LOAD QUESTIONS FROM JSON
// ======================================================

function loadQuestions() {

  // Check file
  if (!fs.existsSync(QUIZ_FILE)) {

    throw new Error(
      "quiz.json file not found!\n\n" +
      "Expected location:\n" +
      QUIZ_FILE
    );
  }

  try {

    const data = fs.readFileSync(
      QUIZ_FILE,
      "utf8"
    );

    const questions = JSON.parse(data);

    if (!Array.isArray(questions)) {
      throw new Error(
        "quiz.json must contain an array of questions."
      );
    }

    if (questions.length === 0) {
      throw new Error(
        "quiz.json is empty."
      );
    }

    return questions;

  } catch (err) {

    throw new Error(
      "Unable to read quiz.json:\n" +
      err.message
    );
  }
}

// ======================================================
// RANDOM QUESTION
// ======================================================

function getRandomQuestion() {

  const questions = loadQuestions();

  // সব প্রশ্ন একবার হয়ে গেলে নতুন cycle
  if (askedQuestions.size >= questions.length) {
    askedQuestions.clear();
  }

  // এখনো যেসব প্রশ্ন আসেনি
  const availableQuestions = questions
    .map((question, index) => ({
      question,
      index
    }))
    .filter(
      item => !askedQuestions.has(item.index)
    );

  // Random question
  const selected =
    availableQuestions[
      Math.floor(
        Math.random() * availableQuestions.length
      )
    ];

  // Remember question
  askedQuestions.add(selected.index);

  return selected.question;
}

// ======================================================
// NORMALIZE ANSWER
// ======================================================

function normalizeAnswer(answer) {

  if (!answer) return "";

  return answer
    .trim()
    .toUpperCase()
    .replace(/[).:]/g, "");
}

// ======================================================
// /QUIZ COMMAND
// ======================================================

module.exports.run = async function ({
  api,
  event
}) {

  try {

    const quiz = getRandomQuestion();

    // Validate question
    if (
      !quiz.question ||
      !Array.isArray(quiz.options) ||
      quiz.options.length !== 4 ||
      !quiz.answer
    ) {

      return api.sendMessage(
        "Quiz Error!\n\n" +
        "The question format in quiz.json is incorrect.",
        event.threadID,
        event.messageID
      );
    }

    // ==================================================
    // QUESTION MESSAGE
    // ==================================================

    const message =
      "╭─────────────────╮\n" +
      "   ENGLISH LITERATURE QUIZ\n" +
      "╰─────────────────╯\n\n" +

      "Question:\n" +
      quiz.question +
      "\n\n" +

      quiz.options[0] + "\n" +
      quiz.options[1] + "\n" +
      quiz.options[2] + "\n" +
      quiz.options[3] +
      "\n\n" +

      "Reply to this message with:\n" +
      "A, B, C or D";

    return api.sendMessage(
      message,
      event.threadID,
      (err, info) => {

        if (err) return;

        // Save reply information
        global.client.handleReply.push({

          name: this.config.name,

          messageID: info.messageID,

          answer: quiz.answer,

          answered: false

        });

      },
      event.messageID
    );

  } catch (err) {

    return api.sendMessage(
      "❌ Quiz Error\n\n" +
      err.message,
      event.threadID,
      event.messageID
    );
  }
};

// ======================================================
// HANDLE ANSWER REPLY
// ======================================================

module.exports.handleReply = async function ({
  api,
  event,
  handleReply
}) {

  try {

    // ==================================================
    // ALREADY ANSWERED
    // ==================================================

    if (handleReply.answered) {

      return api.sendMessage(
        "⚠️ এই প্রশ্নটির উত্তর ইতোমধ্যে দেওয়া হয়েছে।\n\n" +
        "নতুন প্রশ্নের জন্য /quiz লিখুন।",
        event.threadID,
        event.messageID
      );
    }

    // ==================================================
    // USER ANSWER
    // ==================================================

    const userAnswer =
      normalizeAnswer(event.body);

    // ==================================================
    // ONLY A B C D
    // ==================================================

    if (
      userAnswer !== "A" &&
      userAnswer !== "B" &&
      userAnswer !== "C" &&
      userAnswer !== "D"
    ) {

      return api.sendMessage(
        "⚠️ শুধু A, B, C অথবা D লিখে উত্তর দিন।",
        event.threadID,
        event.messageID
      );
    }

    // Lock the question
    handleReply.answered = true;

    const correctAnswer =
      normalizeAnswer(handleReply.answer);

    // ==================================================
    // CORRECT
    // ==================================================

    if (userAnswer === correctAnswer) {

      return api.sendMessage(
        "✅ CORRECT!\n\n" +
        "আপনার উত্তর: " +
        userAnswer +
        "\n\n" +
        "অভিনন্দন! আপনার উত্তর সঠিক।",
        event.threadID,
        event.messageID
      );
    }

    // ==================================================
    // WRONG
    // ==================================================

    return api.sendMessage(
      "❌ WRONG!\n\n" +
      "আপনার উত্তর: " +
      userAnswer +
      "\n" +
      "সঠিক উত্তর: " +
      correctAnswer +
      "\n\n" +
      "পরের প্রশ্নের জন্য /quiz লিখুন।",
      event.threadID,
      event.messageID
    );

  } catch (err) {

    return api.sendMessage(
      "❌ Quiz Error:\n" +
      (err.message || "Failed to check answer."),
      event.threadID,
      event.messageID
    );
  }
};
