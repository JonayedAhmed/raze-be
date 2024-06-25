const createError = require('http-errors');

// 404 not found handler
const notFoundHandler = (req, res, next) => {
    next(createError(404, 'Your requested content was not found!'))
}

// default error handler
const errorHandler = (err, req, res, next) => {
    res.json({ message: err.message });
}

module.exports = {
    notFoundHandler,
    errorHandler
}