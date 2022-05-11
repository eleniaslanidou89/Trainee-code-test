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

  /* Testing adding a new movie */
  it('POST /Movies', () => {
    const data = {
      title: 'Test name',
      description: 'Test The first Blender Open Movie from 2006',
      subtitle: 'Test By Blender Foundation',
      thumb: 'Test images/ElephantsDream.jpg',
      genre: 'Test Action',
    }

    return request
      .post('Movies')
      .send(data)
      .then((res) => {
        expect(res.body).to.deep.include(data)
      })
  })

  /* Testing returning a movie with certain id */
  it('GET /Movies/:id', () => {
    return request.get(`Movies/3`).then((res) => {
      expect(res.body.id).to.be.eq(3)
    })
  })

  /* Testing deleting a certain id */
  //   it('DELETE /Movies/:id', () => {
  //     return request.delete(`Movies/14`).then((res) => {
  //       console.log(res.body)
  //       expect(res.body).to.be.eq({})
  //     })
})
