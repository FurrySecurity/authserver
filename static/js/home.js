import {postJSON} from './modules/requests.js';

(function ($) {
    'use strict';

    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            let target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 48)
                }, 1000, 'easeInOutExpo');
                return false;
            }
        }
    });

    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    $('body').scrollspy({
        target: '#mainNav',
        offset: 54
    });

    let navbarCollapse = function () {
        let mainNav = $('#mainNav');
        let introduction = $('#introduction');
        if (mainNav.offset().top > introduction.offset().top)
            mainNav.addClass('navbar-shrink');
        else
            mainNav.removeClass('navbar-shrink');
    };

    navbarCollapse();
    $(window).scroll(navbarCollapse);

    let error = $('#error-message');
    if (error.length !== 0) {
        $('#message-modal-text').text(error.text());
        $('#message-modal-container').css('background-color', '#ff877e');
        $('#message-modal').modal('show');
    }

    let message = $('#info-message');
    if (message.length !== 0) {
        $('#message-modal-text').text(message.text());
        $('#message-modal-container').css('background-color', '#87ff7e');
        $('#message-modal').modal('show');
    }
})(jQuery);