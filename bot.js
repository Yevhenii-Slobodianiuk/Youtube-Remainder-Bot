require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');

const token = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;

const bot = new TelegramBot(token, { polling: true });

function sendReminder() {
	try {
		bot.sendMessage(chatId, 'Оплатіть Youtube: 5457082516784050 \n Підтримайте автора: 4441111130989399')
			.then(() => {
				console.log(`Reminder sent successfully at ${new Date().toLocaleString()}`);
			})
			.catch((error) => {
				console.error('Error sending message:', error);
			});
	} catch (error) {
		console.error('Error in sendReminder:', error);
	}
}

cron.schedule('0 10 26 * *', () => {
	sendReminder();
});

bot.on('error', (error) => {
	console.error('Bot error:', error);
});

console.log('Bot has been started...');

// Додаємо найпростіший веб-сервер для Render
const http = require('http');
const server = http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('Bot is running!\n');
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

// Додаємо обробку команди /start
bot.onText(/\/start/, (msg) => {
	bot.sendMessage(msg.chat.id, 'Бот запущений та буде відправляти нагадування 26 числа кожного місяця о 10:00');
});