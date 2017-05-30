import test from 'ava';
import empty from './fixtures/empty';
import unicorn from './fixtures/unicorn';
import m from '..';

test('no services', t => {
	t.throws(() => m(empty), 'No services found');
});

test('invalid file type', t => {
	const service = m(unicorn);

	t.throws(() => service('test.js'), 'Invalid file type, should be one of gif, mp4, webm, apng');
});

test('context object', t => {
	const service = m(unicorn);

	const {context} = service('test.gif', {
		config: {
			foo: 'bar',
			unicorn: '🌈'
		}
	});

	t.is(context.format, 'gif');
	t.is(context.config.get('unicorn'), '🌈');
	t.false(context.config.has('foo'));
});

test('execute plugin', async t => {
	const service = m(unicorn);

	const plugin = service('test.gif', {
		config: {
			unicorn: '🌈'
		}
	});

	t.is(await plugin.exec(), '🌈');
});