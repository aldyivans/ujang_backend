const express = require('express');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
// const passport = require('./config/passport');
const router = express.Router();

router.get('/', checkAuth, function(req, res, next){
	res.status(200).json({
		message: 'hi lurr'
	})
})

module.exports = router;