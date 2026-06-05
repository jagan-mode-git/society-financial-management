import { useState } from 'react'
import { Button, TextField, Box } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const nav = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          username,
          password
        }
      )

      localStorage.setItem(
        'token',
        res.data.token
      )

      nav('/dashboard')
    } catch {
      alert('Invalid credentials')
    }
  }

  return (
    <Box>
      <TextField
        label="Username"
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <Button onClick={login}>
        Login
      </Button>
    </Box>
  )
}