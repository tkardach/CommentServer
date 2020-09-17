const Joi = require('joi');
const mongoose = require('mongoose');
Joi.objectId = require('joi-objectid')(Joi);

const COMMENT_MAX = 256;
const COMMENT_MIN = 1;

const commentSchema = new mongoose.Schema({
  thread: { type: String, required: true },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  text: {
    type: String, 
    required: true,
    minLength: COMMENT_MIN,
    maxlength: COMMENT_MAX
  }
},
{ timestamps: true });

var autoPopulateChildren = function(next) {
  this.populate('children');
  next();
}

commentSchema
  .pre('find', autoPopulateChildren)

commentSchema.statics.getThread = function(thread) {
  return this
    .find()
    .where('thread').eq(thread)
    .where('parent').eq(null);
}

const Comment = mongoose.model("Comment", commentSchema);

// Validates a /POST request
function validatePostComment(comment) {
  const schema = {
    parent: Joi.alternatives(Joi.objectId().optional(), Joi.empty()).optional(),
    text: Joi.string().min(COMMENT_MIN).max(COMMENT_MAX).required()
  };

  return Joi.validate(comment, schema);
}

// Validates a /PUT request
function validatePutComment(comment) {
  const schema = {
    text: Joi.string().min(COMMENT_MIN).max(COMMENT_MAX).required()
  };

  return Joi.validate(comment, schema);
}


module.exports.Comment = Comment;
module.exports.validatePostComment = validatePostComment;
module.exports.validatePutComment = validatePutComment;