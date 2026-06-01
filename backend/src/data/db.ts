import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in .env')
    }

    // ✅ Enable debug only in development
    if (process.env.NODE_ENV === 'development') {
      mongoose.set('debug', true)
    }

    await mongoose.connect(process.env.MONGO_URI)

    console.log('✅ MongoDB Connected')
  } catch (err) {
    console.error('❌ DB Connection Error:', err)
    process.exit(1)
  }
}