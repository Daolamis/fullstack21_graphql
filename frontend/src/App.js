import React, { useEffect, useRef, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Notification from './components/Notification'

const App = () => {
  const [page, setPage] = useState('authors')
  const [notification, setNotification] = useState(null)
  const [token, setToken] = useState(null)
  let timeoutRef = useRef()
  
  useEffect(()=>{
    const token = localStorage.getItem('token')
    token && setToken(token)
  },[])

  useEffect(()=>{
    setPage('authors')
  },[token])

  const logout = () => {
    setToken(null)
    localStorage.removeItem('token')
  }

  const showNotification = (notification) => {
    setNotification(notification)
    clearTimeout(timeoutRef)
    timeoutRef = setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {!token
          ? <button onClick={() => setPage('login')}>login</button>
          : <button onClick={logout}>logout</button>
        }
      </div>
      <Notification notification={notification} />
      <Authors
        token={token}
        setNotification={showNotification}
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        setNotification={showNotification}
        show={page === 'add'}
      />

      {page === 'login' &&
        <LoginForm setToken={setToken} setNotification={showNotification} />}

    </div>
  )
}

export default App