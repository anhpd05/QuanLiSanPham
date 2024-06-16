const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");

const productHelpers = require("../../helpers/product");
const Order = require("../../models/order.model");

// [GET] /checkout
module.exports.index = async (req, res) => {
    const cartId = req.cookies.cartId;
  
    const cart = await Cart.findOne({
        _id: cartId,
    })
  
    cart.totalPrice = 0;
  
    for (const item of cart.products) {
        const product = await Product.findOne({
            _id: item.product_id
        }).select("title price discountPercentage thumbnail");
  
        product.newPrice = productHelpers.newPriceProduct(product);
  
        item.productInfor = product;
  
        item.totalPrice = product.newPrice * item.quantity;
  
        cart.totalPrice += item.totalPrice;
    }
  
    res.render("client/pages/checkout/index", {
        pageTitle: "Thanh toán",
        cartDetail: cart,
    })
  }

// [GET] /checkout/order
module.exports.orderPost = async (req, res) => {
    const cartId = req.cookies.cartId;
    let userInfo = req.body;
    const cart = await Cart.findOne({
        _id : cartId
    })
    let products = [] ;
    for (const product of cart.products) {
        const  ObjectProduct = {
            product_id : product.product_id ,
            quantity : product.quantity,
            price : 0 ,
            discountPercentage : 0,
        } 
        const ProductInfo = await Product.findOne({
            _id : product.product_id
        })
        ObjectProduct.price = ProductInfo.price ;
        ObjectProduct.discountPercentage =  ProductInfo.discountPercentage
        products.push(ObjectProduct)
    }
    // console.log(products)

    const ObjectOrder = {
        cart_id : cartId ,
        userInfo : userInfo ,
        products : products
    }
    const order = new Order(ObjectOrder);
    await order.save();

    await Cart.updateOne({
        _id : cartId
    } , {
        products : []
    })
    res.redirect(`/checkout/success/${order.id}`)
}


//[GET] /checkout/success/:orderId
module.exports.success = async (req, res) => {
    const order = await Order.findOne({
        _id : req.params.orderId
    })
    for (const product of order.products) {
        const productInfo = await Product.findOne({
            _id : product.product_id 
        })

        product.productInfo = productInfo

        product.priceNew = productHelpers.newPriceProduct(product)

        product.totalPrice = product.priceNew * product.quantity
    }
    order.totalPrice = order.products.reduce((sum , item) => sum + item.totalPrice , 0)
    // console.log(order)
    res.render("client/pages/checkout/success", {
      pageTitle: "Đặt hàng thành công",
      order : order 
    })
  }