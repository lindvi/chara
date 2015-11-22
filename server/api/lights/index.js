'use strict';

var express = require('express');
var controller = require('./lights.controller');

var router = express.Router();

router.get('/', controller.index);
router.put('/', controller.toggle);
router.put('/sleep', controller.sleep);

module.exports = router;
