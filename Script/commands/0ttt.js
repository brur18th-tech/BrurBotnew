module.exports.config = {
  name: "ttt",
  version: "3.0.0",
  hasPermssion: 0,
  credits: "TAWHID ISLAM SIAM",
  description: "Play TicTacToe - Ultra Clean Emoji Only UI",
  commandCategory: "game",
  usages: "[@mention or leave blank for Bot]",
  cooldowns: 3,
  usePrefix: true
};

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const numEmojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];

// শুধু ইমোজি গ্রিড রেন্ডারার (কোনো অতিরিক্ত টেক্সট ছাড়া)
function renderCleanBoard(board) {
  let str = "";
  for (let i = 0; i < 9; i += 3) {
    const cell1 = board[i] === "⏹️" ? numEmojis[i] : board[i];
    const cell2 = board[i+1] === "⏹️" ? numEmojis[i+1] : board[i+1];
    const cell3 = board[i+2] === "⏹️" ? numEmojis[i+2] : board[i+2];
    str += `${cell1} ${cell2} ${cell3}\n`;
  }
  return str.trim();
}

function checkWin(board, symbol) {
  return winningCombinations.some(combo => 
    combo.every(index => board[index] === symbol)
  );
}

function checkDraw(board) {
  return board.every(cell => cell !== "⏹️");
}

function botBestMove(board) {
  for (let i = 0; i < 9; i++) {
    if (board[i] === "⏹️") {
      board[i] = "❌";
      if (checkWin(board, "❌")) { board[i] = "⏹️"; return i; }
      board[i] = "⏹️";
    }
  }
  for (let i = 0; i < 9; i++) {
    if (board[i] === "⏹️") {
      board[i] = "⭕";
      if (checkWin(board, "⭕")) { board[i] = "⏹️"; return i; }
      board[i] = "⏹️";
    }
  }
  if (board[4] === "⏹️") return 4;
  const available = [];
  for (let i = 0; i < 9; i++) {
    if (board[i] === "⏹️") available.push(i);
  }
  return available[Math.floor(Math.random() * available.length)];
}

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID, senderID, mentions } = event;

  let player1 = senderID;
  let player2 = null;
  let isBot = false;

  const mentionKeys = Object.keys(mentions);

  if (mentionKeys.length > 0) {
    player2 = mentionKeys[0];
    if (player2 === senderID) {
      return api.sendMessage("❌ আপনি নিজের সাথে খেলতে পারবেন না!", threadID, messageID);
    }
  } else {
    isBot = true;
    player2 = api.getCurrentUserID();
  }

  const board = Array(9).fill("⏹️");
  const p1Name = (await api.getUserInfo(player1))[player1].name;
  const p2Name = isBot ? "BRUR Bot 🤖" : mentions[player2].replace("@", "");

  // প্রথমবারের সূচনা মেসেজ (শুধুমাত্র এই একবারই টেক্সট থাকবে)
  const startMsg = 
`❌ 𝗧𝗜𝗖-𝗧𝗔𝗖-𝗧𝗢𝗘 ⭕
────────────────
${renderCleanBoard(board)}
────────────────
🎮 Game Started!

⭕ Player 1: ${p1Name}
❌ Player 2: ${p2Name}

👉 ${p1Name}-এর চাল! (১-৯ লিখে মেসেজে Reply দিন)`;

  return api.sendMessage(startMsg, threadID, (err, info) => {
    if (err) return;
    global.client.handleReply.push({
      name: this.config.name,
      messageID: info.messageID,
      board,
      player1,
      player2,
      isBot,
      currentTurn: player1,
      p1Name,
      p2Name
    });
  }, messageID);
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  const { threadID, messageID, senderID, body } = event;
  let { board, player1, player2, isBot, currentTurn, p1Name, p2Name } = handleReply;

  // ১. অনাকাঙ্ক্ষিত মেম্বারের রিপ্লাই প্রতিরোধ
  if (senderID !== currentTurn) {
    return api.sendMessage("❌ এটি আপনার চাল নয়!", threadID, messageID);
  }

  const move = parseInt(body.trim());
  if (isNaN(move) || move < 1 || move > 9) {
    return api.sendMessage("❌ ১ থেকে ৯ এর মধ্যে খালি ঘর বেছে নিয়ে Reply দিন!", threadID, messageID);
  }

  const index = move - 1;
  if (board[index] !== "⏹️") {
    return api.sendMessage("⚠️ এই ঘরটি ইতোমধ্যেই ব্যবহৃত! অন্য ঘর বেছে নিন।", threadID, messageID);
  }

  const symbol = senderID === player1 ? "⭕" : "❌";
  board[index] = symbol;

  // ২. বিজয়ী চেক
  if (checkWin(board, symbol)) {
    const winnerID = senderID;
    const winnerName = winnerID === player1 ? p1Name : p2Name;
    
    const winMsg = {
      body: `${renderCleanBoard(board)}\n\n🏆 CONGRATULATIONS!\n🎉 @${winnerName} খেলায় জয়লাভ করেছেন! 👏`,
      mentions: winnerID !== api.getCurrentUserID() ? [{ id: winnerID, tag: `@${winnerName}` }] : []
    };
    return api.sendMessage(winMsg, threadID, messageID);
  }

  // ৩. ড্র চেক
  if (checkDraw(board)) {
    return api.sendMessage(`${renderCleanBoard(board)}\n\n🤝 GAME DRAW!\nখেলাটি সমতায় শেষ হয়েছে!`, threadID, messageID);
  }

  // ৪. বটের চাল
  if (isBot) {
    const botMoveIndex = botBestMove(board);
    board[botMoveIndex] = "❌";

    if (checkWin(board, "❌")) {
      return api.sendMessage(`${renderCleanBoard(board)}\n\n💀 GAME OVER!\nবট আপনাকে হারিয়ে দিয়েছে! 🤖`, threadID, messageID);
    }

    if (checkDraw(board)) {
      return api.sendMessage(`${renderCleanBoard(board)}\n\n🤝 GAME DRAW!\nখেলাটি সমতায় শেষ হয়েছে!`, threadID, messageID);
    }

    // শুধু ইমোজি গ্রিড আউটপুট
    return api.sendMessage(renderCleanBoard(board), threadID, (err, info) => {
      if (!err) {
        global.client.handleReply.push({
          ...handleReply,
          messageID: info.messageID,
          board,
          currentTurn: player1
        });
      }
    }, messageID);

  } else {
    // ২ জন প্লেয়ারের ক্ষেত্রে শুধু ইমোজি গ্রিড আউটপুট
    const nextTurn = currentTurn === player1 ? player2 : player1;

    return api.sendMessage(renderCleanBoard(board), threadID, (err, info) => {
      if (!err) {
        global.client.handleReply.push({
          ...handleReply,
          messageID: info.messageID,
          board,
          currentTurn: nextTurn
        });
      }
    }, messageID);
  }
};
