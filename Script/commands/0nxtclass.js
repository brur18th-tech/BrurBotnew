const moment = require("moment-timezone");

module.exports.config = {
  name: "nextclass",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "TAWHID ISLAM SIAM",
  description: "Shows full day routine & countdown based on BRUR schedule",
  commandCategory: "utility",
  usages: "nextclass",
  cooldowns: 3,
  usePrefix: true
};

// রুটিনের ডাটা (Begum Rokeya University Routine)
const routineData = {
  0: [ // Sunday
    { subject: "ENG 1104", teacher: "Farhana Mahzabin", room: "Room-103", start: "09:00", end: "10:00" },
    { subject: "ENG 1103", teacher: "Moutushi Roy", room: "Room-101", start: "11:20", end: "12:20" },
    { subject: "ENG 1105", teacher: "Not Specified", room: "Room-102", start: "12:30", end: "13:30" }
  ],
  1: [], // Monday (No classes)
  2: [ // Tuesday
    { subject: "ENG 1103", teacher: "Moutushi Roy", room: "Room-101", start: "11:20", end: "12:20" },
    { subject: "ENG 1102", teacher: "Emrana Bari", room: "Room-103", start: "14:00", end: "15:00" }
  ],
  3: [ // Wednesday
    { subject: "ENG 1105", teacher: "Not Specified", room: "Room-103", start: "09:00", end: "10:00" },
    { subject: "ENG 1101", teacher: "Farhana Mahzabin", room: "Room-103", start: "10:10", end: "11:10" },
    { subject: "ENG 1101", teacher: "Dr. Mohsina Ahsan", room: "Room-101", start: "12:30", end: "13:30" }
  ],
  4: [ // Thursday
    { subject: "ENG 1102", teacher: "Emrana Bari", room: "Room-103", start: "09:00", end: "10:00" },
    { subject: "ENG 1101", teacher: "Dr. Mohsina Ahsan", room: "Room-103", start: "12:30", end: "13:30" }
  ],
  5: [], // Friday (Off Day)
  6: []  // Saturday (Off Day)
};

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

module.exports.run = async function ({ api, event }) {
  try {
    const now = moment().tz("Asia/Dhaka");
    let currentDay = now.day();

    let targetDay = currentDay;
    let targetClasses = [];
    let daysToAdd = 0;

    // ১. আজকের দিনে এমন কোনো ক্লাস আছে কি না যা এখনো শেষ হয়নি
    const todayClasses = routineData[currentDay] || [];
    const hasRemainingToday = todayClasses.some(cls => {
      const [h, m] = cls.end.split(":");
      const classEndMoment = now.clone().set({ hour: parseInt(h), minute: parseInt(m), second: 0 });
      return classEndMoment.isAfter(now);
    });

    if (hasRemainingToday) {
      targetClasses = todayClasses;
      daysToAdd = 0;
    } else {
      // ২. আজকের সব ক্লাস শেষ হলে বা বন্ধ থাকলে পরবর্তী ক্লাসের দিন খোঁজা
      for (let i = 1; i <= 7; i++) {
        const checkDay = (currentDay + i) % 7;
        if (routineData[checkDay] && routineData[checkDay].length > 0) {
          targetDay = checkDay;
          targetClasses = routineData[checkDay];
          daysToAdd = i;
          break;
        }
      }
    }

    if (targetClasses.length === 0) {
      return api.sendMessage("❌ কোনো ক্লাসের তথ্য পাওয়া যায়নি।", event.threadID, event.messageID);
    }

    // ৩. সময় অনুযায়ী সিরিয়াল (Sort) করা
    targetClasses.sort((a, b) => a.start.localeCompare(b.start));

    const dayTitle = daysToAdd === 0 ? "TODAY'S SCHEDULE" : `UPCOMING`;
    let responseMsg = `📌 𝗖𝗟𝗔𝗦𝗦 𝗥𝗢𝗨𝗧𝗜𝗡𝗘: ${dayTitle}\n📅 Day: ${dayNames[targetDay]}\n─────────────────\n`;

    // ৪. ক্লাসের লিস্ট ও কাউন্টডাউন তৈরি
    targetClasses.forEach((cls, index) => {
      const [startH, startM] = cls.start.split(":");
      const [endH, endM] = cls.end.split(":");

      const classStartMoment = now.clone().add(daysToAdd, "days").set({ hour: parseInt(startH), minute: parseInt(startM), second: 0 });
      const classEndMoment = now.clone().add(daysToAdd, "days").set({ hour: parseInt(endH), minute: parseInt(endM), second: 0 });

      const startTime12hr = moment(cls.start, "HH:mm").format("hh:mm A");
      const endTime12hr = moment(cls.end, "HH:mm").format("hh:mm A");

      let statusText = "";

      if (now.isAfter(classEndMoment)) {
        statusText = "✅ Class Completed";
      } else if (now.isAfter(classStartMoment) && now.isBefore(classEndMoment)) {
        statusText = "🔴 Ongoing Class";
      } else {
        const diffMs = classStartMoment.diff(now);
        const duration = moment.duration(diffMs);
        const hours = Math.floor(duration.asHours());
        const minutes = duration.minutes();
        const seconds = duration.seconds();

        statusText = `⏳ ${hours}h ${minutes}m ${seconds}s`;
      }

      responseMsg += 
`🔹 [Class ${index + 1}]
📚 Course: ${cls.subject}
👨‍🏫 Teacher: ${cls.teacher}
🏛 Room: ${cls.room}
⏰ Time: ${startTime12hr} - ${endTime12hr}
📌 Status: ${statusText}
─────────────────\n`;
    });

    responseMsg += `⚠️ 𝗡𝗼𝘁𝗲: ক্লাস রুটিন বা রুম সাময়িকভাবে পরিবর্তনশীল, তাই দয়া করে অফিশিয়াল নোটিশ সবসময় চেক রাখবেন।\n(ঠিকসময়ে তথ্য না পেলে CR-এর গলা চেপে ধরুন।)`;

    return api.sendMessage(responseMsg, event.threadID, event.messageID);

  } catch (err) {
    return api.sendMessage("❌ Error: " + err.message, event.threadID, event.messageID);
  }
};
