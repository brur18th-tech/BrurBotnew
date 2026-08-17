module.exports.config = {
  name: "tod",
  version: "1.0.0", 
  hasPermssion: 0,
  credits: "Truth or Dare Bot",
  description: "Play Truth or Dare inside the group without external json",
  commandCategory: "Fun",
  usages: "/tod truth অথবা /tod dare",
  cooldowns: 3,
  usePrefix: true
};

// ডাটাবেজ (কোডের ভেতরেই প্রশ্ন ও টাস্ক রাখা হলো)
const todData = {
  truth: [
    "আপনার ক্রাশের নাম কি?",
    "এমন কোন সিক্রেট আছে যা এই গ্রুপের কেউ জানে না?",
    "জীবনের সবচেয়ে লজ্জাজনক ঘটনা কোনটি?",
    "গ্রুপের কোন সদস্যকে আপনার সবচেয়ে বেশি বিরক্তিকর মনে হয়?",
    "আজকে সারা দিনে বলা সবচেয়ে বড় মিথ্যা কথাটি কি ছিল?",
    "পড়ালেখা বা কাজের বাহানা দিয়ে শেষ কবে মিথ্যা বলেছিলেন?",
    "কারো মেসেজ দেখেও ইচ্ছাকৃতভাবে সিন না করে রেখে দিয়েছেন কখনো?",
    "গ্রুপের কার সাথে ডেটে যেতে চান?",
    "কারো ওপর কখনো রিভেঞ্জ বা প্রতিশোধ নেওয়ার ইচ্ছা হয়েছে?",
    "নিজের কোন অভ্যাসটি আপনি সবচেয়ে বেশি অপছন্দ করেন?"
  ],
  dare: [
    "গ্রুপের যেকোনো একজনকে ট্যাগ করে বলুন 'আই লাভ ইউ'!",
    "নিজের একটি ফানি সেলফি তুলে গ্রুপে পাঠান।",
    "১০ সেকেন্ডের একটি ভয়েস নোট পাঠান যেখানে আপনাকে গান গাইতে হবে!",
    "আপনার প্রোফাইল পিকচার বদলে আগামী ১ ঘণ্টার জন্য একটি মিম ছবি দিন।",
    "গ্রুপের অ্যাডমিনকে ট্যাগ করে একটি বড় প্রশংসা করে মেসেজ দিন।",
    "আপনার ফেসবুকের লাস্ট সার্চ হিস্ট্রির একটি স্ক্রিনশট গ্রুপে দিন।",
    "গ্রুপের যেকোনো ৩ জন সদস্যের নামের পাশে ফানি ডাকনাম বানিয়ে দিন।",
    "আপনার ফেভারিট ইমোজি দিয়ে পর পর ৫টি ফানি মেসেজ পাঠান।",
    "পরবর্তী ৫ মিনিটের জন্য গ্রুপে সব প্রশ্নের উত্তর শুধু একটি শব্দে দিন!",
    "গ্রুপের যেকোনো একজনের সাথে আগামী ২ মিনিট সিরিয়াস নাটকের অভিনয় করে মেসেজ দিন।"
  ]
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const choice = args[0] ? args[0].toLowerCase() : null;

    // ইউজার যদি কিছু না লেখে বা ভুল লেখে
    if (choice !== "truth" && choice !== "dare") {
      return api.sendMessage(
        "🎯 **TRUTH OR DARE** 🎯\n\nখেলার জন্য যেকোনো একটি নির্বাচন করুন:\n👉 `/tod truth` (সত্যি বলার জন্য)\n👉 `/tod dare` (মজার চ্যালেঞ্জ নেওয়ার জন্য)", 
        event.threadID, 
        event.messageID
      );
    }

    if (choice === "truth") {
      const randomTruth = todData.truth[Math.floor(Math.random() * todData.truth.length)];
      const msg = `🤫 **TRUTH (সত্যি বলো)** 🤫\n\n❓ ${randomTruth}\n\n👉 সততার সাথে উত্তর দাও!`;
      return api.sendMessage(msg, event.threadID, event.messageID);
    } 
    
    if (choice === "dare") {
      const randomDare = todData.dare[Math.floor(Math.random() * todData.dare.length)];
      const msg = `🔥 **DARE (চ্যালেঞ্জ)** 🔥\n\n🎯 ${randomDare}\n\n👉 সাহস থাকলে চ্যালেঞ্জটি পূরণ করো!`;
      return api.sendMessage(msg, event.threadID, event.messageID);
    }

  } catch (error) {
    return api.sendMessage(`❌ Error: ${error.message}`, event.threadID, event.messageID);
  }
};
