const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./product.route");
const productCategoryRoutes = require("./products-category.route");
const systemConfig = require("../../config/system");
const rolesRouter = require("./role.route");
const accountsRouter = require("./account.route");

// tạo cái biến /admin để sang bên config để sau sửa cho dễ

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin
    
    app.use( PATH_ADMIN + '/dashboard' , dashboardRoutes);

    app.use( PATH_ADMIN + '/products' , productRoutes);

    app.use( PATH_ADMIN + '/products-category' , productCategoryRoutes );

    app.use( PATH_ADMIN + '/roles' , rolesRouter)

    app.use( PATH_ADMIN + '/accounts' , accountsRouter)
}