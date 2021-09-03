
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import GenreSelection from './GenreSelection'
import BookTable from './BookTable'

const Books = (props) => {
  const [showGenre, setShowGenre] = useState(null)

  const result = useQuery(ALL_BOOKS)
  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>Loading ..</div>
  }

  const books = showGenre
    ? result.data.allBooks.filter(b => b.genres.includes(showGenre))
    : result.data.allBooks

  const allGenres = result.data.allBooks.map(b => b.genres).flat()
  const uniqueGenres = Array.from(new Set(allGenres));
  
  return (
    <div>
      <h2>books</h2>
      {showGenre && <div>in genre <strong>{showGenre}</strong></div>}
      <BookTable books={books} />
      <GenreSelection genres={uniqueGenres} setShowGenre={setShowGenre}/>
    </div>
  )
}

export default Books