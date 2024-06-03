const express = require('express');
const multer = require('multer'); // thư viện hỗ trợ up ảnh



const router = express.Router();

// Print Img
// const storageMulter = require("../../helpers/storageMulter"); 
//End Print Img

// // Cloudinary
// cloudinary.config({
//     cloud_name: "dtoum0rho",
//     api_key: "739726381273748",
//     api_secret: "lc3-TzbqrCa7T1d0CJ8OXmYwsmU"
//     });
// // End Cloudinary


const upload = multer();


const validate = require("../../validates/admin/product.validate");

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const controller = require("../../controllers/admin/product.controller");
router.get('/', controller.index);

router.patch('/change-status/:status/:id', controller.changeStatus);

router.patch('/change-multi/', controller.changeMulti);

router.delete('/delete/:id', controller.deleteItem);

router.get('/create', controller.create);

router.post('/create',
    upload.single('thumbnail'),
    uploadCloud.upload, 
    validate.createCheck,
    controller.createPost);

router.get('/edit/:id', controller.edit);

router.patch('/edit/:id',
    upload.single('thumbnail') ,
    validate.createCheck ,
    controller.editPatch);

router.get('/detail/:id', controller.detail);
    

module.exports = router;