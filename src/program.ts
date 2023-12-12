import 'dotenv/config'
import env from 'env-var'
import TelegramBot from 'node-telegram-bot-api'

// Load and parse environment variables
const TELEGRAM_TOKEN = env.get('TELEGRAM_TOKEN').required().asString()
const CHANNEL_USERNAMES = env
  .get('CHANNEL_USERNAMES')
  .required()
  .asArray()
  .map(username => `@${username}`)
  .slice(0, 1)

// Create bot
const bot = new TelegramBot(TELEGRAM_TOKEN)

// Send test messages
const message = composeMessage()
await Promise.all(
  CHANNEL_USERNAMES.map(channel =>
    bot.sendMessage(channel, message, {
      parse_mode: 'MarkdownV2'
    })
  )
)

function composeMessage() {
  return `
*bold text*
_italic text_
__underline__
~strikethrough~
||spoiler||
[inline URL](http://www.example.com/)
[inline mention of a user](tg://user?id=123456789)
![👍](tg://emoji?id=5368324170671202286)
\`inline fixed-width code\`
\`\`\`
pre-formatted fixed-width code block
\`\`\`
\`\`\`python
pre-formatted fixed-width code block written in the Python programming language
\`\`\`
`
}
