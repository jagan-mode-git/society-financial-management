import { TextField, Button, List, ListItem, Typography, Chip, Box } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'

const EXPENSES_API = 'http://localhost:5000/api/expenses'

interface Expense {
  id: string
  title: string
  amount: number
  status: 'PENDING' | 'APPROVED'
}

export default function Expenses() {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState<number>(0)
  const [expenses, setExpenses] = useState<Expense[]>([])

  // Fetch families from backend
  const fetchExpenses = async () => {
    const res = await axios.get(EXPENSES_API)
    setExpenses(res.data)
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  const addExpense = async () => {
    if (!title || !amount) {
      alert('Enter all fields')
      return
    }

    await axios.post(EXPENSES_API, {
      title,
      amount
    })

    setTitle('')
    setAmount(0)

    fetchExpenses()
  }

  const approve = async (id: string) => {
    await axios.patch(`${EXPENSES_API}/${id}/approve`)
    fetchExpenses()
  }

  console.log("outer Id", expenses)
  return (
    <Box>
      <Typography variant="h4" mb={2}>Expenses</Typography>

      <Box mb={2}>
        <TextField
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          sx={{ mr: 2 }}
        />

        <TextField
          type="number"
          label="Amount"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          sx={{ mr: 2 }}
        />

        <Button variant="contained" onClick={addExpense}>
          Add
        </Button>
      </Box>

      <List>
        {expenses.map(e => (
          <ListItem key={e.id}>
            {e.title} - ₹{e.amount}

            <Chip label={e.status} sx={{ ml: 2 }} />

            {e.status === 'PENDING' && (
              <Button
                sx={{ ml: 2 }}
                onClick={() => approve(e.id)}
              >
                Approve
              </Button>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  )
}