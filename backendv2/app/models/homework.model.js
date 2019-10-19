const mongoose = require('mongoose');

const HomeworkSchema = mongoose.Schema({
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

module.exports = mongoose.model('Homework', HomeworkSchema);
