'use strict'

const api_token = process.env.api_token || 'd55d4614484986ea90da927aa3ad33b1';

let uw_api = require('uwapi')(api_token);
let rp = require('request-promise');
let $ = require('cheerio');

exports.search_by_subject = (data, res, view_path) => {
  let subject = data.subject;
	let lower_bound = Number(data.lower_bound);
	let upper_bound = Number(data.upper_bound);

	uw_api.courses({subject: subject}, {}).
	then((response) => {
		if (response.length < 1) {
			res.render('partials/courses', {
				subject: 'Sorry, no courses matched your search',
				courses: []
			})
			return;
		}

		let subject_url = `http://www.ucalendar.uwaterloo.ca/1920/COURSE/course-${subject}.html`;

		rp(subject_url).then(function(html) {
            let results = $('center > table > tbody', html);
            let courses = [];
            let j = 0; // result index

            for (let i = 0; i < response.length; ++i) {
                let course = response[i];

                let scraped_course;
                if (j < results.length) {
                    scraped_course = results[j].firstChild.firstChild.firstChild.firstChild.next.data.split(' ').slice(0, 2).join(' ');
                }

                let api_course = course.subject + ' ' + course.catalog_number;

                if (parseInt(course.catalog_number) >= lower_bound && parseInt(course.catalog_number) <= upper_bound) {
                    if (scraped_course != undefined && scraped_course.includes(api_course)) {
                        for (let k = 0; k < results[j].children.length; ++k) {
							let course_part = results[j].children[k].firstChild.firstChild.firstChild;

							if (course_part == undefined || course_part.data == undefined) {
								continue;
							}

							if (course_part.data.includes('Note:')) {
								course.notes = course_part.data.substring(1, course_part.data.length - 1);
								let sentences = course.notes.split('.');

								let first_sentence = sentences[0].toLowerCase();

								if (first_sentence.includes('see note')) {
									sentences[0] = 'Note:'
								}

								course.notes = sentences.join('.');
								course.notes = course.notes.replace(':.', ':');
							}
							if (course_part.data.includes('Prereq:')) {
								course.prerequisites = course_part.data.split(',').join(', ');
							} else if (course_part.data.includes('Antireq:')) {
								course.antirequisites = course_part.data.split(',').join(', ');
							} else if (course_part.data.includes('Coreq:')) {
								course.corequisites = course_part.data.split(',').join(', ');
							} else if (course_part.data.includes('Cross-listed')) {
								course.crosslistings = course_part.data.substring(1, course_part.data.length - 1);
							}
						}
						
                        j += 1;     
                    }
					course.link = `http://www.ucalendar.uwaterloo.ca/1920/COURSE/course-${subject}.html#${subject}${course.catalog_number}`;
					courses.push(course);
                }
            }
    
            res.render(view_path, {
                subject: subject,
                courses: courses
            })
		}).catch(function(err) {
			console.log(err);
        })
	})
}

exports.search_by_course = (data, res) => {
	let subject = data.subject;
	let catalog_number = data.catalog_number;

	if (catalog_number == undefined) {
		this.search_by_subject({
			subject: subject,
			lower_bound: 100,
			upper_bound: 999
		}, res, 'partials/courses');
	}

	uw_api.courses({subject: subject, catalog_number: catalog_number}, {}).
	then((response) => {
		if (Object.keys(response).length == 0) {
			res.render('partials/courses', {
				subject: 'Sorry, no courses matched your search',
				courses: []
			})
			return;
		}

		if (response.notes != null) {
			response.notes = response.notes.substring(1, response.notes.length - 1);
			let sentences = response.notes.split('.');

			let first_sentence = sentences[0].toLowerCase();

			if (first_sentence.includes('see note')) {
				sentences.shift();
			}

			response.notes = sentences.join('.');
			response.notes = response.notes.replace(':.', ':');
		}
		if (response.prerequisites != null) {
			response.prerequisites = `Prereq: ${response.prerequisites}`;
		}
		if (response.antirequisites != null) {
			response.antirequisites = `Antireq: ${response.antirequisites}`;
		}
		if (response.corequisites != null) {
			response.corequisites = `Coreq: ${response.corequisites}`;
		}
		if (response.crosslistings != null) {
			response.crosslistings = `Crosslisted with ${response.crosslistings}`
		}

		response.link = response.url;

		res.render('partials/courses', {
			subject: subject,
			courses: [response]
		})
	}).
	catch((err) => {
		console.error(`Error: ${err}`);
	})
}
