	bcrypt.hash(req.body.password, 10, (err, result) => {
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
					message: 'user terdaftar'
				})
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			})

		}
		res.redirect('/login')