import {postJSON} from './modules/requests.js';

$(() => {
    for (let i = 1; i <= 5; i++) {
        $('#review-star-' + i).click(function (e) {
            e.preventDefault();

            let id = parseInt($(this).attr('id').replace('review-star-', 0));
            for (let j = 5; j > 0; j--) {
                let star = $('#review-star-' + j);
                if (j > id)
                    star.text('☆');
                else star.text('★');
            }

            postJSON('/panel/review', {rating: id}, () => {
                let review_box = $('#review-box');
                if (id >= 4)
                    review_box.text('thanks for your review of carbon!');
                else {
                    review_box.html('☹ we\'re sorry to hear that. If you would like to express your concerns ' +
                        'or any issues you faced, feel free to chat to our support staff ' +
                        '<a href="support link here">here</a>');
                    review_box.attr('class', 'alert alert-danger text-center');
                }
            });
        });
    }
});