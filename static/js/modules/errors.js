const error_message = $('#error-message');

let error_timeout = null;

function show_message(message, delay) {
    error_message.removeClass('alert-danger');
    error_message.addClass('alert-success');

    error_message.text(message);
    error_message.show({duration: 250});

    if (delay !== 0) {
        if (error_timeout)
            clearInterval(error_timeout);

        error_timeout = setTimeout(hide_error, delay);
    }
}

export function hide_error() {
    error_message.hide({ duration: 250 });
    error_timeout = null;
}

export function show_success(message, delay = 5000) {
    error_message.removeClass('alert-danger');
    error_message.addClass('alert-success');
    show_message(message, delay);
}

export function show_error(message, delay = 5000) {
    show_message(message, delay);
    error_message.removeClass('alert-success');
    error_message.addClass('alert-danger');
}

function show_unknown_error(error) {
    show_error('unknown error: ' + error, 0);
}

function show_no_permission() {
    show_error('you do not have permission to perform this action', 0);
}

function show_not_found(type = 'user') {
    show_error(type + ' not found');
}

export function parse_api_error(data, type = 'user') {
    console.log('API error - ' + data);

    show_error(data.message);
}