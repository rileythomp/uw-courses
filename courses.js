'use strict'

const api_token = process.env.api_token || 'd55d4614484986ea90da927aa3ad33b1';

let uw_api = require('uwapi')(api_token);

exports.search_by_subject = (data, res, view_path) => {
	let subject = data.subject;
	let lower_bound = Number(data.lower_bound);
	let upper_bound = Number(data.upper_bound);

	uw_api.courses({subject: subject}, {}).
	then((response) => {
		let courses = [];
		response.forEach((course) => {
			if (course.catalog_number >= lower_bound && course.catalog_number <= upper_bound) {
				course.link = `http://www.ucalendar.uwaterloo.ca/1920/COURSE/course-${subject}.html#${subject}${course.catalog_number}`;
				courses.push(course);
			}
		})

		if (courses.length == 0) {
			res.render('partials/courses', {
				subject: 'Sorry, no courses matched your search',
				courses: []
			})
			return;
		}
	  	res.render(view_path, {
			subject: subject,
			courses: courses
		})
	})
}

exports.search_by_course = (data, res) => {
	let subject = data.subject;
	let catalog_number = data.catalog_number;

	uw_api.courses({subject: subject, catalog_number: catalog_number}, {}).
	then((response) => {
		if (Object.keys(response).length == 0) {
			res.render('partials/courses', {
				subject: 'Sorry, no courses matched your search',
				courses: []
			})
			return;
		}
		res.render('partials/courses', {
			subject: subject,
			courses: [response]
		})
	}).
	catch((err) => {
		alert(2);
	})
}
