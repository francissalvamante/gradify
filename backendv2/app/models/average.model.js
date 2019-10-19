const mongoose = require('mongoose');

const AverageSchema = mongoose.Schema({
	average: Number,
	quarter: String,
	year: String,
	studentId: {
		type: String,
		ref: 'Student'
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('Average', AverageSchema);
