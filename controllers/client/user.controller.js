const User = require("../../models/user.model");
const md5 = require('md5');
// [GET] : /user/register
module.exports.register = async (req, res) => {
    res.render("client/pages/user/login", {
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