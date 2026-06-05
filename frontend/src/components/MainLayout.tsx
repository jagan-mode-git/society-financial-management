import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'

export default function MainLayout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }
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
          {/* Logout */}
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* ✅ THIS is where pages render */}
      <Box p={3}>
        <Outlet />
      </Box>
    </Box>
  )
}