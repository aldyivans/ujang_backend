const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const app = express();

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Request-With, Content-Type, Accept, Authorization"
	);
	if (req.method === 'OPTIONS') {
		res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE');
		return res.status(200).json({})
	}
	next();
})

app.use(morgan('dev'));

const messageRoutes = require('./api/routes/message');
const userRoutes = require('./api/routes/user');
const homeRoutes = require('./api/routes/home');

const user = require('./api/models/user');


app.use(express.static(__dirname));

app.use(passport.initialize());
app.use(passport.session());

require('./api/config/passport')(passport);

app.use('/message', messageRoutes);
app.use('/user', userRoutes)
app.use('/home', homeRoutes)

const url = 'mongodb://localhost:27017/uj-web-chat';
mongoose.connect(url);

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
	console.log('connection success');
});

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html')
})

app.use((req, res, next)=> {
	const error = new Error('Halaman Tidak Ada');
	error.status = 404;
	next(error);
})

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});
// function authCheck(req, res, next){
// 	const bearerHeader = req.headers["authorization"];

// 	if (typeof bearerHeader !== 'undefined'){
// 		const bearer = bearerHeader.split(" ");
// 		const bearerToken = bearer[1];
// 		req.token = bearerToken;
// 		next()
// 	} else {
// 		res.status(403).json({
// 			message: 'masih forbidden'
// 		})
// 	}
// }

app.listen(3001)

module.exports = app;