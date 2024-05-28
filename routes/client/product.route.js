const express = require('express');
const router = express.Router();
const controller = require("../../controllers/client/product.controller")

router.get("/" , controller.index)


// router.get('/', );
// // Chú ý : ko cần thêm /products vì bên file index.routes có rồi 
// //        => NÓ SẼ NỐI CHUỖI NHAU
// router.get('/edit', async (req, res) => {
//     res.render("client/pages/products/index.pug") 
// });

// router.get('/create', async (req, res) => {
//     res.render("client/pages/products/index.pug") 
// });

module.exports = router;