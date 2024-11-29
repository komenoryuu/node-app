const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
	const notes = await getNotes()
	const note = {
		title,
		id: Date.now().toString(),
	}

	notes.push(note)

	await saveNotes(notes)
	console.log(chalk.bgGreen('Note was added!'))
}

async function getNotes() {
	const notes = await fs.readFile(notesPath, { encoding: 'utf-8' })
	const parse = JSON.parse(notes)

	return Array.isArray(parse) ? parse : []
}

async function saveNotes(notes) {
	await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function printNotes() {
	const notes = await getNotes()

	console.log(chalk.bgGreen('Here is the list of notes:'))
	notes.forEach(note => {
		console.log(chalk.white(note.id), ':', chalk.blue(note.title))
	})
}

async function removeNote(id) {
	const notes = await getNotes()

	const newNotesList = notes.filter(note => note.id !== id)

	await fs.writeFile(notesPath, JSON.stringify(newNotesList))

	console.log(chalk.bgGreen(`Note ${id} has been removed.`))
}

module.exports = {
	addNote,
	printNotes,
	removeNote,
}
