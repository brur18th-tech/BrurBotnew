module.exports.config = {
    name: "slot",
    version: "3.0.0",
    hasPermssion: 0,
    credits: "TAWHID ISLAM SIAM",
    description: "Slot Machine Game with Dynamic Win/Loss Rate & Clean UI",
    commandCategory: "game",
    usages: "[bet amount]",
    cooldowns: 2,
    usePrefix: true
};

module.exports.run = async function({ api, event, args, Currencies }) {
    const { threadID, messageID, senderID } = event;
    const { getData, increaseMoney, decreaseMoney } = Currencies;

    const slotItems = ["🍏", "🍎", "🍊", "🍇", "🍓", "🍒", "🥑", "💎", "7⃣"];
    const userData = await getData(senderID);
    const moneyUser = userData ? userData.money : 0;

    let moneyBet = parseInt(args[0]);
    if (isNaN(moneyBet) || moneyBet <= 0) 
        return api.sendMessage("🎰 বেট ধরার পরিমাণ লিখুন! (যেমন: /slot 100)", threadID, messageID);
    if (moneyBet < 50) 
        return api.sendMessage("⚠️ সর্বনিম্ন বেট $50!", threadID, messageID);
    if (moneyBet > moneyUser) 
        return api.sendMessage("❌ আপনার অ্যাকাউন্টে পর্যাপ্ত ব্যালেন্স নেই!", threadID, messageID);

    // ডাইনামিক উইন রেট নির্ধারণ (হারার সম্ভাবনা বেশি রাখা হয়েছে)
    // 0 = 80% Loss (4/5), 1 = 60% Loss (3/5), 2 = 40% Loss (2/5)
    const winRates = [0.20, 0.40, 0.40, 0.30, 0.15]; 
    const currentWinRate = winRates[Math.floor(Math.random() * winRates.length)];
    const isWinOutcome = Math.random() < currentWinRate;

    let numbers = [];

    if (isWinOutcome) {
        // জিতার ক্ষেত্রে (তিনটি মেলা অথবা দুটি মেলা)
        const isTripleWin = Math.random() < 0.20; // ২০% চান্স ৩টাই মেলার
        if (isTripleWin) {
            const picked = Math.floor(Math.random() * slotItems.length);
            numbers = [picked, picked, picked];
        } else {
            const picked1 = Math.floor(Math.random() * slotItems.length);
            let picked2 = Math.floor(Math.random() * slotItems.length);
            numbers = [picked1, picked1, picked2];
            numbers.sort(() => Math.random() - 0.5);
        }
    } else {
        // হারার ক্ষেত্রে তিনটি ভিন্ন আইকন
        while (numbers.length < 3) {
            const rand = Math.floor(Math.random() * slotItems.length);
            if (!numbers.includes(rand)) numbers.push(rand);
        }
    }

    const item1 = slotItems[numbers[0]];
    const item2 = slotItems[numbers[1]];
    const item3 = slotItems[numbers[2]];

    let resultMsg = "";
    let finalBalance = moneyUser;

    // ১. তিনটাই মেলা (Triple Win / Jackpot)
    if (numbers[0] === numbers[1] && numbers[1] === numbers[2]) {
        let winMoney = moneyBet * (item1 === "7⃣" || item1 === "💎" ? 5 : 3);
        await increaseMoney(senderID, winMoney);
        finalBalance = moneyUser + winMoney;
        resultMsg = `🎰 [ ${item1} | ${item2} | ${item3} ]\n🎉 YOU WON! +$${winMoney} 💰\n\nTOTAL Balance: $${finalBalance}`;
    } 
    // ২. দুটি মেলা (Double Win)
    else if (numbers[0] === numbers[1] || numbers[0] === numbers[2] || numbers[1] === numbers[2]) {
        let winMoney = moneyBet * 2;
        await increaseMoney(senderID, winMoney);
        finalBalance = moneyUser + winMoney;
        resultMsg = `🎰 [ ${item1} | ${item2} | ${item3} ]\n🎉 YOU WON! +$${winMoney} 💰\n\nTOTAL Balance: $${finalBalance}`;
    } 
    // ৩. হারার ক্ষেত্রে (Loss)
    else {
        await decreaseMoney(senderID, moneyBet);
        finalBalance = moneyUser - moneyBet;
        resultMsg = `🎰 [ ${item1} | ${item2} | ${item3} ]\n⚠️ YOU LOST! -$${moneyBet} 💸\n\nTOTAL Balance: $${finalBalance}`;
    }

    return api.sendMessage(resultMsg, threadID, messageID);
};
