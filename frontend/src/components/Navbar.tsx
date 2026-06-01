import { AppBar, Toolbar, Button } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
        <Button color="inherit" component={Link} to="/families">Families</Button>
        <Button color="inherit" component={Link} to="/payments">Payments</Button>
        <Button color="inherit" component={Link} to="/expenses">Expenses</Button>
      </Toolbar>
    </AppBar>
  )
}