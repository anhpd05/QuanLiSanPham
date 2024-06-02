const Product = require("../../models/product.model");

// [GET] : /products
module.exports.index =  async (req, res) => {
    const products = await Product.find({
        status : "active",
        deleted : false
    }).sort({position : "desc"});
    const newProduct = products.map( (item) => {
        item.priceNew = (item.price*(100-item.discountPercentage)/100).toFixed(1)
        return item
    })

    // console.log(products);

    res.render("client/pages/products/index.pug" ,{
        pageTitle : "Danh Sách Sản Phẩm",
        products : newProduct,
    });
}

// [GET] : /products/:slug
module.exports.detail =  async (req, res) => {
    try {
        const slug = req.params.slug
        console.log(slug);
        let find = {
            status : "active",
            slug : slug,
            deleted : false
        }
        const product = await Product.findOne(find)
        res.render("client/pages/products/detail.pug" ,{
            pageTitle: product.title,
            product: product
        });
    } catch (error) {
        req.flash("error", "Không tồn tại sản phẩm đó");
        res.redirect("/products");
    }

} 