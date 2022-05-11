const Joi = require('@hapi/joi')
const express = require('express')
const api = express()

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

// Returns movies from specific genre
api.get('/api/Movies/genre/:genre', (req, res) => {
  const movie = allMovies.find((c) => c.genre === req.params.genre)
  if (!movie)
    return res.status(404).send('The movies with the given genre was not found')
  res.send(movie)
})


const port = process.env.PORT || 3000
api.listen(port, () => console.log(`Listening on ${port}...`))
