const mongoose = require('mongoose');
const {Comment} = require('../../models/comment');
const request = require('supertest');

let server;
let thread1Comment1;
let thread1Comment1Child;
let thread2Comment1;

const thread1 = 'thread1';
const thread2 = 'thread2';

async function generateComments() {
  let payload = {
    thread: thread1,
    parent: null,
    children: [],
    text: 'comment 1 thread 1'
  };

  let comment = new Comment(payload);
  await comment.save();
  thread1Comment1 = comment._id;

  payload.parent = thread1Comment1;
  payload.text = 'child comment 1 comment 1 thread 1';
  let childComment = new Comment(payload);
  await childComment.save();
  thread1Comment1Child = childComment._id;

  comment.children = [thread1Comment1Child];
  comment.save();

  payload.parent = null;
  payload.text = "comment 2 thread 1"
  comment = new Comment(payload);
  await comment.save();

  payload.thread = thread2;
  payload.text = "comment 1 thread 2";
  comment = new Comment(payload);
  await comment.save();
  thread2Comment1 = comment._id;
}

describe('/api/comments', () => {
  beforeEach(async () => {
    server = require('../../../server');

    await generateComments();
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

  describe('GET /:thread', () => {
    let targetThread;
    beforeEach(async () => {
      targetThread = thread1;
    });

    const exec = () => {
      return request(server)
        .get('/api/comments/' + targetThread);
    }

    it('should return status 200 on success', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    })

    it('should return all comments for threads on success', async () => {
      const res = await exec();
      expect(res.body.length).toBe(2);
    })

    it('should return all comments for threads on success 2', async () => {
      targetThread = thread2;

      const res = await exec();
      expect(res.body.length).toBe(1);
    })

    it('should return comments in the order they were created', async () => {
      const res = await exec();
      expect(res.body[0]._id).toBe(thread1Comment1.toHexString());
      expect(res.body.length).toBe(2);
    })

    it('should return comments with their children nested', async () => {
      const res = await exec();
      expect(res.body[0].children[0]._id).toBe(thread1Comment1Child.toHexString());
    })

    it('should return 404 if thread id is not found', async () => {
      targetThread = "doesNotExist";
      const res = await exec();
      expect(res.status).toBe(404);
    })
  });

  describe('POST /:thread', () => {
    let payload;
    let commentText;
    let targetThread;

    beforeEach(async () => {
      commentText = "test comment text";
      payload = {
        parent: thread1Comment1,
        text: commentText
      };
      targetThread = thread1;
    });

    const exec = () => {
      return request(server)
        .post('/api/comments/' + targetThread)
        .send(payload);
    }

    it('should return status 200 on success', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    })

    it('should return status 200 on success for non-child comment', async () => {
      payload.parent = null;
      const res = await exec();
      expect(res.status).toBe(200);
    })

    it('should return status 200 on new thread comment', async () => {
      payload.parent = null;
      targetThread = "newThread";
      const res = await exec();
      expect(res.status).toBe(200);
    })

    it('should return the comment on successful post', async () => {
      const res = await exec();
      expect(res.body).toHaveProperty('text', commentText);
    })

    it('should update parents children when child comment is posted', async () => {
      const res = await exec();
      const childId = res.body._id;

      const parentComment = await Comment.findById(thread1Comment1);
      expect(parentComment.children).toContainEqual(mongoose.Types.ObjectId(childId));
    })

    it('should return 400 if comment is greater than 256 characters', async () => {
      payload.text = "a".repeat(257);
      const res = await exec();
      expect(res.status).toBe(400);
    })

    it('should return 400 if comment is less than 1 character', async () => {
      payload.text = "";
      const res = await exec();
      expect(res.status).toBe(400);
    })

    it('should return 404 if parent comment is not found', async () => {
      payload.parent = new mongoose.Types.ObjectId();
      const res = await exec();
      expect(res.status).toBe(404);
    })

    it('should return 400 if parent comment is from a different thread', async () => {
      payload.parent = thread2Comment1;
      const res = await exec();
      expect(res.status).toBe(400);
    })
  });

  
  describe('PUT /:id', () => {
    let payload;
    let commentText;
    let commentId;

    beforeEach(async () => {
      commentText = "updated comment text";
      payload = {
        text: commentText
      };
      commentId = thread1Comment1;
    });

    const exec = () => {
      return request(server)
        .put('/api/comments/' + commentId)
        .send(payload);
    }

    it('should return status 200 on success', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    })

    it('should return the updated comment on success', async () => {
      const res = await exec();
      expect(res.body).toHaveProperty('text', commentText);
    })

    it('should return 400 if new comment text is less than 1 character', async () => {
      payload.text = '';
      const res = await exec();
      expect(res.status).toBe(400);
    })

    it('should return 400 if new comment text is greater than 256 characters', async () => {
      payload.text = 'a'.repeat(257);
      const res = await exec();
      expect(res.status).toBe(400);
    })

    it('should return 404 if comment id is not found', async () => {
      commentId = new mongoose.Types.ObjectId();
      const res = await exec();
      expect(res.status).toBe(404);
    })

    it('should return 400 if comment id is not a valid objectId', async () => {
      commentId = '1234';
      const res = await exec();
      expect(res.status).toBe(400);
    })
  });
});