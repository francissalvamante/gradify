const mongoose = require('mongoose');

const TestSchema = mongoose.Schema({
	grade: Number,
	quarter: String,
	year: String,
	studentId: {
		type: String,
		ref: 'Student'
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('Test', TestSchema);
