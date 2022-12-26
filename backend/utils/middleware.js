const logger = require('./logger');
const { decodeJwt } = require('../utils/jwt');

const morgan = require('morgan');
const requestLogger = morgan((tokens, req, res) => {
  const hasBody = Object.keys(req.body).length;
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
    hasBody ? JSON.stringify(req.body) : null,
  ].join(' ');
});

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, _request, response, next) => {
  logger.error(error.message);
  logger.error(error.name);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    });
  }

  next(error);
};

const tokenExtractor = (request, _response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7); // 7 is to extract toke string after 'bearer'
  }
  next();
};

const verifyToken = async (request, response, next) => {
  if (!request.token)
    return response.status(403).json({ error: 'No token found' });

  try {
    const user = decodeJwt(request.token);
    logger.info('user', user);
    request.uid = user.uid;
    next();
  } catch (error) {
    logger.error(`Invalid token: ${request.token}`);
    logger.error(error);
    return response.status(498).json({
      error: 'Invalid token',
    });
  }
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  verifyToken,
};
