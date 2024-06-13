const Product = require("../../models/product.model");
const Cart = require("../../models/cart.model");

// [POST] : /cart/add/6669fb01861b8b1bf9123a73
module.exports.addPost = async (req, res) => {
    const cartId = req.cookies.cartId ;
    const productId = req.params.productId
    const quantity = parseInt(req.body.quantity)
    const product = Product.find({
        deleted : false ,
        status : "active" ,

    })

    const cart = await Cart.findOne({
        _id : cartId
    })
    const existProductInCart = cart.products.find( item => item.product_id == productId)

    if(existProductInCart){
        // console.log(" cập nhật quantity")
        const newQuantity = quantity + existProductInCart.quantity ;
        console.log(newQuantity);
        await Cart.updateOne({
            _id : cartId ,
            'products.product_id' : productId,

        } , {
            'products.$.quantity' : newQuantity

        } )

    } else {
        let ObjectCart = {
            product_id : productId,
            quantity : quantity

        }
        await Cart.updateOne({
            _id : cartId
        } , { $push  : { products : ObjectCart }})
        req.flash("success" , "Thêm sản phẩm vào giỏ hàng thành công ! ")
    }
    // console.log(cartId);
    // console.log(productId);
    // console.log(quantity);


    res.redirect("back");
}