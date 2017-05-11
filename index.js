var {UI} = require('./ui');
var {Stack} = require('./stack');

var bus = require('./bus');

var stack = new Stack();
var ui = new UI();

bus.on('add-line-to-stack', (line) => {
	stack.add(line);
})
bus.on('stack-updated', () => {
	ui.stackItems(stack.items.map((item, i) => `${i + 1}: ${item}`));
	ui.render();
})
bus.on('error', err => ui.displayError(err));
bus.on('save-file', file => {
	// console.log('save-file', file, this);
})

function async(fn) {
	setImmediate(fn);
}



