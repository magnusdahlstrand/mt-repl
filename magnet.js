var {wait} = require('./flow')
var bus = require('./bus')

module.exports = {
	test: line => line.startsWith('magnet:'),
	StackItemProto: {
		_run: function *() {
			yield wait(250)
			this.loading = true
			yield wait(700)
			this.name = `The Three Musketeers`
			bus.emit('stack-updated')
			yield wait(1500)
			this.loading = false
			bus.emit('stack-updated')
		},
		toString() {
			var loading = this.loading ? ' ... ' : ''
			if(this.name) {
				return `[${this.name}${loading}]`
			}
			if(this.loading) {
				return `[${this.line}${loading}]`
			}
			return `${this.line}`
		}
	}
}