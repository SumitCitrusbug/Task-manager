const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.render("login");
  }

  try {
    const decoded = jwt.verify(token, process.env.KEY);
    req.user = decoded;
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.render("login");
    }
    req.user = user;
    next();
  } catch (error) {
    return res.render("login");
  }
};

module.exports = auth;
