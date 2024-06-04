const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");


// [GET] : /admin/products-catagory
module.exports.index = async (req, res) => {
    let find = {
        deleted : false
    }
    const records = await ProductCategory.find(find);
    res.render("admin/pages/products-category/index.pug" , {
        pageTitle : "Danh mục sản phẩm ",
        records : records,
    }) 
} 

// [GET] : /admin/products-catagory
module.exports.create = async (req, res) => {

    res.render("admin/pages/products-category/create.pug" , {
        pageTitle : "Tạo danh mục sản phẩm ",
    }) 
} 

// [POST] : /admin/products-category/create
module.exports.createPost = async (req, res) => {
    try {
        if (req.body.position == "") {
            const countProducts = await ProductCategory.countDocuments();
            req.body.position = countProducts + 1;
        } else {
            req.body.position = parseInt(req.body.position);
        }

        const product = new ProductCategory(req.body);
        await product.save();
        req.flash("success", " Tạo danh mục sản phẩm thành công!");
        res.redirect(`${systemConfig.prefixAdmin}/products-category`);
        // console.log(req.body);
    }
        catch (error) {
        req.flash("error", "Tạo danh mục sản phẩm thất bại");
        res.redirect(`${systemConfig.prefixAdmin}/products-category`);
      }
} 