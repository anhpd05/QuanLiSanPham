const Product = require("../../models/product.model");
const Cart = require("../../models/cart.model");
const productHelpers = require("../../helpers/product");

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

// [GET] /cart
module.exports.index = async (req, res) => {
    const cartId = req.cookies.cartId;
  
    const cart = await Cart.findOne({
      _id: cartId,
    })
  
  
    cart.totalPrice = 0;
  
    for (const item of cart.products) {
      const product = await Product.findOne({
        _id: item.product_id
      }).select("title price discountPercentage thumbnail slug");
  
      product.newPrice = productHelpers.newPriceProduct(product);
  
      item.totalPrice = item.quantity * product.newPrice;
  
      item.productInfor = product;
    }
  
    cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice, 0);
  
    res.render("client/pages/cart/index", {
      pageTitle: "Giỏ hàng",
      cartDetail: cart,
    });
  }