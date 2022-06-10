const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // busca do header que será armazenado o token
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ auth: false, message: 'Não foi encontrado o header x-access-token' });

  // no lugar do testeJaque podemos pegar do arquivo .env
  jwt.verify(token, 'testeJaque', function (err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Falha ao atenticar o Token' });

    // se tudo estiver ok, salva no request para uso posterior
    console.log(decoded)
    req.userId = decoded.user._id;
    next();
  });
}

