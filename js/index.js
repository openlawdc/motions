var d3 = require('d3');

d3.json('data/legislative.json').on('load', function(legislative) {
    var motions = d3.select('.motions')
        .selectAll('div.motion')
        .data(legislative);

    var motion = motions.enter()
        .append('div')
        .attr('class', function(d) {
            return 'motion drop passed-' + d.passed;
        });

    var title = motion.append('h4')
        .attr('class', 'pad0 col12 clearfix')
        .text(function(d) {
            return d.description;
        });

    title.append('span')
        .attr('class', 'fr')
        .text(function(d) {
            return (d.measure.measure_number ?
                    '#' + d.measure.measure_number + ' ' : '') +
                '(' + d.measure.measure_type + ')';
        });

    motion.append('div')
        .attr('class', 'small')
        .selectAll('span.vote')
        .data(function(d) {
            return d3.entries(d.vote_data).filter(function(e) {
                return e.key !== 'friendly' &&
                    e.key !== 'roll_call';
            });
        })
        .enter()
        .append('span')
        .attr('title', function(d) { return d.key + ': ' + d.value; })
        .attr('class', function(d) {
            return 'vote  ' + d.value;
        })
        .text(function(d) {
            return d.key.split(' ')[1];
        });

    motion.append('p')
        .attr('class', 'deemphasize padV small')
        .text(function(d) {
            return 'discussed by ' + d.discussion.join(', ');
        });

    motion.append('p')
        .attr('class', 'deemphasize padV small')
        .text(function(d) {
            return 'Motion: ' + d.motion.motion_description + ', Movant: ' +
                d.motion.movant + ', ' + d.motion.required_threshold + ' votes required';
        });

}).get();
