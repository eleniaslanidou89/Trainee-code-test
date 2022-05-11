import supertest from 'supertest'
const request = supertest('http://localhost:3000/api/')

import { expect } from 'chai'

describe('Testing', () => {
  it('GET /Movies', () => {
    return request.get(`Movies`).then((res) => {
      expect(res.body).to.not.be.empty
    })
  })
})
