import { useMutation } from "@apollo/client"
import React, { useState } from "react"
import { EDIT_AUTHOR } from "../queries"


const BirthForm = () => {
  const [born, setBorn] = useState('')
  const [author, setAuthor] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR)

  const handleSubmit = (e) => {
    e.preventDefault()
    editAuthor({ variables: { author, born: Number(born) } })
    setBorn('')
    setAuthor('')
  }


  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={handleSubmit}>
        <div>name: <input type='text' value={author} onChange={({ target }) => setAuthor(target.value)} /></div>
        <div>born <input type='number' value={born} onChange={({ target }) => setBorn(target.value)} /></div>
        <div><button type='submit'>update author</button></div>
      </form>
    </div>
  )
}

export default BirthForm