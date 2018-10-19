const mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,
	messages: String
});

module.exports = mongoose.model('Message', messageSchema);