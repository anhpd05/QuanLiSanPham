const Role = require("../../models/role.model");
const Account = require("../../models/account.model");
const systemConfig = require("../../config/system");
const md5 = require('md5');
// [GET] :/admin/auth/login

module.exports.login = async (req, res) => {
    res.render("admin/pages/auth/login.pug" , {
        pageTitle : "Đăng nhập"
    }) 
}

// [POST] :/admin/auth/login

module.exports.loginPost = async (req, res) => {
    const email = req.body.email ;
    const password = req.body.password ;

    const user = await Account.findOne({email : email});
    if(!user) {
        req.flash("error" , "Không tồn tại Email này!");
        res.redirect("back");
        return;
    }
    if(md5(password) != user.password){
        req.flash("error" , "Mật khẩu không chính xác!");
        res.redirect("back");
        return;
    }

    if(user.status == "inactive"){
        req.flash("error" , "Tài khoản cảu bạn đã bị khóa do vi phạm!");
        res.redirect("back");
        return;
    }
    // console.log(md5(password));
    res.cookie("token" , user.token)
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
    
}

// [GET] :/admin/auth/logout

module.exports.logout = async (req, res) => {
    res.clearCookie("token");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
}