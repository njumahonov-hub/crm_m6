import { Bot } from "../model/bot.model.js";
import TelegramBot from "node-telegram-bot-api";
import { BotUser } from "../model/botUser.js";
Bot.sync({ force: false });
BotUser.sync({ force: false });
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
bot.onText(/\/start/, async (msg) => {
    const chat_id = msg.chat.id;
    const full_name = msg.from?.first_name;
    const foundeduser = await BotUser.findOne({ where: { chat_id: chat_id } });
    if (msg.text === "/start") {
        if (!foundeduser) {
            await BotUser.create({ full_name, chat_id: chat_id });
            bot.sendMessage(chat_id, "iltomos telefon raqamni ulashing", {
                reply_markup: {
                    keyboard: [
                        [{ text: "telfon raqam ulashish", request_contact: true }]
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: true
                }
            });
        }
        else {
            if (foundeduser.dataValues && !foundeduser.dataValues.phone_number) {
                bot.sendMessage(chat_id, "iltimos telefon raqam ulashing", {
                    reply_markup: {
                        keyboard: [
                            [{ text: "telefon raqam ulashish", request_contact: true }]
                        ],
                        resize_keyboard: true,
                        one_time_keyboard: true
                    }
                });
            }
            bot.sendMessage(chat_id, "botdan foydalanishingiz mumkin");
        }
    }
});
export const get_bot_message_today = async (req, res, next) => {
    try {
        const student = await Bot.findAll();
        res.status(200).json(student);
    }
    catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};
//# sourceMappingURL=bot.ctr.js.map