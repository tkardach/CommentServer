function errorResponse(message) {
  if (message instanceof Error) {
    return {
      message: `${message.stack || message}`
    }
  } else {
    return {
      message: message
    }
  }
}

module.exports.errorResponse = errorResponse;