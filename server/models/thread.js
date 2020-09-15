const Joi = require('joi');
const mongoose = require('mongoose');
Joi.objectId = require('joi-objectid')(Joi);

const threadSchema = new mongoose.Schema({
  thread: { type: String, required: true },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

const Thread = mongoose.model("Thread", threadSchema);

// Validates a /POST request
function validatePostThread(thread) {
  const schema = {
    thread: Joi.string().required(),
    parent: Joi.objectId().required(),
    children: Joi.array().items(
      Joi.objectId()
    ).optional()
  };

  return Joi.validate(thread, schema);
}

// Validates a /PUT request
function validatePutThread(thread) {
  const schema = {
    thread: Joi.string().required(),
    parent: Joi.objectId().required(),
    children: Joi.array().items(
      Joi.objectId()
    ).optional()
  };

  return Joi.validate(thread, schema);
}


module.exports.Thread = Thread;
module.exports.validatePostThread = validatePostThread;
module.exports.validatePutThread = validatePutThread;