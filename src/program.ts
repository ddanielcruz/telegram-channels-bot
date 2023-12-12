import 'dotenv/config'
import env from 'env-var'
import TelegramBot from 'node-telegram-bot-api'
import { Telegraf } from 'telegraf'

// Load and parse environment variables
const TELEGRAM_TOKEN = env.get('TELEGRAM_TOKEN').required().asString()
const CHANNEL_USERNAMES = env
  .get('CHANNEL_USERNAMES')
  .required()
  .asArray()
  .map(username => `@${username}`)

// Create bot
const bot = new TelegramBot(TELEGRAM_TOKEN)

// Send test messages
const message = composeMessage()
await Promise.all(CHANNEL_USERNAMES.map(channel => bot.sendMessage(channel, message)))

// TODO Test message formatting
function composeMessage() {
  return 'Hello world!'
}
