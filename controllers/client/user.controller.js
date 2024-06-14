const User = require("../../models/user.model");
const md5 = require('md5');
// [GET] : /user/register
module.exports.register = async (req, res) => {
    res.render("client/pages/user/register", {
        pagetitle: "Đăng kí"
    });
}

// [POST] : /user/register
module.exports.registerPost = async (req, res) => {
    req.body.password = md5(req.body.password);

    const existEmail = await User.findOne({
        deleted : false ,
        email : req.body.eamil
    })
    if(existEmail) {
        req.flash('error', `Email ${req.body.email} đã tồn tại!`);
        res.redirect("back");
        return;
    }
    
    const user = new User(req.body)
    await user.save();

    // console.log(user)

    res.cookie("tokenUser" , user.tokenUser)

    res.redirect("/"); ;
}

// [GET] /user/login
module.exports.login = (req, res) => {

    res.render("client/pages/user/login", {
      pagetitle: "Đăng nhập"
    });
  }

  // [GET] /user/login
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(password)
  
    const user = await User.findOne({
      email: email,
    });
    if (!user) {
      req.flash("error", "Email này không tồn tại!");
      res.redirect("back");
      return;
    }
    if (md5(password) != user.password) {
      req.flash("error", "Mật khẩu sai vui lòng nhập lại!");
      res.redirect("back");
      return;
    }
  
    if (user.status == "inactive") {
      req.flash("error", "Tài khoản này đã bị khoá vui lòng liên hệ admin!");
      res.redirect("back");
      return;
    }
  
    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/")
  }

