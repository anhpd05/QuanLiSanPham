const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");
const categoryMiddleware = require("../../middlewares/client/category.middleware")
const cartMiddleware = require("../../middlewares/client/cart.middleware")
const searchRouter = require("./search.route");
const cartRouter = require("./cart.route");
module.exports = (app) => {

    app.use(categoryMiddleware.category );
    
    app.use(cartMiddleware.cart );

    app.use('/' , homeRoutes);
    
    app.use('/products', productRoutes);
    
    app.use('/search' , searchRouter)

    app.use('/cart' , cartRouter)
    
}