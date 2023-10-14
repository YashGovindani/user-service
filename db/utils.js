const {Client } = require('pg');
const config = require('../config').db;

const connectionString = `postgres://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`;

var getClient = () => {
    var client = new Client(connectionString);
    return client;
}

var getConnectedClient = async () => {
    let client = getClient();
    await client.connect();
    return client;
}

var dbEquivalent = {
    "firstName": "first_name",
    "lastName": "last_name",
    "emailId": "email_id",
    "phoneNumber": "phone_number",
    "id": "id"
}

var codeEquivalent = {
    "first_name": "firstName",
    "last_name": "lastName",
    "email_id": "emailId",
    "phone_number": "phoneNUmber",
    "id": "id"
}

module.exports = {
    getClient,
    getConnectedClient,
    dbEquivalent,
    codeEquivalent
}