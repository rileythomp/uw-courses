const subjects = [
    'AFM',
    'ACTSC',
    'ANTH',
    'AHS',
    'APPLS',
    'AMATH',
    'ARCH',
    'ARTS',
    'ARBUS',
    'AVIA',
    'BIOL',
    'BME',
    'BET',
    'CDNST',
    'CHE',
    'CHEM',
    'CMW',
    'CIVE',
    'CLAS',
    'COGSCI',
    'CO',
    'COMMM',
    'CS',
    'COOP',
    'CROAT',
    'DAC',
    'DUTCH',
    'EARTH',
    'ECON',
    'ECE',
    'ENGL',
    'ENBUS',
    'ERS',
    'ENVE',
    'ENVS',
    'FINE',
    'FR',
    'GENE',
    'GEOG',
    'GEO',
    'GER',
    'GERON',
    'GBDA',
    'GRK',
    'HLTH',
    'HIST',
    'HRM',
    'HUMSC',
    'INDEV',
    'INTST',
    'ITAL',
    'ITALST',
    'JS',
    'KIN',
    'INTEG',
    'LAT',
    'LS',
    'MSCI',
    'MNS',
    'MATBUS',
    'MATH',
    'MTHEL',
    'ME',
    'MTE',
    'MEDVL',
    'MUSIC',
    'NE',
    'OPTOM',
    'PACS',
    'PHARM',
    'PHIL',
    'PHYS',
    'PLAN',
    'PSCI',
    'PORT',
    'PSYCH',
    'PMATH',
    'REC',
    'RS',
    'RUSS',
    'REES',
    'SCI',
    'SCBUS',
    'SMF',
    'STVV',
    'SOC',
    'SE',
    'SPAN',
    'SPCOM',
    'STAT',
    'SYDE',
    'UNIV',
    'VCULT'
];

let subject_color = {
    'AFM': '#E78100',
    'ACTSC': '#C60078',
    'ANTH': '#E78100',
    'AHS': '#0098A5',
    'APPLS': '#E78100',
    'AMATH': '#C60078',
    'ARCH': '#8100B4',
    'ARTS': '#E78100',
    'ARBUS': '#E78100',
    'AVIA': '#607000',
    'BIOL': '#0073CE',
    'BME': '#8100B4',
    'BET': '#8100B4',
    'CDNST': '#E78100',
    'CHE': '#8100B4',
    'CHEM': '#0073CE',
    'CMW': '#E78100',
    'CIVE': '#8100B4',
    'CLAS': '#E78100',
    'COGSCI': '#E78100',
    'CO': '#C60078',
    'COMMM': '#C60078',
    'CS': '#C60078',
    'COOP': '#FFD54F',
    'CROAT': '#E78100',
    'DAC': '#E78100',
    'DUTCH': '#E78100',
    'EARTH': '#0073CE',
    'ECON': '#E78100',
    'ECE': '#8100B4',
    'ENGL': '#E78100',
    'ENBUS': '#607000',
    'ERS': '#607000',
    'ENVE': '#8100B4',
    'ENVS': '#607000',
    'FINE': '#E78100',
    'FR': '#E78100',
    'GENE': '#8100B4',
    'GEOG': '#607000',
    'GEO': '#FFD54F',
    'GER': '#E78100',
    'GERON': '#0098A5',
    'GBDA': '#E78100',
    'GRK': '#E78100',
    'HLTH': '#0098A5',
    'HIST': '#E78100',
    'HRM': '#E78100',
    'HUMSC': '#E78100',
    'INDEV': '#607000',
    'INTST': '#E78100',
    'ITAL': '#E78100',
    'ITALST': '#E78100',
    'JS': '#E78100',
    'KIN': '#0098A5',
    'INTEG': '#607000',
    'LAT': '#E78100',
    'LS': '#E78100',
    'MSCI': '#8100B4',
    'MNS': '#0073CE',
    'MATBUS': '#C60078',
    'MATH': '#C60078',
    'MTHEL': '#C60078',
    'ME': '#8100B4',
    'MTE': '#8100B4',
    'MEDVL': '#E78100',
    'MUSIC': '#E78100',
    'NE': '#8100B4',
    'OPTOM': '#0073CE',
    'PACS': '#E78100',
    'PHARM': '#0073CE',
    'PHIL': '#E78100',
    'PHYS': '#0073CE',
    'PLAN': '#607000',
    'PSCI': '#E78100',
    'PORT': '#E78100',
    'PSYCH': '#E78100',
    'PMATH': '#C60078',
    'REC': '#0098A5',
    'RS': '#E78100',
    'RUSS': '#E78100',
    'REES': '#E78100',
    'SCI': '#0073CE',
    'SCBUS': '#0073CE',
    'SMF': '#E78100',
    'STVV': '#FFD54F',
    'SOC': '#E78100',
    'SE': '#8100B4',
    'SPAN': '#E78100',
    'SPCOM': '#E78100',
    'STAT': '#C60078',
    'SYDE': '#8100B4',
    'UNIV': '#FFD54F',
    'VCULT': '#E78100'
}

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
            $('.expand-course').on('click', function(_ev) {
                $(this.parentElement.parentElement.children[1]).fadeIn(1000);
                $(this.parentElement.parentElement.children[2]).fadeIn(1000);
                $(this.parentElement.parentElement.children[6]).fadeIn(1000);
                $(this.parentElement.parentElement.children[7]).fadeIn(1000);
            })
            $('.course-block').css('border', '2px solid ' + subject_color[subject]);
        },
        error: function(jqXHR, textStatus, err) {
            console.error('Error:',  jqXHR.status, jqXHR.responseText, textStatus, err);
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

    if (search_data.subject == undefined) {
        $('#course-display').html('<h3 id="error-msg">Sorry, no courses matched your search</h3>');
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
            $('.expand-course').on('click', function(_ev) {
                $(this.parentElement.parentElement.children[1]).fadeIn(1000);
                $(this.parentElement.parentElement.children[2]).fadeIn(1000);
                $(this.parentElement.parentElement.children[6]).fadeIn(1000);
                $(this.parentElement.parentElement.children[7]).fadeIn(1000);
            })
            $('.course-block').css('border', '2px solid ' + subject_color[search_data.subject]);
        },
        error: function(jqXHR, textStatus, err) {
            console.error('Error:',  jqXHR.status, jqXHR.responseText, textStatus, err);
        }
    })
}

