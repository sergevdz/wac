const socket = io();

const loadNotes = () => {
    socket.on('loadnotes', (notes) => {
        console.log(notes);
    })
}