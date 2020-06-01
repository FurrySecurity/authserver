export function apiRequest(url, params, callback) {
    for (var i = 0; i < params.length; i++) {
        url = url.replace(':' + params[i].name, encodeURIComponent(params[i].value));
    }

    var headers = {};

    var csrf_header_element = $('meta[name="_csrf_header"]');

    if (csrf_header_element && csrf_header_element !== null)
        headers[csrf_header_element.attr('content')] = $('meta[name="_csrf"]').attr('content');

    $.ajax({
        url: window.location.origin + '/' + url,
        method: 'GET',
        data: '',
        headers: headers,
        dataType: 'text',
        contentType: 'application/text',
        
        error: e => {
            callback(JSON.parse(e));
        },
        success: e => {
            callback(JSON.parse(e));
        }
    });
}