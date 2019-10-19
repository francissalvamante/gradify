module.exports = (app) => {
	const students = require('../controllers/student.controller.js');

	app.post('/grades', students.grades);

	app.get('/grades', students.getGrades);
}
