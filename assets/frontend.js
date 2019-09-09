'use strict';
todayDateString = new Date().toJSON().slice(0, 10)
vex.dialog.open({
    message: 'Select a date and color.',
    input: [
        '<style>',
            '.vex-custom-field-wrapper {',
                'margin: 1em 0;',
            '}',
            '.vex-custom-field-wrapper > label {',
                'display: inline-block;',
                'margin-bottom: .2em;',
            '}',
        '</style>',
        '<div class="vex-custom-field-wrapper">',
            '<label for="date">Date</label>',
            '<div class="vex-custom-input-wrapper">',
                '<input name="date" type="date" value="' + todayDateString + '" />',
            '</div>',
        '</div>',
        '<div class="vex-custom-field-wrapper">',
            '<label for="color">Color</label>',
            '<div class="vex-custom-input-wrapper">',
                '<input name="color" type="color" value="#ff00cc" />',
            '</div>',
        '</div>'
    ].join(''),
    callback: function (data) {
        if (!data) {
            return console.log('Cancelled')
        }
        console.log('Date', data.date, 'Color', data.color)
        $('.demo-result-custom-vex-dialog').show().html([
            '<h4>Result</h4>',
            '<p>',
                'Date: <b>' + data.date + '</b><br/>',
                'Color: <input type="color" value="' + data.color + '" readonly />',
            '</p>'
        ].join(''))
    }
})