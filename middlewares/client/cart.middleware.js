const Cart = require("../../models/cart.model");

module.exports.cartId = async (req, res , next) => {
    if(!req.cookies.cartId) {
        const cart = new Cart();
        await cart.save();
        // console.log(cart)
        
        const expiredCookie = 1000 * 60 * 60 * 24 * 365
        res.cookie("cartId", cart.id, { expires: new Date(Date.now() + expiredCookie) });
    } else {
        // khi đã có giỏ hàng 
        const cart = await Cart.findOne({ _id: req.cookies.cartId });
        cart.totalQuantity = cart.products ?  cart.products.reduce((sum, item) => sum + item.quantity, 0) : 0;

        res.locals.miniCart = cart;
    }
    next()
}