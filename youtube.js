var {wait} = require('./flow')
var bus = require('./bus')
var ytdl = require('ytdl-core')

var downloadOptions = {
	quality: 'lowest',
}

function renderer(item) {
	return function*() {

	}
}

module.exports = {
	test: line => line.startsWith('https://www.youtube.com/'),
	// HERE: TODO: Simplifying (?)
	/*act: ([line, bus]) => {
		bus.trigger('stack-item', (stackItem) => {
			// Setting a property on the stackItem triggers a re-render
			stackItem.text = line
			// The file is a buffer
			var file = ytdl(line, downloadOptions)
			// Triggering events directly on the stackItem passes the
			// item along as context, so any associated interfaces
			// (loading indicator, filename input) can be rendered alongside
			stackItem.trigger('save-file', file)
			file.on('info', info => stackItem.info = info)
		})
	},*/
	// TODO: Instead of exposing a prototype, a function can be
	// provided which would act on the input and could emit a
	// `stack-item` event, with which a "replyTo" function can
	// be passed. This reply function can be called by any other
	// bit of code responding to the event - say the UI could
	// say it supports a string interface, to which the reply
	// function could send a generator yielding strings to draw
	StackItemProto: {
		_run: function *() {
			var file = ytdl(this.line, downloadOptions)
			// TODO: The download creates a new file, which
			// (attached to the stack-item) raises a question
			// for a name to store it under
			file.on('info', (info, format) => {
				// console.log(info, format)
				this.info = info
				bus.emit('stack-updated')
			})
			bus.emit('save-file', file);
			// TODO: The 
			/*this.loading = true
			yield wait(700)
			this.name = `The Three Musketeers`
			bus.emit('stack-updated')
			yield wait(1500)
			this.loading = false
			bus.emit('stack-updated')*/
		},
		toString() {
			if(this.info) {
				return `[${this.info.title}]`
			}
			/*var loading = this.loading ? ' ... ' : ''
			if(this.name) {
				return `[${this.name}${loading}]`
			}
			if(this.loading) {
				return `[${this.line}${loading}]`
			}*/
			return `${this.line}`
		}
	}
}