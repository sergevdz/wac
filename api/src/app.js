import express from 'express'
// import path from 'path'
import indexRouter from './routes/index'
import authRouter from './routes/auth'
// import userRouter from './routes/user'
import cors from 'cors'

const app = express()

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// app.options('/*', function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//   res.send(200);
// });

app.use('/', indexRouter)
app.use('/auth', authRouter)
// app.use('/users', userRouter)

/** Catch 404 and forward to error handler */
app.use('*', (req, res) => {
  return res.status(404).json({
    error: {message: 'API endpoint doesnt exist'}
  })
})


export default app;