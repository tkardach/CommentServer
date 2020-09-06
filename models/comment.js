const Joi = require('joi');
const mongoose = require('mongoose');
Joi.objectId = require('joi-objectid')(Joi);

const commentSchema = new mongoose.Schema({
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  text: {type: String, required: true}
});

const Comment = mongoose.model("Comment", commentSchema);

// Validates a /POST request
function validatePostComment(comment) {
  const schema = {
    parent: Joi.objectId().optional(),
    children: Joi.array().items(
      Joi.objectId()
    ).optional(),
    text: Joi.string().required()
  };

  return Joi.validate(comment, schema);
}

// Validates a /PUT request
function validatePutComment(comment) {
  const schema = {
    parent: Joi.objectId().optional(),
    children: Joi.array().items(
      Joi.objectId()
    ).optional(),
    text: Joi.string().optional()
  };

  return Joi.validate(comment, schema);
}


module.exports.Comment = Comment;
module.exports.validatePostComment = validatePostComment;
module.exports.validatePutComment = validatePutComment;