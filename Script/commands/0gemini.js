const axios = require("axios");

module.exports.config = {
  name: "gemini",
  version: "1.1.0",
  hasPermssion: 0,
  credits: "TAWHID ISLAM SIAM",
  description: "Ask Gemini AI anything and reply to continue conversation",
  commandCategory: "AI",
  usages: "[question]",
  cooldowns: 5,
  usePrefix: true
};

// ================================
// PUT YOUR GEMINI API KEY HERE
// ================================
const GEMINI_API_KEY = "AQ.Ab8RN6KK1NDq1RLUE3hGMNtgQrPji_kOA-0I91AKXkfE1vkxzA";

// Gemini model
const MODEL = "gemini-3.6-flash";

// ================================
// Clean Gemini Markdown Output
// ================================
function cleanOutput(text) {
  if (!text) return "Sorry, I couldn't generate an answer.";

  return text
    // Remove code block markers
    .replace(/```[a-zA-Z0-9_-]*\n?/g, "")
    .replace(/```/g, "")

    // Remove headings: ### Heading / ## Heading / # Heading
    .replace(/^\s*#{1,6}\s*/gm, "")

    // Remove bold/italic Markdown
    .replace(/\*\*\*(.*?)\*\*\*/gs, "$1")
    .replace(/\*\*(.*?)\*\*/gs, "$1")
    .replace(/\*(.*?)\*/gs, "$1")
    .replace(/___(.*?)___/gs, "$1")
    .replace(/__(.*?)__/gs, "$1")
    .replace(/_(.*?)_/gs, "$1")

    // Remove horizontal lines
    .replace(/^\s*([-*_])(?:\s*\1){2,}\s*$/gm, "")

    // Convert Markdown bullet points to clean bullets
    .replace(/^\s*[-*+]\s+/gm, "• ")

    // Remove unnecessary spaces before punctuation
    .replace(/\s+([,.!?;:])/g, "$1")

    // Remove excessive blank lines
    .replace(/\n{3,}/g, "\n\n")

    .trim();
}

// Common Function to call Gemini API
async function askGemini(prompt) {
  const API_URL =
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

  const response = await axios.post(
    API_URL,
    {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ]
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY
      },
      timeout: 30000
    }
  );

  let answer =
    response.data?.candidates?.[0]?.content?.parts
      ?.map(part => part.text || "")
      .join("")
      .trim();

  return cleanOutput(answer);
}

// 1. Initial Command Trigger
module.exports.run = async function ({ api, event, args }) {
  let waitMsg;

  try {
    if (!args.length) {
      return api.sendMessage(
        "Please ask me something.\n\nExample:\n/gemini What is artificial intelligence?",
        event.threadID,
        event.messageID
      );
    }

    const question = args.join(" ");

    waitMsg = await api.sendMessage(
      "⏳ Thinking...",
      event.threadID
    );

    const answer = await askGemini(question);

    if (waitMsg?.messageID) {
      try {
        await api.unsendMessage(waitMsg.messageID);
      } catch (e) {}
    }

    return api.sendMessage(
      answer,
      event.threadID,
      (err, info) => {
        if (err) return;

        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: event.senderID
        });
      },
      event.messageID
    );

  } catch (err) {

    if (waitMsg?.messageID) {
      try {
        await api.unsendMessage(waitMsg.messageID);
      } catch (e) {}
    }

    let errorMessage = "Gemini API Error.";

    if (err.response?.data?.error?.message) {
      errorMessage += "\n\n" + err.response.data.error.message;
    } else if (err.message) {
      errorMessage += "\n\n" + err.message;
    }

    return api.sendMessage(
      errorMessage,
      event.threadID,
      event.messageID
    );
  }
};

// 2. Handle Reply Event
module.exports.handleReply = async function ({
  api,
  event,
  handleReply
}) {
  let waitMsg;

  try {
    const question = event.body;

    if (!question) return;

    waitMsg = await api.sendMessage(
      "⏳ Thinking...",
      event.threadID
    );

    const answer = await askGemini(question);

    if (waitMsg?.messageID) {
      try {
        await api.unsendMessage(waitMsg.messageID);
      } catch (e) {}
    }

    return api.sendMessage(
      answer,
      event.threadID,
      (err, info) => {
        if (err) return;

        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: event.senderID
        });
      },
      event.messageID
    );

  } catch (err) {

    if (waitMsg?.messageID) {
      try {
        await api.unsendMessage(waitMsg.messageID);
      } catch (e) {}
    }

    return api.sendMessage(
      "Gemini API Error: " +
      (err.message || "Failed to process reply"),
      event.threadID,
      event.messageID
    );
  }
};
