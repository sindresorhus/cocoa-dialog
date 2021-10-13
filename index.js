import process from 'node:process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import dargs from 'dargs';
import execa from 'execa';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// `cocoaDialog` 3.0.0-beta7
const bin = path.join(__dirname, 'cocoaDialog.app/Contents/MacOS/cocoaDialog');

export default async function cocoaDialog(type, options) {
	if (process.platform !== 'darwin') {
		throw new Error('macOS only');
	}

	const args = dargs(options, {useEquals: false});

	const {stdout} = await execa(bin, [type, ...args], {
		// It exits with code 1 on success, ugh…
		reject: false,
	});

	return stdout.replace(/\r?\n$/, '');
}
