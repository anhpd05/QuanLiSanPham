const Product = require("../../models/product.model");
const productsNewPriceHelper = require("../../helpers/product.priceNew")

// [GET] : /
module.exports.index = async (req, res) => {

// Lấy ra sản phẩm nổi bật
    const productsFeatured  = await Product.find({
        deleted : false ,
        status : "active",
        featured : "1"
    }).limit(3).sort({position : "desc"})
    const newProduct = productsNewPriceHelper.priceNew(productsFeatured);
    // console.log(newProduct)

//Hết Lấy ra sản phẩm nổi bật

// Hiển thị danh sách sản phẩm mới nhất
const productNew = await Product.find({
    deleted : false ,
    status : 'active',
}).limit(3).sort({ position : "desc"})
const newProductNew = productsNewPriceHelper.priceNew(productNew)

// Hết hiển thị danh sách sản phẩm mới nhất

    res.render("client/pages/home/index.pug" , {
        pageTitle : "Trang chủ",
        productsFeatured : newProduct,
        productNew : newProductNew
    }) 
}

