'use strict';

var express = require('express');
var controller = require('./lights.controller');

var router = express.Router();

router.get('/', controller.index);
router.put('/', controller.toggle);
router.put('/sleep', controller.sleep);
router.delete('/sleep', controller.cancelSleep);

module.exports = router;
