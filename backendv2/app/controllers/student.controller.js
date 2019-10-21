const uuidv4 = require('uuid/v4');
const Student = require('../models/student.model.js');
const Homework = require('../models/homework.model.js');
const Test = require('../models/test.model.js');
const Average = require('../models/average.model.js');

exports.grades = (req, res) => {
	console.log('req', req);
	let body = req.body.content;
	let quarter = body[0].split(',')[0];
	let year = body[0].split(',')[1];

	for(var i = 1; i < body.length; i++) {
		let details = body[i].split(' ');
		let homework = false, test = false;
		let totalH = 0, totalT = 0;
		let countH = 0, countT = 0;
		let minH = Number.MAX_SAFE_INTEGER;
		let firstName = details[0];
		let lastName = details[1];

		let student = new Student({
			studentId: uuidv4(),
			firstName: firstName,
			lastName: lastName
		});

		student.save().then((response) => {
			console.log('response', response);
			for(var j = 2; j < details.length; j++) {
				if(details[j] === 'H') {
					homework = true;
					test = false;
				} else if(details[j] === 'T') {
					test = true;
					homework = false;
				} else {
					let g = parseInt(details[j]);
					if(homework) {
						new Homework({
							grade: g,
							quarter: quarter,
							year: year,
							studentId: response.studentId
						}).save();
						minH = g < minH ? g : minH;
						totalH += g;
						countH++;
					} else if(test) {
						new Test({
							grade: g,
							quarter: quarter,
							year: year,
							studentId: response.studentId
						}).save();
						totalT += g;
						countT++;
					}
				}
			}

			totalH -= minH;;
			let aveH = totalH / (countH - 1);
			let aveT = totalT / countT;

			let finalGrade = (aveH * 0.4) + (aveT * 0.6);
			new Average({
				average: finalGrade.toFixed(1),
				quarter: quarter,
				year: year,
				studentId: response.studentId
			}).save();

			res.status(200).send('Successful');
		}).catch(err => {
			console.error('err', err);
			res.status(500).send('An error has occured');
		});
	}
};

exports.getStudents = (req, res) => {
	Student.find().then(response => {
		console.log('hello there');
		res.status(200).send({
			status: true,
			data: response
		});
	}).catch(err => {
		console.error('error', err);
	});
};

exports.studentGrade = (req, res) => {
	Student.find({ studentId: req.body.studentId }).then(response => {
		console.log('response', response);
		res.status(200).send("successful");
	}).catch(err => {
		console.error('error', err);
	});
}
