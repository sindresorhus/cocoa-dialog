'use strict';
const path = require('path');
const dargs = require('dargs');
const execa = require('execa');

// `cocoaDialog` 3.0.0-beta7
const bin = path.join(__dirname, 'cocoaDialog.app/Contents/MacOS/cocoaDialog');

module.exports = async (type, options) => {
	if (process.platform !== 'darwin') {
		throw new Error('macOS only');
	}

	const args = dargs(options, {useEquals: false});

	const {stdout} = await execa(bin, [type].concat(args), {
		// It exits with code 1 on success, ugh…
		reject: false
	});

	return stdout.replace(/\r?\n$/, '');
};
