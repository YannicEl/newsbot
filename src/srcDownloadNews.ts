import { Handler } from 'aws-lambda';
import fetch from 'node-fetch';
import { successReturn, errorReturn } from './helpers/helpers';

import { S3 } from 'aws-sdk';
import moment from 'moment';
const s3 = new S3();

const BUCKET = process.env.BUCKET!;

export const handler: Handler = async (event, context) => {
	console.log(event);

	const res = await fetch(
		'https://oe3meta.orf.at/oe3mdata/StaticAudio/Nachrichten.mp3'
	);

	const buffer = await res.buffer();

	const params = {
		Body: buffer,
		Bucket: BUCKET,
		Key: getFileName(),
	};

	try {
		await s3.putObject(params).promise();
		return successReturn;
	} catch (e) {
		console.log('error uploading');
		console.error(e);
		return errorReturn(500, 'Internal Server Error');
	}
};

function getFileName() {
	return `OE3_${moment()
		.locale('de')
		.utcOffset(2)
		.format('YYYY.DD.MM_HH[h]')}.mp3`;
}
