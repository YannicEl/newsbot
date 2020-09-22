import { TelegrafContext } from 'telegraf/typings/context';
export async function getLatestNews(ctx: TelegrafContext) {
	try {
		ctx.replyWithAudio(
			'https://oe3meta.orf.at/oe3mdata/StaticAudio/Nachrichten.mp3',
			{
				caption: 'Die neusten Ö3 Nachrichten',
			}
		);
	} catch (err) {
		console.error(err);
		ctx.reply('ups');
	}
}
