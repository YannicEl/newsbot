import fetch from 'node-fetch';
import cheerio from 'cheerio';

export function errorReturn(code: number, msg: string) {
	return {
		statusCode: code,
		body: JSON.stringify({
			error: msg
		})
	};
}

export function successReturn(event: any) {
	return {
		statusCode: 200,
		body: JSON.stringify({
			input: event
		})
	};
}
