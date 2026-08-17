const axios = require("axios");

module.exports.config = {
  name: "tod",
  version: "4.0.0",
  hasPermssion: 0,
  credits: "TAWHID ISLAM SIAM",
  description: "Truth or Dare game with random questions, mentions, reply answers, and confirmation",
  commandCategory: "game",
  usages: "tod OR tod @mention",
  cooldowns: 5,
  usePrefix: true,
};

// ======================================================
// QUESTIONS DATA
// ======================================================

const truthQuestions = [
  // --- MUST HAVE QUESTIONS (PRIORITY) ---
  "আপনার ক্রাশের নাম কি?",
  "এমন কোন সিক্রেট আছে যা এই গ্রুপের কেউ জানে না?",
  "জীবনের সবচেয়ে লজ্জাজনক ঘটনা কোনটি?",
  "গ্রুপের কোন সদস্যকে আপনার সবচেয়ে বেশি বিরক্তিকর মনে হয়?",
  "আজকে সারা দিনে বলা সবচেয়ে বড় মিথ্যা কথাটি কি ছিল?",
  "পড়ালেখা বা কাজের বাহানা দিয়ে শেষ কবে মিথ্যা বলেছিলেন?",
  "কারো মেসেজ দেখেও ইচ্ছাকৃতভাবে সিন না করে রেখে দিয়েছেন কখনো?",
  "গ্রুপের কার সাথে ডেটে যেতে চান?",
  "কারো ওপর কখনো রিভেঞ্জ বা প্রতিশোধ নেওয়ার ইচ্ছা হয়েছে?",
  "নিজের কোন অভ্যাসটি আপনি সবচেয়ে বেশি অপছন্দ করেন?",

  // --- 1 TO 120 LISTED TRUTH QUESTIONS ---
  "আমাদের ব্যাচে প্রথম কার সাথে বন্ধুত্ব করতে চেয়েছিলে?",
  "ক্লাসে এমন কেউ আছে যাকে দেখে মনে হয় সে অনেক সিরিয়াস, কিন্তু আসলে একদম উল্টো?",
  "প্রথম দিন English Department দেখে তোমার প্রথম reaction কী ছিল?",
  "ক্লাসে সবচেয়ে বেশি কার সাথে কথা বলো?",
  "তোমার সবচেয়ে বেশি বলা একটি বাক্য কোনটি?",
  "পড়তে বসে কতক্ষণ পর ফোন হাতে নাও?",
  "কখনো কি ক্লাসে ঘুমিয়ে পড়েছ?",
  "এমন কোনো Subject আছে যেটার নাম শুনলেই ভয় লাগে?",
  "Group chat-এ message পড়ে reply না দিয়ে রেখে দেওয়ার কারণ কী?",
  "আমাদের batch-এর সবচেয়ে funny person কে?",
  "তোমার সবচেয়ে বড় academic weakness কী?",
  "কখনো কি assignment না করে অন্যের assignment দেখে বানিয়েছ?",
  "ক্লাসে attendance দেওয়ার সময় কখনো নিজের নাম শুনতে ভুল করেছ?",
  "তোমার সবচেয়ে embarrassing campus moment কোনটি?",
  "প্রথমে যাকে ভেবেছিলে একরকম, পরে দেখলে সম্পূর্ণ অন্যরকম—সে কে?",
  "Group-এ message আসলে notification দেখেই ignore করো?",
  "কখনো কি পড়ার ভান করে আসলে YouTube/Facebook চালিয়েছ?",
  "তোমার ফোনে সবচেয়ে বেশি ব্যবহৃত app কোনটি?",
  "কোন বন্ধুর সাথে তোমার সবচেয়ে বেশি ঝগড়া হয়?",
  "তুমি কি last-minute study person?",
  "কখনো কি কোনো শিক্ষককে দেখে রাস্তা পরিবর্তন করেছ?",
  "আমাদের batch-এর কোন বিষয়টা তোমার সবচেয়ে ভালো লাগে?",
  "তোমার সবচেয়ে অদ্ভুত habit কী?",
  "তোমাকে নিয়ে বন্ধুরা সবচেয়ে বেশি কোন বিষয় নিয়ে মজা করে?",
  "কখনো কি ভুল group-এ message পাঠিয়েছ?",
  "নিজের কোন গুণটা তুমি সবচেয়ে বেশি পছন্দ করো?",
  "নিজের কোন অভ্যাসটা পরিবর্তন করতে চাও?",
  "কখনো কি শুধু senior দেখলে হঠাৎ খুব ভদ্র হয়ে গেছ?",
  "তোমার phone gallery-তে সবচেয়ে random জিনিস কী আছে?",
  "কোন English word তুমি প্রথমে ভুল উচ্চারণ করতে?",
  "কখনো কি class-এর আগে পড়া না করে শুধু notes নিয়ে বসে থেকেছ?",
  "তোমার সবচেয়ে বেশি procrastinate করা কাজ কোনটি?",
  "আমাদের batch-এর কোন মানুষটির sense of humor সবচেয়ে ভালো?",
  "কখনো কি online আছো, কিন্তু সবাইকে বলেছ busy?",
  "তোমার জীবনের সবচেয়ে funny misunderstanding কী?",
  "তুমি বেশি introvert নাকি extrovert?",
  "কোনো বন্ধুর message-এর reply মাথায় লিখে রেখে পরে আর পাঠাওনি?",
  "তোমার সবচেয়ে অদ্ভুত nickname কী?",
  "আজকের Truth & Dare-এ আসলে কোন প্রশ্নটি পেতে ভয় পাচ্ছিলে?",
  "ক্লাসে না বুঝেও কখনো মাথা নেড়ে এমন ভাব করেছ যে সব বুঝেছ?",
  "কোনো শিক্ষক প্রশ্ন করলে উত্তর জানলেও চুপ থেকেছ?",
  "Group-এ message লিখে আবার delete করার record কতবার?",
  "তোমার সবচেয়ে বেশি ব্যবহৃত excuse কোনটি?",
  "কখনো কি assignment deadline-এর ১০ মিনিট আগে শুরু করেছ?",
  "কোন English word শুনলে তোমার মাথা blank হয়ে যায়?",
  "কখনো কি ভুল করে অন্য কারো নাম ধরে ডেকেছ?",
  "তোমার phone ছাড়া একদিন থাকা সম্ভব?",
  "ক্লাসে সবচেয়ে বেশি কোন জিনিসের জন্য অপেক্ষা করো—break, class শেষ, নাকি attendance?",
  "কখনো কি শুধু বন্ধু আসবে বলে campus-এ গিয়েছ?",
  "তোমার সবচেয়ে dramatic reaction কোন परिस्थितियों হয়?",
  "Group-এ কে সবচেয়ে বেশি online থাকে বলে মনে হয়?",
  "কে সবচেয়ে বেশি “কাল থেকে পড়ব” type?",
  "কে সবচেয়ে বেশি late করে?",
  "কে প্রথম দেখায় সবচেয়ে serious মনে হয়?",
  "কে সবচেয়ে বেশি কথা বলে বলে মনে হয়?",
  "তুমি কি lecture-এর চেয়ে break বেশি পছন্দ করো?",
  "কখনো কি পড়তে বসে ৫ মিনিটের জন্য ফোন নিয়ে এক ঘণ্টা কাটিয়েছ?",
  "তোমার favourite book কোনটি?",
  "তোমার favourite movie কোনটি?",
  "তোমার favourite নাটক বা series কোনটি?",
  "তোমার favourite actor কে?",
  "তোমার favourite actress কে?",
  "তোমার favourite singer কে?",
  "কোন গানটি তুমি বারবার শুনতে পারো?",
  "তোমার favourite food কী?",
  "তোমার favourite place কোনটি?",
  "ঘুরতে যাওয়ার সুযোগ পেলে প্রথম কোথায় যেতে চাইবে?",
  "তোমার favourite colour কী?",
  "তোমার সবচেয়ে প্রিয় season কোনটি?",
  "ছোটবেলার favourite cartoon কোনটি?",
  "তোমার favourite subject কোনটি?",
  "কোন subject একদম ভালো লাগে না?",
  "তোমার dream profession কী?",
  "জীবনে সবচেয়ে বেশি কী অর্জন করতে চাও?",
  "তোমার সবচেয়ে বড় inspiration কে?",
  "তোমার জীবনের favourite memory কোনটি?",
  "তুমি বেশি রাত জাগতে পছন্দ করো নাকি সকালে উঠতে?",
  "একা থাকতে ভালো লাগে নাকি বন্ধুদের সাথে?",
  "তোমার dream travel destination কোনটি?",
  "তোমার জীবনের এমন কোন ঘটনা আছে যেটা মনে পড়লে এখনো হাসি পায়?",
  "তোমার এমন কোনো secret talent আছে যা খুব কম মানুষ জানে?",
  "তুমি রাগ করলে সাধারণত কী করো?",
  "তোমাকে সবচেয়ে সহজে কী দিয়ে খুশি করা যায়?",
  "তুমি মানুষের কোন গুণটি সবচেয়ে বেশি পছন্দ করো?",
  "বন্ধুত্বের ক্ষেত্রে তোমার কাছে সবচেয়ে গুরুত্বপূর্ণ বিষয় কী?",
  "তুমি কি সহজে কাউকে বিশ্বাস করো?",
  "তোমার সবচেয়ে বড় fear কী?",
  "তোমার জীবনের সবচেয়ে memorable day কোনটি?",
  "তুমি যদি একদিনের জন্য famous হতে, কী কারণে famous হতে চাইতে?",
  "তোমার নিজের সম্পর্কে এমন কোন কথা আছে যা মানুষ সাধারণত ভুল বোঝে?",
  "আমাদের batch-এ প্রথম যাকে দেখে কথা বলতে ইচ্ছা হয়েছিল সে কে?",
  "আমাদের batch-এ কার সাথে সবচেয়ে বেশি কথা বলতে ভালো লাগে?",
  "এমন কেউ আছে যার সাথে এখনো properly কথা বলা হয়নি কিন্তু কথা বলতে চাও?",
  "আমাদের batch-এর সবচেয়ে শান্ত মানুষ কে?",
  "সবচেয়ে energetic কে?",
  "সবচেয়ে helpful কে?",
  "সবচেয়ে stylish কে?",
  "সবচেয়ে funny কে?",
  "সবচেয়ে serious কে?",
  "কার personality তোমার সবচেয়ে interesting লাগে?",
  "কার সাথে একদিন পুরো campus ঘুরতে চাইবে?",
  "কার সাথে group project করতে সবচেয়ে comfortable?",
  "তোমার কাছে ideal batchmate কেমন হওয়া উচিত?",
  "আমাদের batch-এর কোন জিনিসটা সবচেয়ে বেশি উপভোগ করো?",
  "18th Batch-এর সবচেয়ে memorable বিষয় কী হতে পারে বলে মনে হয়?",
  "তোমার favourite book কোনটি এবং কেন?",
  "তোমার favourite movie কোনটি?",
  "তোমার favourite নাটক বা series কোনটি?",
  "কোন গানটি তোমার mood সবচেয়ে দ্রুত ভালো করে দিতে পারে?",
  "তোমার favourite fictional character কে?",
  "কোন জায়গায় গেলে তুমি সবচেয়ে শান্তি অনুভব করো?",
  "তোমার dream vacation কেমন হবে?",
  "তোমার জীবনে এমন কে আছে যার কাছ থেকে অনেক কিছু শিখেছ?",
  "তোমার সবচেয়ে বড় personal goal কী?",
  "তোমার কাছে একজন ভালো বন্ধুর সংজ্ঞা কী?",
  "কোন কাজটি করতে তোমার সবচেয়ে বেশি আলসেমি লাগে?",
  "তোমার সবচেয়ে unusual hobby কী?",
  "তুমি যদি অতীতে ফিরে যেতে পারতে, কোন বয়সে ফিরে যেতে?",
  "তুমি যদি একটি movie বানাতে, movie-টির নাম কী দিতে?",
  "তোমার জীবনের soundtrack হিসেবে কোন গানটি বেছে নেবে?",
  "তোমার personality যদি একটি book হতো, তার title কী হতো?",
  "তোমাকে এক কথায় describe করতে হলে তুমি কোন শব্দটি বেছে নেবে?",
  "কোন compliment তুমি সবচেয়ে বেশি মনে রেখেছ?",
  "তোমার কাছে friendship নাকি love—কোনটি বেশি important?",
  "তোমার dream date কেমন হতে পারে?",
  "তোমার সবচেয়ে সুন্দর campus memory কোনটি?",
  "তোমার জীবনের সবচেয়ে funny mistake কোনটি?",
  "এমন কোনো কাজ আছে যা করতে তুমি অনেকদিন ধরে চাচ্ছ কিন্তু এখনো করা হয়নি?",
  "18th Batch-এর ৪ বছর পর নিজেকে কোথায় দেখতে চাও?"
];

