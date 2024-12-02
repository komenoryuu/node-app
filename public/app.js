document.addEventListener('click', event => {
	if (event.target.dataset.type === 'remove') {
		const id = event.target.dataset.id

		remove(id).then(() => {
			event.target.closest('li').remove()
		})
	}

	if (event.target.dataset.type === 'edit') {
		const id = event.target.dataset.id
		const newTitle = prompt('Enter a new value', '')

		if (newTitle) {
			edit(id, newTitle).then(updatedNote => {
				const listItem = event.target.closest('li')
				if (listItem) {
					listItem.firstChild.textContent = updatedNote.title
				}
			})
		}
	}
})

async function remove(id) {
	await fetch(`/${id}`, {
		method: 'DELETE',
	})
}

async function edit(id, newTitle) {
	const response = await fetch(`/${id}`, {
		method: 'PUT',
		headers: { 'Content-type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			title: newTitle,
		}),
	})

	return response.json()
}
