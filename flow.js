var bus = require('./bus');

module.exports = {
	wait,
	cont,
	noop,
}

function noop() {
	// noop
}

function wait(delay) {
	return new Promise((done, fail) => {
		setTimeout(() => {
			done(true)
		}, delay);
	})
}

function cont(gen, cb=noop, last=noop, val) {
	var frame = gen.next(val);
	if(frame.done) {
		return last();
	}
	frame.value.then(parcel => {
		cb(parcel)
		if(!frame.done) {
			cont(gen, cb, last, parcel)
		}
	})
	.catch(err => bus.emit('error', err))
}