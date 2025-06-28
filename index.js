import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

console.log("✅ Beagly Bot with inline buttons is running...");

// 🔥 Start Message
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `🔥 Welcome to the Beagly Movement! 🔥\n\nThis isn’t just a meme coin... it’s a story-telling, community-driven, chaos-bringing revolution.\n\n👇 Click below to explore!`,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Why Beagly?", callback_data: "whybeagly" }],
          [{ text: "Social Links 🌐", callback_data: "socials" }],
          [{ text: "Beagly Motivation", callback_data: "beagly" }],
          [{ text: "Raid Mode 🚨", callback_data: "raid" }],
          [{ text: "Meme to the Moon 🌕", callback_data: "moon" }],
        ],
      },
    }
  );
});

// 📋 Inline Button Callback Handler
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  let response = "";

  switch (data) {
    case "whybeagly":
      response = `Why Beagly?\n\n✅ A meme coin with voice and vision\n✅ Fair launch, no shady moves\n✅ Built by the community, for the community\n✅ Storytelling meets Web3\n\nBeagly isn’t begging for attention — he’s taking the spotlight. 🐶🎤`;
      break;
    case "socials":
      response = `🔗 Beagly's World:\n🐦 X Platform: https://x.com/Beagly_Beagly\n📺 YouTube: https://www.youtube.com/@Beagly_Stories\n💬 Telegram: https://t.me/+LcorB830Wgc1Mzg0`;
      break;
    case "beagly":
      response = `🔥 Beagly is not just a token — he’s a character, a storyteller, a meme with meaning.\n\n👑 No dev dump. No silence. Beagly speaks.\n🚀 The community listens. The mission grows.\n💥 Let’s bark our way to the moon.`;
      break;
    case "raid":
      response = `🚨 RAID MODE ACTIVATED 🚨\n\n🐶 It’s time to flood the X platform.\n📢 Copy-paste this and post it NOW:\n\n"Beagly isn’t just a memecoin — he’s the host of stories, the voice of the people.\n\n📺 YouTube: youtube.com/@Beagly_Stories\n🐦 X: x.com/Beagly_Beagly\n🐾 Join us: t.me/BiglyCoin\n#Beagly #Memecoin #Solana"`;
      break;
    case "moon":
      response = `🌕 Beagly has left Earth.\n\nThe meme. The mission. The moon.\nThis isn’t hype — it’s destiny.\n\n🚀 #BeaglyToTheMoon #MemeSeason`;
      break;
    default:
      response = "❓ Unknown command.";
  }

  bot.sendMessage(chatId, response);
  bot.answerCallbackQuery(query.id); // remove loading spinner
});

// 👋 Auto-Welcome New Members
bot.on("new_chat_members", (msg) => {
  msg.new_chat_members.forEach((user) => {
    const name = user.first_name || "friend";

    const welcomeMessage = `Woof! Woof! 🐶
👋 Welcome ❤️${name}❤️ to the Beagly Army.

Remember: Beagly is not static. It’s not hype.
It’s just a matter of time before Beagly flies high 🚀🐶

The ambition behind Beagly is deeper than memes.
Lucky you — you joined early.

👁️ Keep your eyes on Beagly.
🔒 Note: You can only chat with the bot privately.

🚫 The group chat is currently closed for a while.
🛡️ This is a temporary measure to protect the community.
🌱 It will reopen as the Beagly community continues to grow.
Stay tuned and keep barking! 🐾`;

    bot.sendMessage(msg.chat.id, welcomeMessage);
  });
});

// 🧹 Clear Command (Restricted to Owner)
bot.onText(/\/clear/, async (msg) => {
  const chatId = msg.chat.id;

  if (msg.from.id !== 7483558293) {
    return bot.sendMessage(chatId, "❌ Only the group owner can run this.");
  }

  let messageId = msg.message_id;

  for (let i = 0; i < 100; i++) {
    // you can change 100 to 200, 500, etc.
    try {
      await bot.deleteMessage(chatId, messageId - i);
    } catch (err) {
      // Silently skip messages that can't be deleted
    }
  }

  bot.sendMessage(chatId, "✅ Last 100 messages cleared.");
});

console.log("✅ Beagly Bot with inline buttons is running...");
