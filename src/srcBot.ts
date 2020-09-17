import Telegraf from 'telegraf';
import telegrafAws from 'telegraf-aws';
import { TelegrafContext } from 'telegraf/typings/context';
import { getLatestNews } from './commands/News';
import { getNewsInline } from './commands/NewsInline';

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

// Register bot commands
bot.command('news', (ctx) => getLatestNews(ctx));
(bot as any).inlineQuery(/.*/g, (ctx: TelegrafContext) => getNewsInline(ctx));

// Telegraf Handler
export const handler = updateHandler;
