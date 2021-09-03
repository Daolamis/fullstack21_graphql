
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import GenreSelection from './GenreSelection'

const Books = (props) => {
  const [showGenre, setShowGenre] = useState(null)

  const result = useQuery(ALL_BOOKS)
  if (!props.show) {
    return null
  }

  if (result.loading) {
    <div>Loading ..</div>
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
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <GenreSelection genres={uniqueGenres} setShowGenre={setShowGenre}/>
    </div>
  )
}

export default Books