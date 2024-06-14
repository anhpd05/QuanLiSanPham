const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");
const categoryMiddleware = require("../../middlewares/client/category.middleware")
const cartMiddleware = require("../../middlewares/client/cart.middleware")
const searchRouter = require("./search.route");
const cartRouter = require("./cart.route");
const checkoutRouter = require("./checkout.route");
const userRouter = require("./user.route");
module.exports = (app) => {

    app.use(categoryMiddleware.category );
    
    app.use(cartMiddleware.cartId );

    app.use('/' , homeRoutes);
    
    app.use('/products', productRoutes);
    
    app.use('/search' , searchRouter)

    app.use('/cart' , cartRouter)

    app.use('/checkout' , checkoutRouter)

    app.use('/user' , userRouter)
    
}