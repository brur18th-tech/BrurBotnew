const axios = require("axios");
const fs = require("fs-extra");

module.exports.config = {
  name: "country",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "TAWHID ISLAM SIAM",
  description: "Guess the country from its flag",
  commandCategory: "game",
  usages: "country",
  cooldowns: 5,
  usePrefix: true
};

// ======================================================
// COUNTRY DATA
// ======================================================

const countries = [
  // =========================
  // VERY COMMON COUNTRIES
  // =========================

  { name: "Bangladesh", code: "bd", weight: 10 },
  { name: "India", code: "in", weight: 10 },
  { name: "Pakistan", code: "pk", weight: 9 },
  { name: "United States", code: "us", weight: 10 },
  { name: "United Kingdom", code: "gb", weight: 9 },
  { name: "China", code: "cn", weight: 10 },
  { name: "Japan", code: "jp", weight: 10 },
  { name: "Russia", code: "ru", weight: 9 },
  { name: "Canada", code: "ca", weight: 8 },
  { name: "Australia", code: "au", weight: 8 },
  { name: "Germany", code: "de", weight: 9 },
  { name: "France", code: "fr", weight: 9 },
  { name: "Italy", code: "it", weight: 8 },
  { name: "Brazil", code: "br", weight: 9 },
  { name: "Saudi Arabia", code: "sa", weight: 8 },
  { name: "United Arab Emirates", code: "ae", weight: 8 },
  { name: "Turkey", code: "tr", weight: 8 },
  { name: "South Korea", code: "kr", weight: 8 },
  { name: "Malaysia", code: "my", weight: 7 },
  { name: "Indonesia", code: "id", weight: 8 },
  { name: "Thailand", code: "th", weight: 7 },
  { name: "Singapore", code: "sg", weight: 7 },
  { name: "Nepal", code: "np", weight: 7 },
  { name: "Sri Lanka", code: "lk", weight: 7 },
  { name: "Afghanistan", code: "af", weight: 7 },
  { name: "Iran", code: "ir", weight: 7 },
  { name: "Iraq", code: "iq", weight: 7 },
  { name: "Israel", code: "il", weight: 6 },
  { name: "Palestine", code: "ps", weight: 7 },
  { name: "Qatar", code: "qa", weight: 7 },
  { name: "Kuwait", code: "kw", weight: 6 },
  { name: "Egypt", code: "eg", weight: 7 },
  { name: "South Africa", code: "za", weight: 7 },
  { name: "Nigeria", code: "ng", weight: 6 },
  { name: "Mexico", code: "mx", weight: 7 },
  { name: "Argentina", code: "ar", weight: 8 },
  { name: "Spain", code: "es", weight: 8 },
  { name: "Portugal", code: "pt", weight: 6 },
  { name: "Netherlands", code: "nl", weight: 7 },
  { name: "Switzerland", code: "ch", weight: 6 },
  { name: "Sweden", code: "se", weight: 6 },
  { name: "Norway", code: "no", weight: 6 },
  { name: "Denmark", code: "dk", weight: 5 },
  { name: "Greece", code: "gr", weight: 6 },
  { name: "Ukraine", code: "ua", weight: 7 },

  // =========================
  // OTHER COUNTRIES
  // =========================

  { name: "Albania", code: "al", weight: 1 },
  { name: "Algeria", code: "dz", weight: 2 },
  { name: "Andorra", code: "ad", weight: 1 },
  { name: "Angola", code: "ao", weight: 2 },
  { name: "Armenia", code: "am", weight: 2 },
  { name: "Austria", code: "at", weight: 3 },
  { name: "Azerbaijan", code: "az", weight: 2 },

  { name: "Bahamas", code: "bs", weight: 2 },
  { name: "Bahrain", code: "bh", weight: 3 },
  { name: "Barbados", code: "bb", weight: 1 },
  { name: "Belarus", code: "by", weight: 2 },
  { name: "Belgium", code: "be", weight: 4 },
  { name: "Belize", code: "bz", weight: 1 },
  { name: "Benin", code: "bj", weight: 1 },
  { name: "Bhutan", code: "bt", weight: 3 },
  { name: "Bolivia", code: "bo", weight: 2 },
  { name: "Bosnia and Herzegovina", code: "ba", weight: 2 },
  { name: "Botswana", code: "bw", weight: 1 },
  { name: "Brunei", code: "bn", weight: 2 },
  { name: "Bulgaria", code: "bg", weight: 2 },
  { name: "Burkina Faso", code: "bf", weight: 1 },
  { name: "Burundi", code: "bi", weight: 1 },

  { name: "Cambodia", code: "kh", weight: 4 },
  { name: "Cameroon", code: "cm", weight: 1 },
  { name: "Chad", code: "td", weight: 1 },
  { name: "Chile", code: "cl", weight: 4 },
  { name: "Colombia", code: "co", weight: 5 },
  { name: "Comoros", code: "km", weight: 1 },
  { name: "Costa Rica", code: "cr", weight: 2 },
  { name: "Croatia", code: "hr", weight: 3 },
  { name: "Cuba", code: "cu", weight: 3 },
  { name: "Cyprus", code: "cy", weight: 2 },
  { name: "Czech Republic", code: "cz", weight: 3 },

  { name: "Djibouti", code: "dj", weight: 1 },
  { name: "Dominica", code: "dm", weight: 1 },
  { name: "Dominican Republic", code: "do", weight: 2 },

  { name: "Ecuador", code: "ec", weight: 3 },
  { name: "El Salvador", code: "sv", weight: 1 },
  { name: "Estonia", code: "ee", weight: 1 },
  { name: "Eswatini", code: "sz", weight: 1 },
  { name: "Ethiopia", code: "et", weight: 3 },

  { name: "Fiji", code: "fj", weight: 1 },
  { name: "Finland", code: "fi", weight: 4 },

  { name: "Gabon", code: "ga", weight: 1 },
  { name: "Gambia", code: "gm", weight: 1 },
  { name: "Georgia", code: "ge", weight: 3 },
  { name: "Ghana", code: "gh", weight: 4 },
  { name: "Grenada", code: "gd", weight: 1 },
  { name: "Guatemala", code: "gt", weight: 2 },
  { name: "Guinea", code: "gn", weight: 1 },
  { name: "Guyana", code: "gy", weight: 1 },

  { name: "Haiti", code: "ht", weight: 1 },
  { name: "Honduras", code: "hn", weight: 1 },
  { name: "Hungary", code: "hu", weight: 3 },

  { name: "Iceland", code: "is", weight: 2 },
  { name: "Ireland", code: "ie", weight: 5 },

  { name: "Jamaica", code: "jm", weight: 4 },
  { name: "Jordan", code: "jo", weight: 4 },

  { name: "Kazakhstan", code: "kz", weight: 3 },
  { name: "Kenya", code: "ke", weight: 4 },
  { name: "Kyrgyzstan", code: "kg", weight: 1 },

  { name: "Laos", code: "la", weight: 1 },
  { name: "Latvia", code: "lv", weight: 1 },
  { name: "Lebanon", code: "lb", weight: 4 },
  { name: "Lesotho", code: "ls", weight: 1 },
  { name: "Liberia", code: "lr", weight: 1 },
  { name: "Libya", code: "ly", weight: 3 },
  { name: "Liechtenstein", code: "li", weight: 1 },
  { name: "Lithuania", code: "lt", weight: 1 },
  { name: "Luxembourg", code: "lu", weight: 2 },

  { name: "Madagascar", code: "mg", weight: 1 },
  { name: "Malawi", code: "mw", weight: 1 },
  { name: "Maldives", code: "mv", weight: 5 },
  { name: "Mali", code: "ml", weight: 1 },
  { name: "Malta", code: "mt", weight: 2 },
  { name: "Mauritania", code: "mr", weight: 1 },
  { name: "Mauritius", code: "mu", weight: 2 },
  { name: "Moldova", code: "md", weight: 1 },
  { name: "Monaco", code: "mc", weight: 2 },
  { name: "Mongolia", code: "mn", weight: 3 },
  { name: "Montenegro", code: "me", weight: 2 },
  { name: "Morocco", code: "ma", weight: 5 },
  { name: "Mozambique", code: "mz", weight: 1 },
  { name: "Myanmar", code: "mm", weight: 4 },

  { name: "Namibia", code: "na", weight: 1 },
  { name: "Nicaragua", code: "ni", weight: 1 },
  { name: "Niger", code: "ne", weight: 1 },
  { name: "North Korea", code: "kp", weight: 4 },
  { name: "North Macedonia", code: "mk", weight: 1 },

  { name: "Oman", code: "om", weight: 5 },

  { name: "Panama", code: "pa", weight: 2 },
  { name: "Papua New Guinea", code: "pg", weight: 1 },
  { name: "Paraguay", code: "py", weight: 1 },
  { name: "Peru", code: "pe", weight: 4 },
  { name: "Philippines", code: "ph", weight: 5 },
  { name: "Poland", code: "pl", weight: 4 },

  { name: "Romania", code: "ro", weight: 3 },
  { name: "Rwanda", code: "rw", weight: 1 },

  { name: "Senegal", code: "sn", weight: 2 },
  { name: "Serbia", code: "rs", weight: 3 },
  { name: "Slovakia", code: "sk", weight: 2 },
  { name: "Slovenia", code: "si", weight: 2 },
  { name: "Somalia", code: "so", weight: 2 },
  { name: "South Sudan", code: "ss", weight: 1 },
  { name: "Sudan", code: "sd", weight: 3 },
  { name: "Suriname", code: "sr", weight: 1 },
  { name: "Syria", code: "sy", weight: 4 },

  { name: "Taiwan", code: "tw", weight: 4 },
  { name: "Tajikistan", code: "tj", weight: 1 },
  { name: "Tanzania", code: "tz", weight: 2 },
  { name: "Togo", code: "tg", weight: 1 },
  { name: "Tonga", code: "to", weight: 1 },
  { name: "Trinidad and Tobago", code: "tt", weight: 1 },
  { name: "Tunisia", code: "tn", weight: 3 },
  { name: "Turkmenistan", code: "tm", weight: 1 },
  { name: "Tuvalu", code: "tv", weight: 1 },

  { name: "Uganda", code: "ug", weight: 2 },
  { name: "Uruguay", code: "uy", weight: 3 },
  { name: "Uzbekistan", code: "uz", weight: 2 },

  { name: "Vanuatu", code: "vu", weight: 1 },
  { name: "Vatican City", code: "va", weight: 2 },
  { name: "Venezuela", code: "ve", weight: 3 },
  { name: "Vietnam", code: "vn", weight: 5 },

  { name: "Yemen", code: "ye", weight: 3 },
  { name: "Zambia", code: "zm", weight: 1 },
  { name: "Zimbabwe", code: "zw", weight: 1 }
];

