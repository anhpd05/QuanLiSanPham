// [GET] : /products
const Product = require("../../models/product.model");

module.exports.index =  async (req, res) => {
    const products = await Product.find({
        status : "active",
        deleted : false
    });
    const newProduct = products.map( (item) => {
        item.priceNew = (item.price*(100-item.discountPercentage)/100).toFixed(1)
        return item
    })

    console.log(products);

    res.render("client/pages/products/index.pug" ,{
        pageTitle : "Danh Sách Sản Phẩm",
        products : newProduct,
    });
}