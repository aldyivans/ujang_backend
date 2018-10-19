const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = express.Router();

const Message = require('../models/message')

router.use(bodyParser.urlencoded({extended: false}))
router.use(express.static(__dirname));

router.post('/post', function(req, res){
	new Message ({
		_id: mongoose.Types.ObjectId,
		name: req.body.name,
		messages: req.body.messages
	}).save(function(err, doc){
		if(err){
			console.log("failed");
		} else {
			console.log('save to database')
			res.redirect('/');
		}
	})
})

module.exports = router;