import { hide_error, parse_api_error, show_error, show_success} from './modules/errors.js';
import { apiRequest } from './modules/requests.js';

$(() => {
    $('#forgot-password').click(e => {
        e.preventDefault();
        hide_error();

        $('#recovery-box').show(200);
        $('#register-box').hide(200);
        $('#login-box').hide(200);
    });

    $('#login-button').click(e => {
        e.preventDefault();

        do_request('login');
    });

    $('#register-button').click(e => {
        e.preventDefault();

        do_request('register');
    });

    $('#logout-button').click(e => {
        e.preventDefault();

        do_request('logout');
    });

    $('#recover-button').click(e => {
        e.preventDefault();

        do_request('recovery');
    });

    function do_login() {
        let username = $('#login-email').val();
        let password = $('#login-password').val();

        if (username === '' || password === '') {
            show_error('username/password cannot be blank!');
            return;
        }

        apiRequest('api/auth/login/:email/:password', [
            {
                name: 'email',
                value: username
            },
            {
                name: 'password',
                value: password
            }
        ], data => {
            if (data.success) {
                window.location = '/panel/';
            }
            else {
                parse_api_error(data);
            }
        });
    }

    function do_register() {
        let password = $('#register-password').val();
        let confirm_password = $('#register-password-confirmation').val();
        let register_agree = $('#register-agree').is(':checked');

        if (password === '' || confirm_password === '') {
            show_error('username/passwords cannot be blank!');
            return;
        }

        if (password !== confirm_password) {
            show_error('passwords do not match!');
            return;
        }

        if (!register_agree) {
            show_error('you are required to accept the terms & conditions!');
            return;
        }

        let email = $('#register-email').val();
        let username = $('#register-username').val();
        let invitation = $('#register-invite').val();

        if (invitation === undefined) {
            apiRequest('api/auth/register/:email/:username/:password', [
                {
                    name: 'email',
                    value: email
                },
                {
                    name: 'username',
                    value: username
                },
                {
                    name: 'password',
                    value: password
                }
            ], data => {
                if (data.success)
                    show_success(data.message, 0);
                else
                    parse_api_error(data);
            });
        }
        else {
            apiRequest('api/auth/register/:email/:username/:password/:invite', [
                {
                    name: 'email',
                    value: email
                },
                {
                    name: 'username',
                    value: username
                },
                {
                    name: 'password',
                    value: password
                },
                {
                    name: 'invite',
                    value: invitation
                }
            ], data => {
                if (data.success)
                    show_success(data.message, 0);
                else
                    parse_api_error(data);
            });
        }
    }

    function do_logout() {
        apiRequest('api/auth/logout', [], data => {
            window.location = '/panel/login';
        });
    }

    function do_recovery() {
        postJSON('/user/reset-password', {
            username: $('#recovery-username').val(),
            recaptcha: token
        }, () => show_success('If an account with your email or username exists, a password reset link will be sent to your email', 0));
    }

    var requests = {
        login: do_login,
        register: do_register,
        recovery: do_recovery,
        logout: do_logout
    }

    function do_request(type) {
        var request = requests[type];

        if (request === undefined) {
            console.log('invalid operation!');
            return;
        }

        request();
    };
});