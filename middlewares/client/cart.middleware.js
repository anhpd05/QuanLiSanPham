// const Cart = require("../../models/cart.model");

// module.exports.cart = async (req, res , next) => {
//     console.log(req.cookies.cartId)
//     if(!req.cookies.cartId) {
//         const cart = new Cart();
//         await cart.save();

//         const expiredCookie = 1000 * 60 * 60 * 24 * 365
//         res.cookie("cartId", cart.id, { expires: new Date(Date.now() + expiredCookie) });
//     } else {
//         // khi đã có giỏ hàng 
//         const cart = await Cart.findOne({
//             _id : req.cookies.cartId,

//         })
//         cart.totalQuantity = cart.products ? cart.products.reduce((sum, item) => sum + item.quantity, 0) : 0;
//         // console.log(cart)
//         res.locals.miniCart = cart;
//     }
//     next()
// }
const Cart = require("../../models/cart.model");

module.exports.cart = async (req, res, next) => {

  if (!req.cookies.cartId) {
    const cart = new Cart();
    await cart.save();

    const expiredCookie = 3600 * 24 * 365 * 1000

    res.cookie("cartId", cart.id, { expires: new Date(Date.now() + expiredCookie) });
  } else {
    const cart = await Cart.findOne({ _id: req.cookies.cartId });
    cart.totalQuantity = cart.products ? cart.products.reduce((sum, item) => sum + item.quantity, 0) : 0;
    console.log(cart)
    res.locals.miniCart = cart;
  }


  next();
}