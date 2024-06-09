module.exports.loginPost = (req, res, next) => {
    if (!req.body.email) {
      req.flash('error', "Vui Lòng nhập Email!");
      res.redirect("back");
      return;
    }
  
    if (!req.body.password) {
      req.flash('error', "Vui Lòng nhập mật khẩu!");
      res.redirect("back");
      return;
    }

    next();
  }

  