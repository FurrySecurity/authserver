import {parse_api_error} from "./modules/errors.js";
import {postJSON} from "./modules/requests.js";

$(() => {
    $('#add-news').click(function (e) {
        e.preventDefault();

        let element = $(this);

        if (isTransitioning(element)) return;

        let target = $('#add-news-area');

        toggleOption(target, element);

    });

    $('#add-news-submit-btn').click(function (e) {
        let text = $('#add-news-text').val();

        postJSON('/news/add-post', {
            text: text
        }, data => {
            if (data.status === 'success') {
                location.reload()
            }
        });
    });

    $('#add-log').click(function (e) {

        e.preventDefault();

        let element = $(this);

        if (isTransitioning(element)) return;

        let target = $('#add-log-area');

        toggleOption(target, element);

    });

    let change_id = 0;
    $('#add-log-change').click(() => {
        change_id++;

        let change_log_add_id = `log-change-input-${change_id}`;
        let change_log_remove_id = `log-change-remove-${change_id}`;
        let change_log_container_id = `log__${change_id}`;

        document.getElementById('change-submit').insertAdjacentHTML('afterend',
            `<div id="${change_log_container_id}" class="col-xs-12 text-center mt-2" style="justify-content: center">
                <input id="${change_log_add_id}" class="form-control input-group add-changelog-entry" type="text" placeholder="Changes...">
                <a id="${change_log_remove_id}" class="add-log-button" style="color: red !important; margin-right: 3em"><i class="fas fa-minus"></i></a>
            </div>`);

        let change_log = $(`#log-change-input`);
        $(`#${change_log_add_id}`).val(change_log.val());
        change_log.val('');

        $(`#${change_log_remove_id}`).click(function () {
            $(`#${change_log_container_id}`).remove();
            $(this).remove();
        });
    });

    $('.remove-changelog-button').click(function () {
       let id = $(this).attr('changelog-id');

        postJSON('/logs/remove-log', {
            id: parseInt(id)
        }, data => {
            if (data.status === 'success')
                $(`#changelog-${id}`).remove();
            else
                parse_api_error(data, 'Changelog');
        });
    });

    $('#change-submit-btn').click(e => {
        let type = $('#log-select').val();
        let version = $('#log-change-version').val();

        let changes = [];
        $(`input[id^='log-change-input-']`).each(function (e) {
            let value = $(this).val();
            if (value)
                changes.push(value);
        });

        changes = changes.reverse();

        postJSON('/logs/add-change', {
            type: type,
            version: version,
            changes: changes
        }, data => {
            let status = data['status'];

            if (status === 'success')
                location.reload();
        });
    });

    function toggle(element, duration, callback) {
        if (element.is(':hidden')) {
            element.show({
                duration: duration || 0,
                complete: callback
            });
        } else {
            element.hide({
                duration: duration || 0,
                complete: callback
            });
        }
    }

    let transitioning = {};
    function toggleOption(target, element) {

        transitioning[target] = true;

        toggle(target, 500, () => {
            if (element.hasClass('fa-plus')) {
                element.addClass('fa-minus');
                element.removeClass('fa-plus');
                element.css('color', 'red');
            } else if (element.hasClass('fa-minus')) {
                element.addClass('fa-plus');
                element.removeClass('fa-minus');
                element.css('color', 'inherit');
            }

            transitioning[target] = false;
        });
    }

    function isTransitioning(element) {
        return transitioning[element] === true;
    }
});