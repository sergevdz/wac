import Note from './models/Note'

export default (io) => {
  io.on('connection', (socket) => {
    const emitNotes = async () => {
      const notes = await Note.find()
      io.emit('server:loadnotes', notes)
    }
    emitNotes()

    socket.on('client:newnote', async (note) => {
      const newNote = new Note({
        title: note.title,
        description: note.description
      })
      const savedNote = await newNote.save()
      io.emit('server:newnote', savedNote)
    })

    socket.on('client:deletenote', async (id) => {
      await Note.findByIdAndDelete(id)
      emitNotes();
    })
  })
}