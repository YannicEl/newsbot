import { TelegrafContext } from 'telegraf/typings/context';
import { getFileUrl, getTimeOfFile } from '../helpers/helpers';

import { S3 } from 'aws-sdk';
const s3 = new S3();

const BUCKET = process.env.BUCKET!;

const params = {
	Bucket: BUCKET,
};

export async function getLatestNews(ctx: TelegrafContext) {
	try {
		const res = await s3.listObjectsV2(params).promise();
		const filename = res.Contents!.pop()!.Key!;
		ctx.replyWithAudio(getFileUrl(BUCKET, filename), {
			caption: `Ö3 Nachrichten vom ${getTimeOfFile(filename)}`,
		});
	} catch (err) {
		console.error(err);
		ctx.reply('ups');
	}
}
