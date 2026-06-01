import express, { Request, Response } from 'express'
import { Family } from '../models/Family'

const router = express.Router()

// ✅ Create Family
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, flatNumber } = req.body

    if (!name || !flatNumber) {
      return res.status(400).json({ message: 'Name and flatNumber are required' })
    }

    const family = await Family.create({ name, flatNumber })

    res.status(201).json(family)
  } catch (err: any) {
    // Handle duplicate flatNumber
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Flat number already exists' })
    }

    res.status(500).json({ message: 'Failed to create family' })
  }
})

// ✅ Get All Families
router.get('/', async (_req: Request, res: Response) => {
  try {
    const families = await Family.find().sort({ createdAt: -1 })
    res.json(families)
  } catch {
    res.status(500).json({ message: 'Failed to fetch families' })
  }
})

// ✅ Get Single Family
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const family = await Family.findById(req.params.id)

    if (!family) {
      return res.status(404).json({ message: 'Family not found' })
    }

    res.json(family)
  } catch {
    res.status(500).json({ message: 'Failed to fetch family' })
  }
})

// ✅ Update Family
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, flatNumber } = req.body

    const updated = await Family.findByIdAndUpdate(
      req.params.id,
      { name, flatNumber },
      { new: true, runValidators: true }
    )

    if (!updated) {
      return res.status(404).json({ message: 'Family not found' })
    }

    res.json(updated)
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Flat number already exists' })
    }

    res.status(500).json({ message: 'Failed to update family' })
  }
})

// ✅ Delete Family
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deleted = await Family.findByIdAndDelete(req.params.id)

    if (!deleted) {
      return res.status(404).json({ message: 'Family not found' })
    }

    res.json({ message: 'Family deleted successfully' })
  } catch {
    res.status(500).json({ message: 'Failed to delete family' })
  }
})

export default router