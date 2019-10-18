const subjects = [
    'MATH',
    'CS',
    'ECON',
    'AFM'
];

function courses_by_subject(subject, lower_bound, upper_bound) {
    $.ajax({
        url: '/courses_by_subject',
        type: 'POST',
        cache: false,
        data: {
            subject: subject,
            lower_bound: lower_bound,
            upper_bound: upper_bound
        },
        success: function(data) {
            $('#course-display').html(data);
            $('.remove-course').on('click', function(_ev) {
                $(this.parentElement.parentElement).fadeOut();
            })
        },
        error: function(jqXHR, textStatus, err) {
            console.error("Error: ", jqXHR.status, jqXHR.responseText, textStatus, err);
        }
    })
}

function is_course_num(x) {
    return Math.floor(x) == x && $.isNumeric(x) && x.length == 3;
}

function get_search_data(search) {
    let words = search.split(/([0-9]+)/).map(word => word.replace(/\s/g, ''));
    let subject;
    let catalog_number;

    words.forEach((word) => {
        if (subjects.includes(word)) {
            subject = word;
        }

        if (is_course_num(word)) {
            catalog_number = word;
        }
    })

    return {
        subject: subject,
        catalog_number: catalog_number
    }
}

function course_by_search(search) {
    let search_data = get_search_data(search);

    if (search_data.subject == undefined || search_data.catalog_number == undefined) {
        $('#course-display').html('<h3 id="error-msg">Sorry, no courses matched your search');
        return
    }

    $.ajax({
        url: '/course_by_search',
        type: 'POST',
        cache: false,
        data: search_data,
        success: function(data) {
            $('#course-display').html(data);
            $('.remove-course').on('click', function(_ev) {
                $(this.parentElement.parentElement).fadeOut();
            })
        },
        error: function(jqXHR, textStatus, err) {
            console.error("Error: ", jqXHR.status, jqXHR.responseText, textStatus, err);
        }
    })
}

