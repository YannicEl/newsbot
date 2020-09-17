import { Handler } from 'aws-lambda';
import { errorReturn, successReturn } from './helpers/helpers';

import Telegraf from 'telegraf';
import telegrafAws from 'telegraf-aws';

import AWS from 'aws-sdk';
const dynamodb = new AWS.DynamoDB();

// Create telegraf instance for handle updates
const bot = new Telegraf(process.env.TOKEN!, {
	telegram: {
		webhookReply: true,
	},
});

// Create webhook handler
const updateHandler = telegrafAws(bot, {
	timeout: 1000, // Optional parameter, after timeout, empty response will be sent to AWS and function execution will be stopped
});

// Optional - set webhook url on start
bot.telegram.setWebhook(process.env.BOT_WEBHOOK_URL!);

// Register bot commands
bot.command('help', (ctx) => ctx.reply('Try send a sticker!'));
bot.hears('hi', (ctx) => {
	ctx.reply('Hey there!');
});
bot.hears(/buy/i, (ctx) => ctx.reply('Buy-buy!'));
bot.on('sticker', (ctx) => ctx.reply('👍'));

// Now use hello as your lambda function and done!
export const newsbot = updateHandler;
