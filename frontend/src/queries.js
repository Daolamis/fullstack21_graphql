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
    author
    genres
    }
}`

export const ADD_BOOK = gql`
mutation AddBook($title: String!, $author: String!, $published: Int!, $genres:[String!]!){
  addBook(title:$title, author:$author, published: $published, genres:$genres){
    id
    author
    title
    published
    genres
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