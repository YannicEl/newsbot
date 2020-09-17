export function errorReturn(code: number, msg: string) {
	return {
		statusCode: code,
		body: JSON.stringify({
			error: msg,
		}),
	};
}

export const successReturn = {
	statusCode: 200,
	body: JSON.stringify({
		success: true,
	}),
};

export const getFileUrl = (bucket: string, filename: string): string =>
	`https://${bucket}.s3.eu-central-1.amazonaws.com/${filename}`;

export const getTimeOfFile = (filename: string) => {
	const pieces = filename.split('_');
	const date = pieces[2].split('.');
	date.pop();
	const time = pieces[1];
	console.log(`${date.join('.')} um ${time}`);
	return `${date.join('.')} um ${time}`;
};
