import { TelegrafContext } from 'telegraf/typings/context';
import { S3 } from 'aws-sdk';
import { InlineQueryResult } from 'telegraf/typings/telegram-types';
import { getFileUrl, getTimeOfFile } from '../helpers/helpers';
const s3 = new S3();

const BUCKET = process.env.BUCKET!;

export async function getNewsInline(ctx: TelegrafContext) {
	const params = {
		Bucket: BUCKET,
		MaxKeys: 50,
	};

	const res = await s3.listObjectsV2(params).promise();

	const queryResults: InlineQueryResult[] = [];

	res.Contents?.forEach((e) => {
		queryResults.push({
			type: 'audio',
			id: e.Key!,
			audio_url: getFileUrl(BUCKET, e.Key!),
			title: `Ö3 Nachrichten vom ${getTimeOfFile(e.Key!)}`,
		});
	});

	ctx.answerInlineQuery(queryResults);
}
