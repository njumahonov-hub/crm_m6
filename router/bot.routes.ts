

import {Router, type RequestHandler} from "express"
import { get_bot_message_lastTenDay, get_bot_message_today } from "../controller/bot.ctr.js"


const botRouter: Router = Router()


botRouter.get("/get_bot_message_today", get_bot_message_today as RequestHandler)
botRouter.get("/get_bot_message_lastTenDay", get_bot_message_lastTenDay as RequestHandler)

export default botRouter