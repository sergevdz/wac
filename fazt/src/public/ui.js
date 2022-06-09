import { saveNote } from './socket.js'

export const onHandleSubmit = (e) => {
    e.preventDefault()
    saveNote(noteForm['title'].value, noteForm['description'].value)
}

const noteUI = note => {
    const div = document.createElement('div')
    div.innerHTML = `
        <div>
            <h1>${note.title}</h1>
            <p>${note.description}</p>
        </div>
    `
    return div
}
const notesList = document.querySelector('#notes')

export const renderNotes = notes => {
    notes.forEach(note => notesList.append(noteUI(note)))
}

export const appendNote = note => {
    notesList.append(noteUI(note))
}