import express, { Request, Response } from 'express'
import { Payment } from '../models/Payment'

const router = express.Router()

// ✅ GET payments (with filters)
router.get('/', async (req: Request, res: Response) => {
  try {
    const { familyId, startDate, endDate } = req.query

    const filter: any = {}

    if (familyId) {
      filter.familyId = familyId
    }

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string),
      }
    }

    const payments = await Payment.find(filter)
      .populate('familyId')
      .sort({ date: -1 })

    res.json(payments)
  } catch {
    res.status(500).json({ message: 'Error fetching payments' })
  }
})

// ✅ CREATE payment
router.post('/', async (req: Request, res: Response) => {
  try {
    const { familyId, amount } = req.body

    if (!familyId || !amount) {
      return res.status(400).json({
        message: 'familyId and amount are required',
      })
    }

    const today = new Date()

    // ✅ Fine logic (can be moved to config later)
    const fine = today.getDate() > 10 ? 100 : 0

    const payment = await Payment.create({
      familyId,
      amount,
      fine,
      date: today,
    })

    res.status(201).json(payment)
  } catch (err: any) {
    res.status(500).json({ message: 'Error adding payment' })
  }
})

// ✅ GET single payment
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('familyId')

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' })
    }

    res.json(payment)
  } catch {
    res.status(500).json({ message: 'Error fetching payment' })
  }
})

// ✅ UPDATE payment
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { amount, fine } = req.body

    const updated = await Payment.findByIdAndUpdate(
      req.params.id,
      { amount, fine },
      { new: true, runValidators: true }
    )

    if (!updated) {
      return res.status(404).json({ message: 'Payment not found' })
    }

    res.json(updated)
  } catch {
    res.status(500).json({ message: 'Error updating payment' })
  }
})

// ✅ DELETE payment
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deleted = await Payment.findByIdAndDelete(req.params.id)

    if (!deleted) {
      return res.status(404).json({ message: 'Payment not found' })
    }

    res.json({ message: 'Payment deleted successfully' })
  } catch {
    res.status(500).json({ message: 'Error deleting payment' })
  }
})

// ✅ REPORT: Monthly summary (🔥 very useful)
router.get('/reports/monthly', async (_req: Request, res: Response) => {
  try {
    const result = await Payment.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
          },
          totalAmount: { $sum: '$amount' },
          totalFine: { $sum: '$fine' },
        },
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
    ])

    res.json(result)
  } catch {
    res.status(500).json({ message: 'Error generating report' })
  }
})

export default router