const Joi = require('@hapi/joi')
const express = require('express')
const req = require('express/lib/request')
const api = express()

api.use(express.json())

const moviesJson = require('./movies.json')
class MovieAPI {
  constructor(movies) {
    this.movies = movies
    let i = 0
    this.movies.forEach((item) => {
      item.rating = Math.floor(Math.random() * 6)
      item.id = i + 1
      i += 1
    })
  }

  fetchAllMovies() {
    return this.movies
  }
}

const API = new MovieAPI(moviesJson)
let allMovies = []
allMovies = API.fetchAllMovies()
console.log(allMovies)

api.get('/', (req, res) => {
  res.send('Hello World!')
})

api.get('/api/Movies', (req, res) => {
  res.send(allMovies)
})

/* Returns movies from certain genre (2) */
api.get('/api/Movies/genre/:genre', (req, res) => {
  const movie = allMovies.find((c) => c.genre === req.params.genre)
  if (!movie)
    return res.status(404).send('The movies with the given genre was not found')
  res.send(movie)
})

/* Remove a movie with a certain id (3) */
api.delete('/api/Movies/:id', (req, res) => {
  // Looking for the movie
  // Not existing return 404
  const movie = allMovies.find((c) => c.id === parseInt(req.params.id))
  if (!movie)
    return res.status(404).send('The movies with the given ID was not found')

  // Delete
  const index = allMovies.indexOf(movie)
  allMovies.splice(index, 1)

  // Return the same movie - response to our client
  res.send(movie)
})

/* Add a new movie (9) */
api.post('/api/Movies', (req, res) => {
  const { error } = ValidateMovie(req.body)
  if (error) {
    // Bad Request
    return res.status(400).send(error.details[0].message)
  }

  const newMovie = {
    id: allMovies.length + 1,
    title: req.body.title,
    subtitle: req.body.subtitle,
    thumb: req.body.thumb,
    description: req.body.description,
    genre: req.body.genre,
    rating: Math.floor(Math.random() * 6),
  }
  allMovies.push(newMovie)
  res.send(newMovie)
})

/* Returns movie with certain id (10) */
api.get('/api/Movies/:id', (req, res) => {
  const movie = allMovies.find((c) => c.id === parseInt(req.params.id))
  if (!movie)
    return res.status(404).send('The movies with the given ID was not found')
  res.send(movie)
})

function ValidateMovie(movie) {
  const schema = {
    title: Joi.string().min(3).required(),
    subtitle: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    thumb: Joi.string().min(3).required(),
    genre: Joi.string().min(3).required(),
  }
  return Joi.validate(movie, schema)
}

const port = process.env.PORT || 3000
api.listen(port, () => console.log(`Listening on ${port}...`))
