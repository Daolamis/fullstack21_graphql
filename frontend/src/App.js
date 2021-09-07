import { useLazyQuery, useSubscription } from '@apollo/client'
import React, { useEffect, useRef, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import Recommend from './components/Recommend'
import { ME, BOOK_ADDED } from './queries'

const App = () => {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('authors')
  const [notification, setNotification] = useState(null)
  const [token, setToken] = useState(null)
  let timeoutRef = useRef()
  const [getMe, result] = useLazyQuery(ME, { fetchPolicy: "no-cache" })
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData: { data: { bookAdded: book } } }) => {
      showNotification({ message: `${book.title} book by ${book.author.name} was added ` })
    }
  })
  useEffect(() => {
    const token = localStorage.getItem('token')
    token && setToken(token)
  }, [])

  useEffect(() => {
    setPage('authors') //after login go to authors
    getMe()
  }, [token]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (result.data) {
      setUser(result.data.me)
    }
  }, [result])

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
        {token && <button onClick={() => setPage('recommend')}>recommend</button>}
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

      {user && <Recommend
        show={page === 'recommend'}
        genre={user.favoriteGenre}
      />}

      {page === 'login' &&
        <LoginForm setToken={setToken} setNotification={showNotification} />}

    </div>
  )
}

export default App