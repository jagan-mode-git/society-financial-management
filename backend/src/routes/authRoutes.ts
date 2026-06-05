import express from 'express'
import { generateToken } from '../utils/jwt'

const router = express.Router()

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  // Demo validation
  if (username === 'admin' && password === 'admin123') {
    const token = generateToken('admin-id')

    return res.json({
      token,
      user: {
        username
      }
    })
  }

  return res.status(401).json({
    message: 'Invalid credentials'
  })
})

export default router