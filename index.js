const express = require('express')
const chalk = require('chalk')
const path = require('path')
const mongoose = require('mongoose')
const { note } = require('./models/note')
const { addNote, getNotes, removeNote, editNote } = require('./notes.controller')

const port = 3000
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(
	express.urlencoded({
		extended: true,
	}),
)
app.use(express.json())

app.get('/', async (req, res) => {
	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		created: false,
		error: false,
	})
})

app.post('/', async (req, res) => {
	try {
		await addNote(req.body.title)
		res.render('index', {
			title: 'Express App',
			notes: await getNotes(),
			created: true,
			error: false,
		})
	} catch (error) {
		console.log(`Creating error: ${error}`)

		res.render('index', {
			title: 'Express App',
			notes: await getNotes(),
			created: false,
			error: true,
		})
	}
})

app.delete('/:id', async (req, res) => {
	await removeNote(req.params.id)

	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		created: false,
		error: false,
	})
})

app.put('/:id', async (req, res) => {
	const id = req.params.id
	const newTitle = req.body.title

	await editNote(id, newTitle)

	res.json({ id, title: newTitle })
})

mongoose
	.connect(
		'MONGODB_CLUSTER_URL',
	)
	.then(() => {
		app.listen(port, () => {
			console.log(chalk.bgGreen(`Server has been started on port ${port}...`))
		})
	})
