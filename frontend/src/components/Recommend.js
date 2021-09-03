
import React from 'react'
import { useQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../queries'
import BookTable from './BookTable'

const Recommend = (props) => {
  const result = useQuery(BOOKS_BY_GENRE, { variables: { genre: props.genre } })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    <div>Loading ..</div>
  }

  const books = result.data.allBooks
  console.log(result)

  return (
    <div>
      <h2>Recommendations</h2>
      <div>books in your favorit genre <strong>{props.genre}</strong></div>
      <BookTable books={books} />
    </div>
  )
}

export default Recommend