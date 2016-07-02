import test from 'ava';
import m from './';

test(async t => {
	if (process.env.CI) {
		t.pass();
		return;
	}

	t.is(await m('ok-msgbox', {text: 'Click OK'}), '1');
});
