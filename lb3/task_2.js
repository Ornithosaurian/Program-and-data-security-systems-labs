const request = require("request");

const userId = 'auth0|6626e59ce354a375d9a6668a'
const options = {
    method: 'POST',
    url: 'https://dev-aod4ob2bvys0bx6z.us.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: 'S0J18XcaYLG8iWCPwfuBS8ronDTZD5im',
        client_secret: 'AK4Kb3_sNfehx5oxZgxzx09o5KbieRQ9CgJBiB3apfHRbmJ6X5AGAjpCjBkieBm1',
        audience: 'https://dev-aod4ob2bvys0bx6z.us.auth0.com/api/v2/'
    })
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    const responseBody = JSON.parse(body);
    let token = responseBody.access_token;

    const changePasswordOptions = {
        method: 'PATCH',
        url: 'https://dev-aod4ob2bvys0bx6z.us.auth0.com/api/v2/users/' + userId,
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            password: 'new_pass_lb02',
            connection: 'Username-Password-Authentication'
        })
    };

    request(changePasswordOptions, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });
});