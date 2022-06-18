import Note from './models/Note'

const messages = [
  { author: '', text: 'rando'},
  { author: '', text: 'rando'},
  { author: '', text: 'rando2'},
]

export default (io) => {
  io.on('connection', (socket) => {
    console.log('New user has connected!: ', socket.id)
    // io.emit('newUserConnected')
    // const emitNotes = async () => {
    //   const notes = await Note.find()
    //   io.emit('server:loadnotes', notes)
    // }
    // emitNotes()
    const emitMessages = async () => {
      io.emit('loadMessages', messages)
    }
    emitMessages()

    // socket.on('client:newnote', async (note) => {
    //   const newNote = new Note({
    //     title: note.title,
    //     description: note.description
    //   })
    //   const savedNote = await newNote.save()
    //   io.emit('server:newnote', savedNote)
    // })

    // socket.on('client:deletenote', async (id) => {
    //   await Note.findByIdAndDelete(id)
    //   emitNotes();
    // })
    socket.on('addNewMessage', message => {
      messages.push(message)
      io.emit('loadMessages', messages)
    })
    socket.on('join', (userName) => {
      io.emit('newUserConnected', userName)
    })
  })
}