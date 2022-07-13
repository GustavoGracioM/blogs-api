const errors = {
  throwInformationInvalidError: 400,
  throwInvalidFieldsError: 400,
};

const errorHandlerMiddleware = ({ name, message }, _req, res, _next) => {
  const status = errors[name];
  if (!status) return res.sendStatus(500);
  res.status(status).json({ message });
};

module.exports = errorHandlerMiddleware;