// ======================================================
// RECENT QUESTIONS
// ======================================================

const recentCountries = [];

// ======================================================
// WEIGHTED RANDOM COUNTRY
// ======================================================

function getRandomCountry() {
  let available = countries.filter(
    country => !recentCountries.includes(country.code)
  );

  if (!available.length) {
    recentCountries.length = 0;
    available = countries;
  }

  const totalWeight = available.reduce(
    (total, country) => total + country.weight,
    0
  );

  let random = Math.random() * totalWeight;

  for (const country of available) {
    random -= country.weight;

    if (random <= 0) {
      recentCountries.push(country.code);

      if (recentCountries.length > 5) {
        recentCountries.shift();
      }

      return country;
    }
  }

  return available[available.length - 1];
}

// ======================================================
// NORMALIZE ANSWER
// ======================================================

function normalize(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:]/g, "")
    .replace(/\s+/g, " ");
}

// ======================================================
// MAIN COMMAND
// ======================================================

module.exports.run = async function ({ api, event }) {
  let imagePath;

  try {
    const country = getRandomCountry();
    const flagURL = `https://flagcdn.com/w640/${country.code}.png`;
    const cacheDir = __dirname + "/cache";

    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }

    imagePath = cacheDir + `/country-${Date.now()}.png`;

    const image = await axios.get(flagURL, {
      responseType: "arraybuffer",
      timeout: 15000
    });

    fs.writeFileSync(imagePath, image.data);

    const questionText =
      "🌍 COUNTRY FLAG QUIZ\n\n" +
      "Which country's flag is this?\n\n" +
      "Reply with the country name to answer.";

    return api.sendMessage(
      {
        body: questionText,
        attachment: fs.createReadStream(imagePath)
      },
      event.threadID,
      (err, info) => {
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }

        if (err) return;

        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: null,
          country: country.name,
          countryCode: country.code
        });
      },
      event.messageID
    );

  } catch (err) {
    if (imagePath && fs.existsSync(imagePath)) {
      try {
        fs.unlinkSync(imagePath);
      } catch (e) {}
    }

    return api.sendMessage(
      "Country Quiz Error.\n\n" +
      (err.message || "Failed to create quiz."),
      event.threadID,
      event.messageID
    );
  }
};

