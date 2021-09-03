import { useMutation } from "@apollo/client"
import React, { useState } from "react"
import { EDIT_AUTHOR } from "../queries"


const BirthForm = ({ authors, setNotification }) => {
  const [born, setBorn] = useState('')
  const [author, setAuthor] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: error => {
      setNotification({message: error.message, isError: true})
    }
  })

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
        <div> name
        <select value={author} onChange={({ target }) => setAuthor(target.value)}>
          <option value=''></option>
          {authors.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
        </select>
        </div>
        <div>born <input type='number' value={born} onChange={({ target }) => setBorn(target.value)} /></div>
        <div><button type='submit'>update author</button></div>
      </form>
    </div>
  )
}

export default BirthForm