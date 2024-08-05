const tgBot = require('./../../bot');

module.exports = async (req, res) => { 
  try {
    tgBot.on("message", (msg) => {
      const chatId = msg.chat.id;
      const messageText = msg.text;

      if (messageText === "/start") {
        tgBot.sendMessage(chatId, "Welcome to the bot!");
      }
    });
    
  } catch (error) {
    console.log(error, '--err');

    res.status(503).json({
      status: 'error'
    });
  }
};
