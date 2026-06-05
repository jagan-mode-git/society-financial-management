import { TextField, Button, List, ListItem, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import api from '../api/axios'

export default function Families() {
  const [list, setList] = useState<any[]>([])
  const [name, setName] = useState('')
  const [flat, setFlat] = useState('')

  // Fetch families from backend
  const fetchFamilies = async () => {
    const res = await api.get('/families')
    setList(res.data)
  }

  useEffect(() => {
    fetchFamilies()
  }, [])

  // Add family to backend
  const addFamily = async () => {
    if (!name || !flat) return alert('Enter all fields')

    await api.post('/families', {
      name,
      flatNumber: flat
    })

    setName('')
    setFlat('')
    fetchFamilies()
  }

  return (
    <>
      <Typography variant="h4" mb={2}>Families</Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField value={name} label="Name" onChange={e => setName(e.target.value)} sx={{ mr: 2 }} />
        <TextField value={flat} label="Flat" onChange={e => setFlat(e.target.value)} sx={{ mr: 2 }} />
        <Button variant="contained" onClick={addFamily}>Add</Button>
      </Paper>
      <List>
        {list.map(f => (
          <ListItem key={f.id}>{f.name} - {f.flatNumber}</ListItem>
        ))}
      </List>
    </>
  )
}