const dareTasks = [
  // --- MUST HAVE DARE TASKS (PRIORITY) ---
  "গ্রুপের যেকোনো একজনকে ট্যাগ করে বলুন 'আই লাভ ইউ'!",
  "নিজের একটি ফানি সেলফি তুলে গ্রুপে পাঠান।",
  "১০ সেকেন্ডের একটি ভয়েস নোট পাঠান যেখানে আপনাকে গান গাইতে হবে!",
  "আপনার প্রোফাইল পিকচার বদলে আগামী ১ ঘণ্টার জন্য একটি মিম ছবি দিন।",
  "গ্রুপের অ্যাডমিনকে ট্যাগ করে একটি বড় প্রশংসা করে মেসেজ দিন।",
  "আপনার ফেসবুকের লাস্ট সার্চ হিস্ট্রির একটি স্ক্রিনশট গ্রুপে দিন।",
  "গ্রুপের যেকোনো ৩ জন সদস্যের নামের পাশে ফানি ডাকনাম বানিয়ে দিন।",
  "আপনার ফেভারিট ইমোজি দিয়ে পর পর ৫টি ফানি মেসেজ পাঠান।",

  // --- 1 TO 120 LISTED DARE TASKS ---
  "Group-এ শুধু লিখো: “আমি আজ থেকে পড়াশোনায় সিরিয়াস।”",
  "নিজের নামের সাথে একটি funny title যোগ করে লিখো।",
  "পরপর ৩টি message শুধু English-এ লিখো।",
  "নিজের সম্পর্কে একটি funny fact group-এ বলো।",
  "৩০ সেকেন্ডের voice message পাঠিয়ে news reporter-এর মতো নিজের আজকের দিন বলো।",
  "নিজের নামের একটি funny acronym বানাও।",
  "নিজের profile picture-এর জন্য একটি funny caption বানাও।",
  "৫টি English word লিখে প্রত্যেকটির funny বাংলা meaning বানাও।",
  "একজন বন্ধুকে tag করে তার একটি ভালো গুণ বলো।",
  "৩০ সেকেন্ডে নিজের imaginary autobiography-এর title দাও।",
  "শুধু emoji দিয়ে নিজের আজকের mood বোঝাও।",
  "৫টি emoji দিয়ে নিজের personality প্রকাশ করো।",
  "নিজের জন্য একটি fictional award ঘোষণা করো।",
  "একটি বাংলা বাক্যকে অতিরিক্ত formal English-এ বলো।",
  "নিজের জন্য একটি funny university nickname তৈরি করো।",
  "একজন batchmate-কে compliment দাও, তবে সেটা অবশ্যই genuine হতে হবে।",
  "একটি কঠিন English word-এর বাংলা funny explanation দাও।",
  "নিজের আজকের mood-এর জন্য একটি movie title বানাও।",
  "একজন batchmate-কে tag করে বলো: “তোমাকে দেখে মনে হয় তুমি...” এবং একটি ভালো/মজার কিন্তু ভদ্র কথা শেষ করো।",
  "নিজের জীবনের জন্য একটি movie poster-এর tagline বানাও।",
  "Group-এ ৫টি English reaction লিখো, যেমন: Seriously?!, No way!, I'm done!",
  "নিজের নামকে একটি fictional English character-এর নাম বানাও।",
  "৩০ সেকেন্ডের voice message-এ এমনভাবে কথা বলো যেন তুমি University-এর Principal।",
  "একটি imaginary exam question বানাও যার উত্তর কেউ জানবে না।",
  "Group-এ লিখো: “18th Batch আজও টিকে আছে।”",
  "নিজের নাম দিয়ে একটি ৩ শব্দের slogan বানাও।",
  "Group-এ একটি imaginary breaking news প্রকাশ করো।",
  "“আজকের প্রধান সংবাদ” দিয়ে নিজের জীবনের একটি ছোট ঘটনা বলো।",
  "৩টি emoji দিয়ে নিজের academic life বোঝাও।",
  "নিজের future profession-এর একটি funny version বানাও।",
  "নিজের জন্য একটি fictional university position ঘোষণা করো।",
  "একটি এমন English sentence লেখো যেটা শুনতে খুব intelligent কিন্তু অর্থহীন।",
  "Group-এ নিজের জন্য একটি funny but respectful introduction দাও।",
  "১৫ সেকেন্ডে English alphabet উল্টো দিক থেকে বলার চেষ্টা করো।",
  "নিজের বর্তমান mood-কে একটি weather forecast হিসেবে প্রকাশ করো।",
  "একজন বন্ধুর নাম না নিয়ে তার personality নিয়ে ৩টি clue দাও।",
  "নিজের আজকের দিনকে একটি movie-এর নাম দাও।",
  "নিজের academic life নিয়ে একটি meme caption বানাও।",
  "২০ সেকেন্ডে একজন motivational speaker-এর মতো সবাইকে পড়াশোনা করতে বলো।",
  "নিজের phone-কে উদ্দেশ্য করে একটি emotional message লেখো।",
  "একটি imaginary award দাও: “Best Procrastinator Award goes to…”",
  "৩টি English idiom ব্যবহার করে নিজের দিন সম্পর্কে একটি sentence বানাও।",
  "নিজের নামকে একটি Shakespearean character-এর মতো introduce করো।",
  "শেষ পর্যন্ত লিখো: “I accept my fate. Next player!”",
  "Group-এর কাউকে mention করে harmless ও respectfulভাবে একটি funny proposal দাও।",
  "Group-এর কাউকে mention করে বলো: “তোমাকে আমার আজকের favourite person ঘোষণা করলাম।”",
  "Group-এর একজনকে mention করে একটি মজার pickup line বলো।",
  "কাউকে mention করে তার জন্য একটি দুই লাইনের fictional love story বানাও।",
  "একজন batchmate-কে mention করে বলো কেন তার সাথে coffee খেতে যেতে পারতে।",
  "Group-এর কাউকে mention করে একটি harmless “Will you be my…” proposal দাও।",
  "একজন batchmate-কে mention করে তার জন্য একটি cute nickname বানাও।",
  "কাউকে mention করে একটি romantic movie-এর dialogue নিজের মতো করে বলো।",
  "একজন batchmate-কে mention করে তার একটি ভালো গুণের প্রশংসা করো।",
  "২০–৩০ সেকেন্ডের একটি গান গেয়ে voice message পাঠাও।",
  "তোমার favourite গানের ২ লাইন গেয়ে শোনাও।",
  "কোনো একটি English song-এর chorus গাও।",
  "একটি গানকে নিজের মতো করে funny version-এ গাও।",
  "২০ সেকেন্ডে একজন radio jockey-এর মতো একটি গান introduce করো।",
  "একটি গান বেছে নিয়ে বলো কেন গানটি তোমার favourite।",
  "কোনো একটি গানকে dramatic movie trailer-এর মতো introduce করো।",
  "একটি জনপ্রিয় গানের title ব্যবহার করে নিজের আজকের mood প্রকাশ করো।",
  "নিজের আজকের mood শুধু ৫টি emoji দিয়ে প্রকাশ করো।",
  "Group-এ একটি funny English sentence লেখো।",
  "একজন batchmate-কে একটি genuine compliment দাও।",
  "নিজের নামের একটি creative abbreviation বানাও।",
  "১৫ সেকেন্ডের voice message-এ news reporter হয়ে কথা বলো।",
  "নিজের academic life-এর জন্য একটি movie title বানাও।",
  "“আমি পড়তে বসেছিলাম, কিন্তু…” — বাক্যটি নিজের মতো করে শেষ করো।",
  "একজন বন্ধুকে harmless একটি challenge দাও।",
  "নিজের জন্য একটি fictional award ঘোষণা করো।",
  "Group-এ একটি নতুন English Department slogan দাও।",
  "নিজের favourite movie-এর character হিসেবে ২ লাইনের dialogue বলো।",
  "নিজের favourite বই নিয়ে ২০ সেকেন্ডের mini-review দাও।",
  "নিজের future self-কে উদ্দেশ্য করে একটি funny message লেখো।",
  "নিজের নাম দিয়ে একটি imaginary brand তৈরি করো।",
  "Group-এ নিজের জন্য একটি funny but respectful bio লেখো।",
  "নিজের personality-কে একটি movie genre-এর সাথে তুলনা করো।",
  "একজন batchmate-কে mention করে বলো, তার সাথে কোন fictional adventure-এ যেতে চাও।",
  "নিজের life-এর জন্য একটি funny headline বানাও।",
  "Group-এ লিখো: “Breaking News: আজ আমি পড়াশোনা শুরু করেছি!”",
  "২০ সেকেন্ডে নিজের জীবনের story একজন storyteller-এর মতো বলো।",
  "নিজের favourite movie, favourite song এবং favourite book একসাথে লিখে দাও।",
  "একজন batchmate-কে mention করে তার জন্য একটি fictional award ঘোষণা করো।",
  "নিজের জন্য একটি imaginary English Department title বানাও।",
  "Group-এ এমন একটি sentence লেখো যাতে বাংলা, English এবং একটি emoji থাকবে।",
  "নিজের নামের প্রথম অক্ষর দিয়ে ৫টি positive English word লেখো।",
  "নিজের আজকের দিনকে একটি weather report হিসেবে ২ লাইনে বলো।",
  "“If I were the Head of the Department…” — বাক্যটি মজারভাবে শেষ করো।",
  "নিজের জন্য একটি fictional newspaper headline বানাও।",
  "Group-এ লিখো: “I survived another day in English Department.”",
  "নিজের সবচেয়ে প্রিয় গানটি লিখে তার একটি line quote না করে নিজের ভাষায় কেন ভালো লাগে বলো।",
  "একজন batchmate-কে mention করে তার সাথে একটি fictional coffee conversation শুরু করো।",
  "নিজের জীবনের জন্য একটি funny English motto বানাও।",
  "১৫ সেকেন্ডের voice message-এ নিজেকে একজন motivational speaker হিসেবে introduce করো।",
  "Group-এর জন্য একটি নতুন Truth & Dare question তৈরি করো।",
  "শেষ করে লিখো: “Challenge completed. Next victim, I mean player!”"
];

