require('dotenv').config()
const { ApolloServer,UserInputError, AuthenticationError, gql } = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const JWT_SECRET = 'MOO00II11'
const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(e => console.log('Failed to connect MongoDB', e.message))

const typeDefs = gql`
 type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

  type Token {
    value: String!
  }

  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int
  }

  type Book {
    id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }
    
  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name:String! setToBorn: Int!): Author
    createUser(username: String favoriteGenre: String!): User
    login(username: String! password: String!): Token
  }
`

const resolvers = {
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        author = await author.save()
      }
      const book = new Book({ ...args, author: author })
      return book.save().catch(error => {
        throw new UserInputError(error.message, { invalidArgs: args })
      })
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const author = await Author.findOne({ 'name': args.name })
      if (author) {
        author.born = args.setToBorn
        return author.save()
      }
      return null
    },
    createUser: (root, args) => {
      const user = new User({ ...args })
      return user.save().catch(error => {
        throw new UserInputError(error.message, { invalidArgs: args })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user && 'salasana1234' !== args.password) {
        throw new UserInputError('Wrong password or username')
      }
      const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET)
      return { value: token }
    }
  },
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      if (args.genre) {
        return Book.find({ 'genres': { $in: [args.genre] } })
          .populate('author')
      }
      return Book.find({}).populate('author')
    },
    allAuthors: () => Author.find({}),
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root.id })
      console.log('BOOKS', books)
      return books.length
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
