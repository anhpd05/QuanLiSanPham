const Role = require("../../models/role.model");
const Account = require("../../models/account.model");
const systemConfig = require("../../config/system");
const filterStatusHelpers = require("../../helpers/filter-status");
const md5 = require('md5');



// [GET] admin/accounts
module.exports.index = async (req, res) => {
    const find = {
      deleted: false
    }
  
    const records = await Account.find(find).select("-password -token")
    for (const record of records) {
        const role = await Role.findOne({
            deleted : false,
            _id: record.role_id,
        })
        record.role = role;
    }
  // Lấy ra đúng Phân quyền
  
    res.render("admin/pages/accounts/index", {
      pageTitle: "Danh sách tài khoản",
      records: records,
    })
  }


// [GET] admin/accounts/create
module.exports.create = async (req, res) => {

    const roles = await Role.find({
        deleted : false ,
    })
  
    res.render("admin/pages/accounts/create", {
      pageTitle: "Tạo tài khoản",
      roles: roles,
    })
  }

// [POST] admin/accounts/create
module.exports.createPost = async (req, res) => {

    const emailExist = await Account.findOne({
        deleted : false,
        email : req.body.email
    })
    // Check xem email có tồn tại không 

    if(emailExist) {
        req.flash("error", `Email ${req.body.email} đã tồn tại!`);
        res.redirect("back");
    }else {
        req.body.password = md5(req.body.password);
        // Mã hóa password trc khi save
      
        const account = new Account(req.body)
        await account.save()
        req.flash("success", `Tạo tài khoản thành công!`);
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    
    }

  }

//[GET] admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    const find = {
      _id: id,
      deleted: false,
    }
    try {
        const data = await Account.findOne(find);
  
        const roles = await Role.find({ deleted: false });
        res.render("admin/pages/accounts/edit", {
            pageTitle: "Chỉnh sửa tài khoản",
            data: data,
            roles: roles,
          });
    } catch (error) {
        req.flash("error" , "Không tồn tại tài khoản này!");
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    }

  };

//[PATCH] admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
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
    // console.log(req.body);
    await Account.updateOne({ _id: id }, req.body);

    req.flash("success", "Cập nhập thành công!");
  } catch (error) {
    req.flash("error", "Cập nhập thất bại!");
  }

  res.redirect(`back`);
}

// [DELETE] /admin/accounts/delete/:id
module.exports.delete = async (req, res) => {
  const id = req.params.id;
  // console.log(id);

  // await Product.deleteOne({ _id: id });
  await Account.updateOne({_id:id},{
      deleted : true,
      deletedAt: new Date
  })
  req.flash('success', `Đã xoá thành công tài khoản!`);
  res.redirect('back');
}