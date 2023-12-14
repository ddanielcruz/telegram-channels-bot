import 'dotenv/config'
import env from 'env-var'
import TelegramBot from 'node-telegram-bot-api'

// Load and parse environment variables
const TELEGRAM_TOKEN = env.get('TELEGRAM_TOKEN').required().asString()
const CHAT_ID = env.get('CHAT_ID').required().asString()
const CHAT_TOPIC_IDS = env.get('CHAT_TOPIC_IDS').required().asArray().map(Number)

// Create bot
const bot = new TelegramBot(TELEGRAM_TOKEN)

// Send test messages
const message = composeMessage()
await Promise.all(
  CHAT_TOPIC_IDS.map(chatTopicId =>
    bot.sendMessage(CHAT_ID, message, {
      parse_mode: 'MarkdownV2',
      disable_web_page_preview: true,
      message_thread_id: chatTopicId
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
