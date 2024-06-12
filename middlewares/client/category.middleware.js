const ProductCategory = require("../../models/product-category.model");
const createTreeHelpers = require("../../helpers/createTree");

module.exports.category = async (req, res , next) => {
    const productCategory = await ProductCategory.find({
        deleted : false
    });

    const newProductCategory = createTreeHelpers.tree(productCategory);

    res.locals.layoutHeaderProductCategory = newProductCategory;

    next()
}