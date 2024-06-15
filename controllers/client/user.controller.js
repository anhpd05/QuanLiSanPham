const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot-password.model");
const md5 = require('md5');
const generateHelper = require("../../helpers/generate")
const sendMailHelper = require("../../helpers/sendMail")
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
    req.flash("success" , "Đăng kí tài khoản thành công!")
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

// [GET] /user/logout
module.exports.logout = (req, res) => {
    res.clearCookie("tokenUser");
    res.redirect("/user/login");
}

// [GET] /password/forgot
module.exports.forgotPassword = async (req, res) => {
    res.render("client/pages/user/forgot-password", {
        pagetitle: "Lấy lại mật khẩu"
    });
}

// [POST] /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({
        email : email,
        deleted : false,
    })
    if(!user) {
        req.flash('error', "Không tồn tại Email này!");
        res.redirect("back");
        return;
    }
    // Việc 1 : Tạo mã OTP , Lưu OTP , email yêu cầu vào collection(forgot-p..)
    const otp = generateHelper.generateRandomNumber(6);
    const objectForgotPassword = {
        email: email,
        otp: otp,
        expireAt: Date.now()
    }
    console.log(objectForgotPassword)
    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();

    //Việc 2 : Gửi mã  Otp cho email khách hàng (user)
    const subject = `Mã OTP xác minh lấy lại mật khẩu` 
    const html =  `
    Mã xác nhận OTP : <b>${otp}</b>.
    Tuyệt đối không cung cấp mã OTP cho bất kì ai để tránh kẻ gian đánh cắp tài khoản.
    Thời gian sử dụng trong 3 phút.
  `


    sendMailHelper.sendMail(email ,subject , html)


    res.redirect(`/user/password/otp?email=${email}`)
}


// [GET] /user/password/otp
module.exports.otpPassword = (req, res) => {
    const email = req.query.email;
  
    res.render("client/pages/user/otp-password", {
      pageTitle: "Nhập mã OTP",
      email: email,
    })
  }

// [POST] /user/password/otp
module.exports.otpPasswordPost = async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp
    console.log(otp,email)
    const result = await ForgotPassword.findOne({
        email : email ,
        otp : otp
    })
    console.log(result)
    if(!result) {
        req.flash("error" , "Mã OTP không hợp lệ!");
        res.redirect("back");
        return;
    }

    const user = await User.findOne({
        email : email,
    })
    res.cookie("tokenUser" , user.tokenUser)

    res.redirect(`/user/password/reset`)
}

// [GET] /user/password/reset
module.exports.resetPassword = (req, res) => {
  res.render("client/pages/user/reset-password", {
    pageTitle: "Đặt lại mật khẩu"
  })
}

// [POST]] /user/password/reset
module.exports.resetPasswordPost = async (req, res) => {
  const password = md5(req.body.password);
  const configPassword =  req.body.configPassword
  const tokenUser = req.cookies.tokenUser
  const user = await User.updateOne({
    tokenUser : tokenUser ,
  },{
    password : password
  })
  req.flash("success" , "Đổi lại mật khẩu thành công!")
  res.redirect("/")

}