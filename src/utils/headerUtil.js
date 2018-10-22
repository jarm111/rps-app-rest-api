exports.processAuthHeader = authHeader => {
  if (!authHeader) return null;
  const parts = authHeader.split(' ');
  if (parts.length !== 2) return null;
  const scheme = parts[0];
  const credentials = parts[1];
  if (!/^Bearer$/i.test(scheme)) return null;
  return credentials;
};
