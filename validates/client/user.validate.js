module.exports.registerPost = (req, res, next) => {
    if (!req.body.fullName) {
      req.flash('error', "Vui Lòng nhập Họ và Tên!");
      res.redirect("back");
      return;
    }
  
    if (!req.body.email) {
      req.flash('error', "Vui Lòng nhập email!");
      res.redirect("back");
      return;
    }
  
    if (!req.body.password) {
      req.flash('error', "Vui Lòng nhập mật khẩu!");
      res.redirect("back");
      return;
    }

    if (req.body.password.length < 6) {
        req.flash('error', "Vui Lòng nhập mật khẩu trên 6 kí tự!");
        res.redirect("back");
        return;
      }
  
    next();
  }

  module.exports.loginPost = (req, res, next) => {
  
    if (!req.body.email) {
      req.flash('error', "Vui Lòng nhập email!");
      res.redirect("back");
      return;
    }
  
    if (!req.body.password) {
      req.flash('error', "Vui Lòng nhập mật khẩu!");
      res.redirect("back");
      return;
    }

    if (req.body.password.length < 6) {
        req.flash('error', "Vui Lòng nhập mật khẩu trên 6 kí tự!");
        res.redirect("back");
        return;
    }
  
    next();
  }

