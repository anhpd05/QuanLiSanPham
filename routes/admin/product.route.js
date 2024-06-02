const express = require('express');
const router = express.Router();

// Print Img
const multer = require('multer'); // thư viện hỗ trợ up ảnh
const storageMulter = require("../../helpers/storageMulter");
const upload = multer({ storage: storageMulter() });
//End Print Img

const validate = require("../../validates/admin/product.validate");

const controller = require("../../controllers/admin/product.controller");
router.get('/', controller.index);

router.patch('/change-status/:status/:id', controller.changeStatus);

router.patch('/change-multi/', controller.changeMulti);

router.delete('/delete/:id', controller.deleteItem);

router.get('/create', controller.create);

router.post('/create',
    upload.single('thumbnail') ,
    validate.createCheck,
    controller.createPost);


module.exports = router;