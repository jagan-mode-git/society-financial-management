
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const nav = useNavigate()
  return (
    <Button onClick={() => {
      localStorage.setItem('auth','true')
      nav('/dashboard')
    }}>
      Login
    </Button>
  )
}
