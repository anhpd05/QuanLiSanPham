const Product = require("../../models/product.model");
const productsNewPriceHelper = require("../../helpers/product.priceNew")
const ProductCategory = require("../../models/product-category.model");
const productCategoryHelperes = require("../../helpers/product-category");

// [GET] : /products
module.exports.index =  async (req, res) => {
    const products = await Product.find({
        status : "active",
        deleted : false
    }).sort({position : "desc"});
    const newProduct = products.map( (item) => {
        item.priceNew = (item.price*(100-item.discountPercentage)/100).toFixed(0)
        return item
    })

    // console.log(products);

    res.render("client/pages/products/index.pug" ,{
        pageTitle : "Danh Sách Sản Phẩm",
        products : newProduct,
    });
}

// [GET] : /products/:slugDetail
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
        if(product.product_category_id) {
            const category = await ProductCategory.findOne({
                _id: product.product_category_id,
                deleted: false,
                status: "active"
            })
      
            product.category = category;
          }
        console.log(product.category.slug)
        
        const newPrice = (product.price * (100 - product.discountPercentage) / 100).toFixed(0);
        product.priceNew = newPrice
        
        res.render("client/pages/products/detail.pug" ,{
            pageTitle: product.title,
            product: product
        });
    } catch (error) {
        req.flash("error", "Không tồn tại sản phẩm đó");
        res.redirect("/products");
    }

} 


// [GET] : /products/:slugCategory
module.exports.category =  async (req, res) => {
    const category = await ProductCategory.findOne({
        slug : req.params.slugCategory,
        deleted : false ,
        status : "active"
    })

    

    const listSubCategory = await productCategoryHelperes.getSubCategory(category.id);

   const listSubCategoryID = listSubCategory.map((item) => {
        return item.id
   })

    const products = await Product.find({
        product_category_id : { $in: [category.id ,...listSubCategoryID ] },
        deleted : false,
        status : "active"
    })

    const newProduct = products.map( (item) => {
        item.priceNew = (item.price*(100-item.discountPercentage)/100).toFixed(0)
        return item
    })
    // console.log(products)
    res.render("client/pages/products/index.pug" ,{
        pageTitle : category.title ,
        products : newProduct,
        
    });

} 