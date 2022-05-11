import supertest from 'supertest'
const request = supertest('http://localhost:3000/api/')

import { expect } from 'chai'

describe('Testing', () => {
  /* Testing the API */
  it('GET /Movies', () => {
    return request.get(`Movies`).then((res) => {
      expect(res.body).to.not.be.empty
    })
  })

  /* Testing to get specific genre */
  it('GET /Movies/genre/:genre', () => {
    return request.get(`Movies/genre/Action`).then((res) => {
      expect(res.body.genre).to.be.eq('Action')
    })
  })

  /* Testing to delete a movie with a certain ID */
//   it('DELETE /Movies/:id', () => {
//     return request.delete(`Movies/14`).then((res) => {
//       console.log(res.body)
//       expect(res.body).to.be.eq({})
//     })
//   })

})
