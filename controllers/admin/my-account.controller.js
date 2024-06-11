const Account = require("../../models/account.model");
const md5 = require("md5");

// [GET] : /admin/my-account

module.exports.index = (req, res) => {
    res.render("admin/pages/my-account/index.pug" , {
        pageTitle : "Trang thông tin cá nhân"
    }) 
}

// [GET] admin/my-account/edit
module.exports.edit = (req, res) => {
    res.render("admin/pages/my-account/edit.pug", {
      pageTitle: "Chỉnh sửa thông tin cá nhân",
    });
  }

// [PATCH] admin/my-account/edit
module.exports.editPatch = async (req, res) => {
    try {
      const id = res.locals.user.id;
      const emailExist = await Account.findOne({
        _id: { $ne: id },
        email: req.body.email,
        deleted: false,
      })
  
  
      if (emailExist) {
        req.flash("error", `Email ${req.body.email} đã tồn tại`);
        res.redirect("back");
        return;
      }
      if (req.body.password) {
        req.body.password = md5(req.body.password);
      } else {
        delete req.body.password;
      }
      console.log(req.body);
      await Account.updateOne({ _id: id }, req.body);
  
      req.flash("success", "Cập nhập thành công!");
    } catch (error) {
      req.flash("error", "Cập nhập thất bại!");
    }
  
    res.redirect(`back`);
  }
