const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = express.Router();

const user = require('../models/user')

router.use(cookieParser());
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())
router.use(cors({
	credentials: true
}))

router.use(express.static(__dirname));

router.get('/signup', function(req, res){
	res.json({
		text: 'hi'
	})
	// res.sendFile(__dirname + '/public/sign-up.html')
});


router.post('/signup', function(req, res){
	user.find({ email: req.body.email })
	.exec()
	.then(doc => {
		if (doc.length >= 1){
			return res.redirect('/user/signup')
		} else {
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(req.body.password, salt, function(err, hash) {
					if (err) {
						return res.status(500).json({
							error: err
						});
					} else {
						const User = new user ({
							_id: new mongoose.Types.ObjectId,
							name: req.body.name,
							email: req.body.email,
							password: hash
						});
						User
						.save()
						.then(result => {
							console.log(result)
							res.status(201).json({
								message: 'users terdaftar'
							})
						})
						.catch(err => {
							console.log(err);
							res.status(500).json({
								error: err
							});
						})

					}
				})
			})
		}
	})
})

router.get('/login', function(req, res){
	// res.status(200).json({
	// 	message: 'hi lurr'
	// })
	res.sendFile(__dirname + '/login.html')
})

router.get('/tes', function(req, res){
	res.status(200).json({
		message: 'ini tes doang ko'
	});
})

router.post('/login', function(req, res) {
	user.find({
		email: req.body.email
	}).exec()
	.then(user => {
		if (user.length < 1){
			return res.status(401).json({
				message: 'user tidak terdaftar'
			})
		}
		bcrypt.compare(req.body.password, user[0].password, (err, result) => {
			if (err) {
				return res.status(401).json({
					message: 'password salah'
				})
			}
			if (result) {
				const token = jwt.sign({
					email: user[0].email,
					userId: user[0]._id
				},
				'secret',
				{
					expiresIn: "3600"
				})
				res.status(200).json({
					message: 'auth sukses',
					token
				})
				// res.cookie('bos', token);
				console.log('TES')

			}
			res.status(401).json({
				message: 'password salah'
			})
		})
		
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		})
	})
})

module.exports = router;