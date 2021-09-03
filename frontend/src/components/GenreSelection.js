import React from 'react'

const GenreSelection = ({ genres, setShowGenre }) => {

  return (
    <div>
      {genres.map(g => 
        <button key={g} onClick={() => setShowGenre(g)}>{g}</button>
      )}
      <button onClick={() => setShowGenre(null)}>all genres</button>
    </div>
  )
}

export default GenreSelection