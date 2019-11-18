$('.remove-course').on('click', function(_ev) {
    $(this.parentElement.parentElement).fadeOut();
})

$('.expand-course').on('click', function(_ev) {
    $(this.parentElement.parentElement.children[1]).fadeIn(1000);
    $(this.parentElement.parentElement.children[2]).fadeIn(1000);
    $(this.parentElement.parentElement.children[6]).fadeIn(1000);
    $(this.parentElement.parentElement.children[7]).fadeIn(1000);
})

$('#course-search').on('keyup', function(ev) {
    if (ev.keyCode == 13) {
        course_by_search(this.value.toUpperCase());
    }
});

$('#subject-select').on('change', function(_ev) {
    let subject = this.value;
    let lower_bound = $('#lower-bound').val() || 100;
    let upper_bound = $('#upper-bound').val() || 999;
    courses_by_subject(subject, lower_bound, upper_bound);
});

$('.range-input').on('keyup', function(ev) {
    if (ev.keyCode == 13) {
        let subject = $('#subject-select').val() || 'MATH';
        let lower_bound = $('#lower-bound').val() || 100;
        let upper_bound = $('#upper-bound').val() || 999;
        courses_by_subject(subject, lower_bound, upper_bound);
    }
})