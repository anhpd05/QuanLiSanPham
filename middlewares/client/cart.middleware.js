const Cart = require("../../models/cart.model");

module.exports.cart = async (req, res , next) => {
    console.log(req.cookies.cartId)
    if(!req.cookies.cartId) {
        const cart = new Cart();
        await cart.save();

        const expiredCookie = 1000 * 60 * 60 * 24 * 365
        res.cookie("cartId", cart.id, { expires: new Date(Date.now() + expiredCookie) });
    } else {
        
    }
    next()
}