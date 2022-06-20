import express from 'express'
// import path from 'path'
import indexRouter from './routes/index'
import authRouter from './routes/auth'
import chatRoomRouter from './routes/chat-room'
import cors from 'cors'
import { decode } from './middlewares/jwt'

const app = express()

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/chat-rooms', decode, chatRoomRouter)

/** Catch 404 and forward to error handler */
app.use('*', (req, res) => {
  return res.status(404).json({
    error:  { message: "API endpoint doesn't exist" }
  })
})

export default app;