const express = require('express');
const router = express.Router();

const controller = require("../../controllers/admin/role.controller");
router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', controller.createPost);

router.get('/edit/:id', controller.edit);

router.patch('/edit/:id', controller.editPatch);

router.delete('/delete/:id', controller.delete);

router.get('/premissions', controller.premissions);

router.patch('/premissions', controller.premissionsPatch);

module.exports = router;