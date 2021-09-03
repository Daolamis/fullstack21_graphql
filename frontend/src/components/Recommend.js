
import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../queries'
import BookTable from './BookTable'

const Recommend = (props) => {
  const [favoritBooks, setFavoriteBooks] = useState([])
  const [getBooksByGenre, result] = useLazyQuery(BOOKS_BY_GENRE, {
    fetchPolicy: "no-cache"
  })
  useEffect(() => {
    getBooksByGenre({ variables: { genre: props.genre } })
  }, [props.show]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (result.data) {
      setFavoriteBooks(result.data.allBooks)
    }
  }, [result])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <div>books in your favorit genre <strong>{props.genre}</strong></div>
      <BookTable books={favoritBooks} />
    </div>
  )
}

export default Recommend