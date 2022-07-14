const errors = {
  throwInvalidFieldsError: 400,
  throwNotFoundToken: 401,
  throwNotFound: 404,
  throwEmailIsRegistered: 409,
};

const errorHandlerMiddleware = ({ name, message }, _req, res, _next) => {
  const status = errors[name];
  if (!status) return res.sendStatus(500);
  res.status(status).json({ message });
};

module.exports = errorHandlerMiddleware;