const mongoose = require('mongoose');
const {Comment} = require('../../models/comment');
const request = require('supertest');

let server;

describe('/api/comments', () => {
  beforeEach(async () => {
    server = require('../../server');
  });

  afterEach(async () => {
    await Comment.deleteMany({});
    if (server) {
      await server.close();
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('GET /', () => {
    beforeEach(async () => {

    });

    const exec = () => {
      return request(server)
        .get('/api/comments');
    }

    it('should return status 200 on success', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    })
  });
});