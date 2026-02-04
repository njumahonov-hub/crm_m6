import { Router } from "express";
import { get_bot_message_lastTenDay, get_bot_message_today } from "../controller/bot.ctr.js";
const botRouter = Router();
botRouter.get("/get_bot_message_today", get_bot_message_today);
botRouter.get("/get_bot_message_lastTenDay", get_bot_message_lastTenDay);
export default botRouter;
//# sourceMappingURL=bot.routes.js.map