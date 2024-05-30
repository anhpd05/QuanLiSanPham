const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./product.route")
const systemConfig = require("../../config/system");

// tạo cái biến /admin để sang bên config để sau sửa cho dễ

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin
    
    app.use( PATH_ADMIN + '/dashboard' , dashboardRoutes);

    app.use( PATH_ADMIN + '/products' , productRoutes);
    app.use(PATH_ADMIN + '/undefined/' + '/products', productRoutes)
}