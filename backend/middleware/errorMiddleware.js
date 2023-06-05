const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  // Sometimes we get a 200 status code even when there is an error
  // So we set the status code to 500 if it is not already set
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  // if mongoose is throwing an error, we want to display the error message
  if (err.name === 'CastError' || err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }
  res.json({
    // We want to display the error message only in development mode
    message: err.message,
    // We want to display the stack trace only in development mode
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };
