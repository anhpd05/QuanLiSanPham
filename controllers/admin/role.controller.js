const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");

// [GET] admin/roles
module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  };

  const records = await Role.find(find);
  res.render("./admin/pages/roles/index", {
    pageTitle: "Nhóm quyền",
    records: records,
  });
}

// [GET] admin/roles/create
module.exports.create = (req, res) => {
    res.render("./admin/pages/roles/create", {
      pageTitle: "Tạo nhóm quyền"
    });
  } 


// [POST] admin/roles/create
module.exports.createPost = async (req, res) => {
    const record = new Role(req.body);
    record.save();
  
    req.flash("success", "Tạo nhóm quyền thành công");
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }

// [GET] admin/roles/edit/:id
module.exports.edit = async (req, res) => {
    try {
      const id = req.params.id;
  
      const record = await Role.findOne({ _id: id });
  
      res.render("./admin/pages/roles/edit", {
        pageTitle: "Chỉnh sửa nhóm quyền",
        record: record,
      });
    } catch (error) {
      req.flash("error", "Lấy dữ liệu thất bại");
      res.redirect(`${systemConfig.prefixAdmin}/roles`);
    }
  }

// [PATCH] admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
  
    await Role.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhập thành công");
    res.redirect("back");
  }

// [DELETE] admin/roles/delete/:id 
module.exports.delete = async (req, res) => {
    const id = req.params.id
  
    await Role.updateOne({ _id: id }, { deleted: true });
    req.flash("success", "Xoá quyền thành công!");
    res.redirect("back");
  }

// [GET] admin/roles/premission
module.exports.premissions = async (req, res) => {
  const find = {
    deleted: false,
  }

  const records = await Role.find(find);
  res.render("./admin/pages/roles/premission", {
    pageTitle: "Chỉnh sửa nhóm quyền",
    records: records,
  });
}

// [PATCH] admin/roles/premission
module.exports.premissionsPatch = async (req, res) => {
  try {
    const permissions = JSON.parse(req.body.permissions);
    for (const item of permissions) {
      await Role.updateOne({_id : item.id} , {permissions : item.permission});
    }
    
    req.flash("success", "Cập nhật phân quyền thành công!");
    res.redirect("back");
  } catch (error) {
    req.flash("error", "Cập nhật phân quyền thất bại!");
    res.redirect("back");
  }

}