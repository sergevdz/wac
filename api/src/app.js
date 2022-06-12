import express from 'express'
// import path from 'path'
import indexRouter from './routes/index'
import authRouter from './routes/auth'
// import userRouter from './routes/user'
// import cors from 'cors'

const app = express()

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(cors)

app.use('/', indexRouter)
app.use('/auth', authRouter)
// app.use('/users', userRouter)

/** Catch 404 and forward to error handler */
app.use('*', (req, res) => {
  return res.status(404).json({
      success: false,
      message: 'API endpoint doesnt exist'
  })
})


export default app;