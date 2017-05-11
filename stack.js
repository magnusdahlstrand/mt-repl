var bus = require('./bus');
var {cont} = require('./flow');

class StackItem {
	constructor(line) {
		// console.log('add item')
		this.line = line;
		StackItem.auto
		.filter(auto => auto.test(line))
		.forEach(auto => Object.assign(this, auto.StackItemProto))
		this.run();
	}
	run() {
		if(this._run) {
			cont(this._run());
		}
	}
	toString() {
		return this.line || `[stack-item]`;
	}
}
StackItem.auto = [
	require('./magnet'),
	require('./youtube'),
]


class Stack {
	constructor() {
		this.items = []
	}
	add(line) {
		if(line) {
			this.items.push(new StackItem(line))
		}
		bus.emit('stack-updated');
	}
}

module.exports = {
	StackItem,
	Stack,
};