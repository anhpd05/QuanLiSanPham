const Product = require("../../models/product.model");
// const productsHelpers = require("../../helpers/product");

// [GET] /search
module.exports.index = async (req, res) => {
    var newProduct = [];
    const keyword = req.query.keyword; 
    const keywordRegex = new RegExp(keyword , "i")
    if(keyword) {
        const products = await Product.find({
            status : "active",
            deleted : false ,
            title : keywordRegex
        })
        // console.log(products);
        newProduct = products.map( (item) => {
            item.priceNew = (item.price*(100-item.discountPercentage)/100).toFixed(0)
            return item
        })
    }
    
    res.render("client/pages/search/index", {
        pageTitle: "Tìm kiếm",
        keyword: keyword,
        products: newProduct
      })

}
