var utils = require("./utils");

module.exports = async (data) => {
    var client = await utils.getConnectedClient();
    var queryString = "INSERT INTO user_info(first_name, last_name, email_id, phone_number) VALUES($1, $2, $3, $4)";
    await client.query(queryString,[data.firstName, data.lastName, data.emailId, data.phoneNumber]);
    client.end();
}