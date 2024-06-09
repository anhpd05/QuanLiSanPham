const systemConfig = require("../../config/system");
const authMiddleware = require("../../middlewares/admin/auth.middleware");

const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./product.route");
const productCategoryRoutes = require("./products-category.route");
const rolesRouter = require("./role.route");
const accountsRouter = require("./account.route");
const authRouter = require("./auth.route");

// tạo cái biến /admin để sang bên config để sau sửa cho dễ

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin
    
    app.use( PATH_ADMIN + '/dashboard' ,authMiddleware.requireAuth ,dashboardRoutes);

    app.use( PATH_ADMIN + '/products',authMiddleware.requireAuth , productRoutes);

    app.use( PATH_ADMIN + '/products-category' ,authMiddleware.requireAuth, productCategoryRoutes );

    app.use( PATH_ADMIN + '/roles' ,authMiddleware.requireAuth, rolesRouter)

    app.use( PATH_ADMIN + '/accounts' ,authMiddleware.requireAuth, accountsRouter)

    app.use( PATH_ADMIN + '/auth' , authRouter)
}