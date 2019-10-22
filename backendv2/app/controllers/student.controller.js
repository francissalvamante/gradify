const uuidv4 = require('uuid/v4');
const Student = require('../models/student.model.js');
const Homework = require('../models/homework.model.js');
const Test = require('../models/test.model.js');
const Average = require('../models/average.model.js');

var Promise = require('bluebird');
Promise.promisifyAll(Student);

exports.grades = async (req, res) => {
	let body = req.body.content;
	let quarter = body[0].split(',')[0];
	let year = body[0].split(',')[1];
	let data = [];

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

		await student.save().then((response) => {
			data.push(response);
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

			totalH -= minH;
			let aveH = totalH / (countH - 1);
			let aveT = totalT / countT;

			let finalGrade = (aveH * 0.4) + (aveT * 0.6);
			new Average({
				average: finalGrade.toFixed(1),
				quarter: quarter,
				year: year,
				studentId: response.studentId
			}).save();
		}).catch(err => {
			console.error('err', err);
			res.status(500).send('An error has occured');
		});
	}

	res.status(200).send({
		status: true,
		data: data
	});
};

exports.getStudents = (req, res) => {
	Student.find().sort({ firstName: 'asc', lastName: 'asc' }).then(response => {
		let data = [];
		for(var i = 0; i < response.length; i++) {
			let student = {
				studentId: response[i].studentId,
				firstName: response[i].firstName,
				lastName: response[i].lastName,
                createdAt: response[i].createdAt
			};

			data.push(student);
		}
		res.status(200).send({
			status: true,
			data: data
		});
	}).catch(err => {
		console.error('error', err);
	});
};

exports.studentGrade = (req, res) => {
	Student.findOne({ studentId: req.query.studentId }).then(response => {
		res.status(200).send({
			status: true,
			data: {
				studentId: response.studentId,
				firstName: response.firstName,
				lastName: response.lastName,
				createdAt: response.createdAt
			},
			homework: response.homeworks,
			test: response.tests,
			average: response.averages
		});
	}).catch(err => {
		res.status(500).send(`An error has occurred ${err}`);
	});
};
