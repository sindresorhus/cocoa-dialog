'use strict';
const path = require('path');
const dargs = require('dargs');
const execa = require('execa');

// cocoaDialog 3.0.0-beta7
const bin = path.join(__dirname, 'cocoaDialog.app/Contents/MacOS/cocoaDialog');

module.exports = (type, opts) => {
	if (process.platform !== 'darwin') {
		return Promise.reject(new Error('macOS only'));
	}

	const args = dargs(opts, {useEquals: false});

	return execa(bin, [type].concat(args))
		// TODO: use execa `reject: false` option
		// it exits with code 1 on success, ugh
		.catch(err => err.stdout.replace(/\r?\n$/, ''));
};
