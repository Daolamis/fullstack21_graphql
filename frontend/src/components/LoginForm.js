import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { LOGIN } from '../queries'

const LoginForm = ({ setToken, setNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, { data }] = useMutation(LOGIN, {
    onError: error => {
      setNotification({message: error.message, isError: true})
    }
  })
  useEffect(() => {
    if (data) {
      const token = data.login.value
      setToken(token)
      localStorage.setItem('token',token)
    }
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogin = async (e) => {
    e.preventDefault()
    await login({ variables: { username, password } });
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>username <input type='text' value={username} onChange={({ target }) => setUsername(target.value)} /></div>
        <div>password <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} /></div>
        <div><button type='submit'>login</button></div>
      </form>
    </div>
  )
}

export default LoginForm