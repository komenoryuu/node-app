const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
	title: {
		type: String,
		require: true,
	},
})

const note = mongoose.model('Note', noteSchema)

module.exports = {
	note,
}
