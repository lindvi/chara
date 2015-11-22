'use strict';

var express = require('express');
var controller = require('./traffic.controller');

var router = express.Router();

router.post('/', controller.index);
router.post('/timetable', controller.lookup);

module.exports = router;