// ======================================================
// HELPER FUNCTION: RANDOM ITEM PICKER
// ======================================================

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// ======================================================
// MAIN COMMAND
// ======================================================

module.exports.run = async function ({ api, event, Users }) {
  const { threadID, messageID, senderID, mentions } = event;

  let targetID = senderID;
  let targetName = "";

  const mentionIDs = Object.keys(mentions);

  if (mentionIDs.length > 0) {
    targetID = mentionIDs[0];
    targetName = mentions[targetID].replace("@", "");
  } else {
    try {
      targetName = await Users.getNameUser(senderID);
    } catch (e) {
      targetName = "Player";
    }
  }

  const msg =
    `🎯 TRUTH OR DARE GAME\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `Player: ${targetName}\n\n` +
    `Please choose an option by replying to this message with a number:\n` +
    `1. Truth 🤫\n` +
    `2. Dare 😈`;

  return api.sendMessage(
    msg,
    threadID,
    (err, info) => {
      if (err) return;

      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        targetID: targetID,
        targetName: targetName,
        step: "CHOOSE_MODE"
      });
    },
    messageID
  );
};

// ======================================================
// HANDLE REPLY
// ======================================================

module.exports.handleReply = async function ({ api, event, handleReply }) {
  const { threadID, messageID, senderID, body } = event;

  // নির্দিষ্ট প্লেয়ার ছাড়া অন্য কেউ উত্তর দিলে তা গ্রহণ করবে না
  if (senderID !== handleReply.targetID) {
    return api.sendMessage(
      `⚠️ Only ${handleReply.targetName} can reply to this prompt!`,
      threadID,
      messageID
    );
  }

  const userReply = body ? body.trim() : "";

  // ----------------------------------------------------
  // STEP 1: Choose Truth or Dare
  // ----------------------------------------------------
  if (handleReply.step === "CHOOSE_MODE") {
    let mode = "";
    let question = "";

    if (userReply === "1" || userReply.toLowerCase() === "truth") {
      mode = "TRUTH 🤫";
      question = getRandomItem(truthQuestions);
    } else if (userReply === "2" || userReply.toLowerCase() === "dare") {
      mode = "DARE 😈";
      question = getRandomItem(dareTasks);
    } else {
      return api.sendMessage(
        "❌ Invalid choice! Please reply with 1 for Truth or 2 for Dare.",
        threadID,
        messageID
      );
    }

    const qMsg =
      `🎯 ${mode}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `Player: ${handleReply.targetName}\n\n` +
      `Question/Task: ${question}\n\n` +
      `📌 Reply to this message with your answer/proof to submit!`;

    return api.sendMessage(
      qMsg,
      threadID,
      (err, info) => {
        if (err) return;

        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          targetID: handleReply.targetID,
          targetName: handleReply.targetName,
          question: question,
          mode: mode,
          step: "SUBMIT_ANSWER"
        });
      },
      messageID
    );
  }

  // ----------------------------------------------------
  // STEP 2: Submit Answer & Ask Confirmation
  // ----------------------------------------------------
  if (handleReply.step === "SUBMIT_ANSWER") {
    if (!userReply) return;

    const confirmMsg =
      `📋 ANSWER CONFIRMATION\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `Your Submitted Answer:\n"${userReply}"\n\n` +
      `Do you accept and finalize this answer?\n` +
      `1. Yes ✅\n` +
      `2. No ❌ (Try Again)`;

    return api.sendMessage(
      confirmMsg,
      threadID,
      (err, info) => {
        if (err) return;

        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          targetID: handleReply.targetID,
          targetName: handleReply.targetName,
          question: handleReply.question,
          mode: handleReply.mode,
          lastAnswer: userReply,
          step: "CONFIRM_ANSWER"
        });
      },
      messageID
    );
  }

  // ----------------------------------------------------
  // STEP 3: Handle Confirmation (Yes / No)
  // ----------------------------------------------------
  if (handleReply.step === "CONFIRM_ANSWER") {
    if (userReply === "1" || userReply.toLowerCase() === "yes") {
      const finalMsg =
        `🎉 GAME COMPLETED!\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `Player: ${handleReply.targetName}\n` +
        `Mode: ${handleReply.mode}\n` +
        `Task: ${handleReply.question}\n\n` +
        `Final Answer: "${handleReply.lastAnswer}"\n\n` +
        `Great job playing! 👏`;

      return api.sendMessage(finalMsg, threadID, messageID);

    } else if (userReply === "2" || userReply.toLowerCase() === "no") {
      const retryMsg =
        `🔄 Answer rejected!\n\n` +
        `Task: ${handleReply.question}\n\n` +
        `📌 Please reply to THIS message with your new answer/proof.`;

      return api.sendMessage(
        retryMsg,
        threadID,
        (err, info) => {
          if (err) return;

          global.client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            targetID: handleReply.targetID,
            targetName: handleReply.targetName,
            question: handleReply.question,
            mode: handleReply.mode,
            step: "SUBMIT_ANSWER"
          });
        },
        messageID
      );
    } else {
      return api.sendMessage(
        "❌ Invalid choice! Reply with 1 for Yes or 2 for No.",
        threadID,
        messageID
      );
    }
  }
};
