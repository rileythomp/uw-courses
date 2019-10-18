'use strict'

const PORT = process.env.PORT || 3000;

let courses = require('./courses');
let express = require('express');
let app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(__dirname + '/views'));

app.get('/',(_req, res) => {
	courses.search_by_subject({subject: 'CS', lower_bound: 100, upper_bound: 999}, res, 'pages/index');
});

app.post('/courses_by_subject',(req, res) => {
	courses.search_by_subject(req.body, res, 'partials/courses');
});

app.post('/course_by_search', (req, res) => {
	courses.search_by_course(req.body, res);
});

app.listen(PORT, () => {
	console.log(`Running on port ${PORT}`)
})