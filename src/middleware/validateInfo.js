export default function validateInfo(req, res, next) {
  const { username, password } = req.body;
  const data = { success: false, message: 'Missing Creditionals' };

  if (req.path === '/register' && ![username, password].every(Boolean)) {
    return res.status(401).send(data);
  } else if (req.path === '/login' && ![username, password].every(Boolean)) {
    return res.status(401).send(data);
  }

  next();
}
