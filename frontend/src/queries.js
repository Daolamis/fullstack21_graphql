import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query{
    allAuthors {
      id
      name
      born
      bookCount   
  }
}`

export const ALL_BOOKS = gql`
query {
  allBooks {
    id
    title
    published
    genres
    author {
      id
      name
      born
      bookCount
    }
  }
}`

export const BOOKS_BY_GENRE = gql`
query bookByGenre($genre: String!){
  allBooks(genre:$genre) {
    id
    title
    published
    genres
    author {
      id
      name
      born
      bookCount
    }
  }
}`

export const ADD_BOOK = gql`
mutation AddBook($title: String!, $author: String!, $published: Int!, $genres:[String!]!){
  addBook(title:$title, author:$author, published: $published, genres:$genres){
    id
    title
    published
    genres
    author {
      id
      name
      born
      bookCount
    }
  }
}`

export const EDIT_AUTHOR = gql`
mutation EditAuthor($author: String!, $born:Int!) {
  editAuthor(name: $author, setToBorn:$born){
    id
    name
    born
    bookCount
  }  
}`

export const LOGIN = gql`
mutation Login($username:String!, $password:String!){
  login(username:$username, password:$password){
    value
  }
}`

export const ME = gql`
query Me{
  me{
    username
    favoriteGenre
    id
  }
}`

