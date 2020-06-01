$(() => {
    const light_mode = $('.light-mode-toggle');
    const dark_mode = $('.dark-mode-toggle');
    const body = $('body');

    light_mode.click(() => {
        body.attr('color-theme', 'light');
        Cookies.set('drip-theme', 'light', {expires: 9999});

        if (typeof DRIP !== 'undefined' && DRIP.THEME_CALLBACK)
            DRIP.THEME_CALLBACK('light');

        light_mode.hide();
        dark_mode.show();
    });

    dark_mode.click(() => {
        body.attr('color-theme', 'dark');
        Cookies.set('drip-theme', 'dark', {expires: 9999});

        if (typeof DRIP !== 'undefined' && DRIP.THEME_CALLBACK)
            DRIP.THEME_CALLBACK('dark');

        light_mode.show();
        dark_mode.hide();
    });
});