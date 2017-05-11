var blessed = require('blessed')

var bus = require('./bus');

function setupScreen(ui) {
	var screen = blessed.screen({
		smartCSR: true,
		autoPadding: true,
	})

	screen.title = `mt`
	// find focus
	screen.key(['escape'], function(ch, key) {
		ui.focusInput()
	})
	// Exit
	screen.key(['q', 'C-c'], function(ch, key) {
		return process.exit(0)
	})
	return screen
}

function setupStack(ui) {
	var stack = blessed.list({
		bottom: '0',
		padding: {
			top: 0,
			bottom: 2,
		},
		left: 'center',
		width: '100%',
		height: 'shrink',
		valign: 'bottom',
		interactive: false,
		items: [],
		tags: true,
		style: {
			fg: '#bbb',
			selected: {
				bg: '#333'
			},
		},
		inputOnFocus: true,
	})

	stack.key(['up'], (ch, key) => {
		stack.up(1)
		ui.render()
	})
	stack.key(['down'], (ch, key) => {
		stack.down(1)
		ui.render()
	})
	stack.key(['1','2','3','4','5','6','7','8','9'], (ch, key) => {
		stack.select(parseInt(ch, 10) - 1)
		ui.render()
	})
	stack.key(['0'], (ch, key) => {
		ui.focusInput()
	})

	return stack
}
function setupInput(ui) {
	// input
	var input = blessed.textbox({
		bottom: '0',
		left: 'center',
		width: '100%',
		height: 'shrink',
		padding: {
		},
		tags: true,
		style: {
			fg: 'white',
			bg: '#111'
		},
		inputOnFocus: true,
	})

	input.on(['submit'], (ch, key) => {
		ui.handleInput(input.getValue())
		input.clearValue()
		ui.render()
		input.focus()
	})
	// drop focus 
	input.key(['escape'], (ch, key) => {
		ui.focusStack()
	})
	// remove until start of line
	input.key(['C+w'], (ch, key) => {
		// HERE: TODO: Implement simple text editing
	})
	// go to start of line
	input.key(['C+a'], (ch, key) => {
	})
	// go to end of line
	input.key(['C+e'], (ch, key) => {
	})
	input.key(['C-c'], (ch, key) => {
		return process.exit(0)
	})
	return input
}



class UI {
	constructor() {
		this.setup(this)
		this.render()
	}

	setup(ui) {
		ui.screen = setupScreen(ui)
		ui.stack = setupStack(ui)
		ui.input = setupInput(ui)
		ui.screen.append(ui.stack)
		ui.screen.append(ui.input)
		ui.input.focus()
	}

	displayError(err) {
		console.error(err)
		// TODO: Show error overlay
		throw err
	}

	render() {
		this.screen.render()
	}
	handleInput(line) {
		// Quit if submitted command is q
		switch(line) {
			case 'q':
			case 'quit':
			case 'exit':
				return process.exit(0)
			default:
				this.addLineToStack(line)
		}
		this.render()
	}

	addLineToStack(line) {
		bus.emit('add-line-to-stack', line);
	}
	focusInput() {
		this.input.focus()
		this.stack.interactive = false
		this.render()
	}
	focusStack() {
		this.stack.focus()
		this.stack.interactive = true
		this.render()
	}
	stackItems(items) {
		this.stack.clearItems();
		this.stack.setItems(items);
	}
}

module.exports = {
	UI
}