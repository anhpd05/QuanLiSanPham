const express = require('express');
const router = express.Router();
const controller = require("../../controllers/client/home.controller");

router.get('/', controller.index);
// .index vì bên controller là mo..ex..index ( thay index bằng j cx đc thì 
    // ở đây phải chấm cái đó )

module.exports = router