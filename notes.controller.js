const chalk = require('chalk')
const { note } = require('./models/note')

async function addNote(title) {
	await note.create({ title })

	console.log(chalk.bgGreen('Note was added!'))
}

async function getNotes() {
	const notes = await note.find()

	return notes
}

async function removeNote(id) {
	await note.deleteOne({ _id: id })

	console.log(chalk.bgGreen(`Note ${id} has been removed.`))
}

async function editNote(id, newTitle) {
	await note.updateOne({ _id: id }, { title: newTitle })

	console.log(chalk.bgGreen(`Note ${id} has been updated.`))
}

module.exports = {
	addNote,
	getNotes,
	removeNote,
	editNote,
}
