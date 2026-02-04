import { Bot } from "../model/bot.model.js";
import TelegramBot from "node-telegram-bot-api";
import { BotUser } from "../model/botUser.js";
import { Op } from "sequelize";
Bot.sync({ force: false });
BotUser.sync({ force: false });
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
bot.onText(/\/start/, async (msg) => {
    const chat_id = msg.chat.id;
    const full_name = msg.from?.first_name;
    const foundeduser = await BotUser.findOne({ where: { chat_id: chat_id } });
    if (msg.text === "/start") {
        if (!foundeduser?.dataValues) {
            await BotUser.create({ full_name, chat_id: chat_id });
            bot.sendMessage(chat_id, "iltomos telefon raqamni ulashing", {
                reply_markup: {
                    keyboard: [
                        [{ text: "telfon raqam ulashish", request_contact: true }],
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: true,
                },
            });
        }
        else {
            if (foundeduser.dataValues && !foundeduser.dataValues.phone_number) {
                bot.sendMessage(chat_id, "iltimos telefon raqam ulashing", {
                    reply_markup: {
                        keyboard: [
                            [{ text: "telefon raqam ulashish", request_contact: true }],
                        ],
                        resize_keyboard: true,
                        one_time_keyboard: true,
                    },
                });
            }
            bot.sendMessage(chat_id, "botdan foydalanishingiz mumkin");
        }
    }
});
bot.on("message", async (msg) => {
    const chat_id = msg.chat.id;
    const foundedUser = await BotUser.findOne({ where: { chat_id: chat_id } });
    if (msg.contact) {
        if (foundedUser) {
            await BotUser.update({ phone_number: msg.contact?.phone_number }, { where: { chat_id: foundedUser.dataValues.chat_id } });
        }
    }
    if (msg.text && msg.text !== "/start") {
        await Bot.create({ full_name: foundedUser?.dataValues.full_name, phone_number: foundedUser?.dataValues.phone_number,
            chat_id: foundedUser?.dataValues.chat_id, message: msg.text
        });
        bot.sendMessage(chat_id, "murojatingiz yetkazildi");
    }
});
export const get_bot_message_today = async (req, res, next) => {
    try {
        const currentdate = new Date();
        currentdate.setUTCHours(0, 0, 0, 0);
        const message = await Bot.findAll({ where: { createdA: { [Op.gte]: currentdate } } });
        res.status(200).json(message);
    }
    catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};
export const get_bot_message_lastTenDay = async (req, res, next) => {
    try {
        const currentdate = new Date();
        currentdate.setDate(currentdate.getDate() - 10);
        const message = await Bot.findAll({ where: { createdA: { [Op.gte]: currentdate } } });
        res.status(200).json(message);
    }
    catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};
//# sourceMappingURL=bot.ctr.js.map