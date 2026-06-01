import express from 'express'
import { Expense, ExpenseStatus } from '../models/Expense'

const router = express.Router()

// ✅ GET all expenses
router.get('/', async (_req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 })

    res.json(expenses)
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching expenses',
    })
  }
})

// ✅ CREATE expense
router.post('/', async (req, res) => {
  try {
    const { title, amount } = req.body

    if (!title || !amount) {
      return res.status(400).json({
        message: 'Title and amount are required',
      })
    }

    const expense = new Expense({
      title,
      amount,
    })

    const savedExpense = await expense.save()

    res.status(201).json(savedExpense)
  } catch (error) {
    res.status(500).json({
      message: 'Error creating expense',
    })
  }
})

// ✅ APPROVE expense
router.patch('/:id/approve', async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        status: ExpenseStatus.APPROVED,
      },
      { new: true }
    )

    if (!updatedExpense) {
      return res.status(404).json({
        message: 'Expense not found',
      })
    }

    res.json(updatedExpense)
  } catch (error) {
    res.status(500).json({
      message: 'Error approving expense',
    })
  }
})

export default router