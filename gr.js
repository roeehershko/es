let request = require('request');
let token = 'da2deace8417e1eb361efd51676724ab';
let fs = require('fs');

//4Sjhv
let contacts = fs.readFileSync('contacts.json').toString();
contacts = JSON.parse(contacts);

contacts.forEach(function (contact, key) {
        setTimeout(function () {
            addContact(contact);
            console.log('Sent');
        }, (Math.random() * 3000 + 2000) * key);
});


function addContact(contact) {
    let contactRequest = {
        name: contact.name,
        email: contact.email,
        campaign: {campaignId:'4Sjhv'},
        dayOfCycle: 0
    };

    let options = {
        url: 'https://api.getresponse.com/v3/contacts',
        method: 'POST',
        headers: {
            'X-Auth-Token': 'api-key ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactRequest)
    };
    request(options, function (err, res, body) {
        console.log(body);
    });
}