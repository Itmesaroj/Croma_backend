const jwt = require("jsonwebtoken");
const BlackListModel = require("../Model/blackList");
const dotenv=require('dotenv').config();
const JWT_SECRET=process.env.JWT_SECRET
async function middleToken(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(400).send({ "msg": "Token related error" });
  }

  const logoutdata = await BlackListModel.findOne({ "token": token });
  if (logoutdata) {
    return res.status(400).send({ "msg": "login first" });
  }

  jwt.verify(token, JWT_SECRET, (error, decode) => {
    if (error) {
      return res.status(401).send({ "msg": error.message });
    }
    const email = decode.email;
    req.body.email = email;  
    next();
  });
}

module.exports = middleToken;
