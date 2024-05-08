const request = require("request");

const options = {
    method: 'POST',
    url: 'https://dev-aod4ob2bvys0bx6z.us.auth0.com/oauth/token',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: {
        grant_type: 'password',
        username: 'momot.arkadii@lll.kpi.ua',
        password: 'qwerty_lb02',
        audience: 'https://dev-aod4ob2bvys0bx6z.us.auth0.com/api/v2/',
        client_id: 'S0J18XcaYLG8iWCPwfuBS8ronDTZD5im',
        scope: 'offline_access',
        client_secret: 'AK4Kb3_sNfehx5oxZgxzx09o5KbieRQ9CgJBiB3apfHRbmJ6X5AGAjpCjBkieBm1'
    }
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);
    const responseBody = JSON.parse(body);

    let refreshToken = responseBody.refresh_token;
    console.log(body);

    const options2 = {
        method: 'POST',
        url: 'https://dev-aod4ob2bvys0bx6z.us.auth0.com/oauth/token',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        form: {
            grant_type: 'refresh_token',
            client_id: 'S0J18XcaYLG8iWCPwfuBS8ronDTZD5im',
            client_secret: 'AK4Kb3_sNfehx5oxZgxzx09o5KbieRQ9CgJBiB3apfHRbmJ6X5AGAjpCjBkieBm1',
            refresh_token: refreshToken
        }
    };

    request(options2, function (error, response, body) {
        if (error) throw new Error(error); console.log(body);
    });
});
