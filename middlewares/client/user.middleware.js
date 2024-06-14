const User = require("../../models/user.model");

module.exports.inFoUser = async (req, res, next) => {
  const tokenUser = req.cookies.tokenUser;
  if(tokenUser) {
    const user = await User.findOne({
        tokenUser: tokenUser,
        deleted : false
      }).select("-password");
        if (user) {
            res.locals.user = user;
        }
    
  }

  next();
}