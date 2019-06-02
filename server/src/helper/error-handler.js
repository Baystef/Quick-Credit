const badRequestResponse = (req, res, error, status = 400) => res.status(400).json({
  status,
  error: error || 'Bad request',
});

const unauthorizedResponse = (req, res, error, status = 401) => res.status(401).json({
  status,
  error: error || 'Unauthorized',
});

const forbiddenResponse = (req, res, error, status = 403) => res.status(403).json({
  status,
  error: error || 'Forbidden',
});

const nullResponse = (req, res, error, status = 404) => res.status(404).json({
  status,
  error: error || 'NOT_FOUND',
});

const conflictResponse = (req, res, error, status = 409) => res.status(409).json({
  status,
  error: error || 'Conflict',
});

export {
  badRequestResponse, unauthorizedResponse, forbiddenResponse, nullResponse, conflictResponse,
};
