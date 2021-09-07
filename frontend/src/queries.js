import { gql } from '@apollo/client';

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    id
    name
    born
    bookCount   
  }
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    published
    genres
    author {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`


export const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      ...AuthorDetails   
    }
  }
  ${AUTHOR_DETAILS}
`

export const ALL_BOOKS = gql`
  query AllBooks {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const BOOKS_BY_GENRE = gql`
  query BookByGenre($genre: String!){
    allBooks(genre:$genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $published: Int!, $genres:[String!]!){
    addBook(title:$title, author:$author, published: $published, genres:$genres){
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql`
  mutation EditAuthor($author: String!, $born:Int!) {
    editAuthor(name: $author, setToBorn:$born){
    ... AuthorDetails
    }  
  }
  ${AUTHOR_DETAILS}
`

export const LOGIN = gql`
  mutation Login($username:String!, $password:String!){
    login(username:$username, password:$password){
      value
    }
  }
`

export const ME = gql`
  query Me {
    me{
      username
      favoriteGenre
      id
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ... BookDetails
    }
  }
  ${BOOK_DETAILS}
`

