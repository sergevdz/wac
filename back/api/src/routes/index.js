import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  const allTheWays = [
    'Bienvenue!',
    'Bienvenido!',
    'Welcome!',
    'Benvenuto!'
  ]
  return res.status(200).json({
    result: true,
    message: allTheWays[~~(Math.random() * allTheWays.length - 1)]
  })
})
export default router
