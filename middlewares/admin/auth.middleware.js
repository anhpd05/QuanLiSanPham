const systemConfig = require("../../config/system");
const Account = require("../../models/account.model");

module.exports.requireAuth = async (req, res, next) => {
  const token = req.cookies.token;
  const user = await Account.findOne({ token: token });
  if (!user) {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    return;
  }
  next();
}