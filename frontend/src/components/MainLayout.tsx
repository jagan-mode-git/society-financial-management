import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Link, Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Society Finance
          </Typography>

          <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
          <Button color="inherit" component={Link} to="/families">Families</Button>
          <Button color="inherit" component={Link} to="/payments">Payments</Button>
          <Button color="inherit" component={Link} to="/expenses">Expenses</Button>
          <Button color="inherit" component={Link} to="/reports">Reports</Button>
        </Toolbar>
      </AppBar>

      {/* ✅ THIS is where pages render */}
      <Box p={3}>
        <Outlet />
      </Box>
    </Box>
  )
}