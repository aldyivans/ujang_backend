const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		const token = req.cookies.auth;
		const bearerToken = token.split("Bearer ")[1];
		console.log(token)
		const decoded = jwt.verify(token, 'secret');
		req.userData = decoded;
		next()
	} catch(error) {
		return res.status(401).json({
			message: 'auth gagal euy'
		})
	}
}