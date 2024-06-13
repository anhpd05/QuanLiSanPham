const Product = require("../../models/product.model");
const productsNewPriceHelper = require("../../helpers/product.priceNew")

// [GET] : /
module.exports.index = async (req, res) => {
// Lấy ra sản phẩm nổi bật
    const productsFeatured  = await Product.find({
        deleted : false ,
        status : "active",
        featured : "1"
    }).limit(3).sort({position : "asc"})
    const newProduct = productsNewPriceHelper.priceNew(productsFeatured);
    console.log(newProduct)
//Hết Lấy ra sản phẩm nổi bật
    res.render("client/pages/home/index.pug" , {
        pageTitle : "Trang chủ",
        productsFeatured : newProduct
    }) 
}

