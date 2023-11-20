const extrairJSON = async (req, res, next) => {
  if (req.body && req.body.json) {
    req.body = JSON.parse(req.body.json);
  }
  next();
};

module.exports = { extrairJSON };
