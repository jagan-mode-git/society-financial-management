import { Card, CardContent, Typography, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import api from '../api/axios'

export default function Dashboard() {
  const [families, setFamilies] = useState<any[]>([])
  const [payments, setPayments] = useState<any[]>([])

  const fetchData = async () => {
    const [fRes, pRes] = await Promise.all([
      api.get('/families'),
      api.get('/payments')
    ])

    setFamilies(fRes.data)
    setPayments(pRes.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const getMonthKey = (date: Date) => `${date.getFullYear()}-${date.getMonth() + 1}`
  const currentMonth = getMonthKey(new Date())

  const monthlyPayments = payments.filter(
    p => getMonthKey(new Date(p.date)) === currentMonth
  )

  const total = monthlyPayments.reduce((a, b) => a + b.amount + b.fine, 0)

  const paidIds = monthlyPayments.map(p => p.familyId?._id)
  const defaulters = families.filter(f => !paidIds.includes(f._id))
  
  return (
    <>
      <Typography variant="h4" mb={3}>Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography>Monthly Collection</Typography>
              <Typography variant="h5">₹{total}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography>Defaulters</Typography>
              <Typography variant="h5">{defaulters.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}