// ======================================================
// HANDLE REPLY
// ======================================================

module.exports.handleReply = async function ({
  api,
  event,
  handleReply
}) {
  try {
    // ইতোমধ্যে উত্তর দেওয়া থাকলে সরাসরি ইগনোর করবে (নতুন উত্তর নিবে না)
    if (handleReply.answered) {
      return;
    }

    const userAnswer = event.body;

    if (!userAnswer || !userAnswer.trim()) {
      return;
    }

    // প্রশ্নটি লক করে দেওয়া হলো
    handleReply.answered = true;

    const correctAnswer = handleReply.country;
    const normalizedUserAnswer = normalize(userAnswer);
    const normalizedCorrectAnswer = normalize(correctAnswer);

    const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer;

    let result;

    if (isCorrect) {
      result =
        "✅ CORRECT!\n\n" +
        "Your Answer: " + userAnswer.trim() + "\n" +
        "Country: " + correctAnswer + "\n\n" +
        "Great job! 🎉";
    } else {
      result =
        "❌ WRONG!\n\n" +
        "Your Answer: " + userAnswer.trim() + "\n" +
        "Correct Answer: " + correctAnswer;
    }

    return api.sendMessage(
      result,
      event.threadID,
      event.messageID
    );

  } catch (err) {
    return api.sendMessage(
      "Country Quiz Error: " +
      (err.message || "Failed to check answer."),
      event.threadID,
      event.messageID
    );
  }
};
   
