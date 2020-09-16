const express = require('express');
const router = express.Router();

const _ = require('lodash');
const validateObjectId = require('../middleware/validateObjectId');
const {logInfo, logError} = require('../debug/logging');
const {errorResponse} = require('../shared/response');
const {Comment, validatePostComment, validatePutComment} = require('../models/comment');

router.get('/:thread', async (req, res) => {
  if (!req.params.thread)
    return res.status(400).send(errorResponse('Must provide a valid thread name'));

  const comments = await Comment.getThread(req.params.thread);

  if (comments.length === 0)
    return res.status(404).send(errorResponse('Thread with that Id does not exist'));

  return res.status(200).send(comments);
})


router.post('/:thread', async (req, res) => {
  const {error} = validatePostComment(req.body);
  if (error) return res.status(400).send(errorResponse(error.details[0].message));

  let thread = req.params.thread;

  let parent = null;
  // If requested parent param is not null, check if parent exists
  if (req.body.parent) {
    parent = await Comment.findById(req.body.parent);
    if (!parent)
      return res.status(404).send(errorResponse("Parent not found"))

    if (thread != parent.thread)
      return res.status(400).send(errorResponse("Parent thread and param thread do not match"));

    // Make sure the parent children property is an empty array
    if (!Array.isArray(parent.children))
      parent.children = [];
  }

  const comment = new Comment(_.pick(req.body,
    [
      'parent',
      'text'
    ]));
  comment.children = [];
  comment.thread = thread;

  // First save the comment
  try {
    await comment.save();
  }
  catch (err) {
    logError(err);
    return res.status(500).send(errorResponse(err));
  }

  // Then update the parent. If this fails, remove the comment and return
  try {
    let log = `New comment ${comment._id} posted to thread ${comment.thread}`;
    if (parent) {
      parent.children.push(comment._id);
      await parent.save();
      log += `, in reply to parent comment ${parent._id}`;
    }

    logInfo(log);

    return res.status(200).send(comment);
  } catch (err) {
    await comment.deleteOne();
    logError(err);
    return res.status(500).send(errorResponse(err));
  }
})

router.put('/:id', validateObjectId, async (req, res) => {
  const {error} = validatePutComment(req.body);
  if (error)
    return res.status(400).send(errorResponse(error.details[0].message))

  const comment = await Comment.findByIdAndUpdate(req.params.id,
    {
      $set: _.pick(req.body,
        [
          'text'
        ])
    }, {new: true});

  if (!comment)
    return res.status(404).send(errorResponse('Could not find comment with specified Id'));

  logInfo(`Comment ${comment._id} updated.`)

  return res.status(200).send(comment);
});


module.exports = router;