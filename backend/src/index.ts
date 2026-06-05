import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/authRoutes'
import familyRoutes from './routes/familyRoutes'
import paymentRoutes from './routes/paymentRoutes'
import expenseRoutes from './routes/expenseRoutes'
import { connectDB } from './data/db'

dotenv.config()

const app = express()

// ✅ Middlewares
app.use(cors())
app.use(express.json())

// ✅ Health check
app.get('/', (req: Request, res: Response) => {
  res.send('API Running 🚀')
})

// ✅ Routes
app.use('/api/auth', authRoutes)
app.use('/api/families', familyRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/expenses', expenseRoutes)

// ❌ 404 Handler (important)
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' })
})

// ❌ Global Error Handler
app.use(
  (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err)
    res.status(err.status || 500).json({
      message: err.message || 'Something went wrong',
    })
  }
)

const PORT = process.env.PORT || 5000

const startServer = async () => {
  try {
    await connectDB()

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('❌ Server start failed', error)
    process.exit(1)
  }
}

startServer()