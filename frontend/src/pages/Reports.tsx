import { Typography, Card, CardContent, Grid, List, ListItem, Box } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'

const FAMILY_API = 'http://localhost:5000/api/families'
const PAYMENT_API = 'http://localhost:5000/api/payments'

const getMonthKey = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}`

export default function Reports() {
  const [families, setFamilies] = useState<any[]>([])
  const [payments, setPayments] = useState<any[]>([])

  const fetchData = async () => {
    const [fRes, pRes] = await Promise.all([
      axios.get(FAMILY_API),
      axios.get(PAYMENT_API)
    ])

    setFamilies(fRes.data)
    setPayments(pRes.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const currentMonth = getMonthKey(new Date())

  const monthlyPayments = payments.filter(
    p => getMonthKey(new Date(p.date)) === currentMonth
  )

  const totalCollection = monthlyPayments.reduce(
    (acc, p) => acc + p.amount + p.fine,
    0
  )

  // ✅ FIX: MongoDB uses _id
  const paidIds = monthlyPayments.map(p => p.familyId?._id)

  const defaulters = families.filter(
    f => !paidIds.includes(f._id)
  )

  return (
    <Box>
      <Typography variant="h4" mb={3}>Reports</Typography>

      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography>Total Monthly Collection</Typography>
              <Typography variant="h5">₹{totalCollection}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography>Defaulters Count</Typography>
              <Typography variant="h5">{defaulters.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h6">Defaulters List</Typography>

      <List>
        {defaulters.map(f => (
          <ListItem key={f._id}>
            {f.name} - {f.flatNumber}
          </ListItem>
        ))}
      </List>
    </Box>
  )
}