import test from 'ava';
import cocoaDialog from '.';

test('main', async t => {
	if (process.env.CI) {
		t.pass();
		return;
	}

	t.is(await cocoaDialog('ok-msgbox', {text: 'Click OK'}), '1');
});
