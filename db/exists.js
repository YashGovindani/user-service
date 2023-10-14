var utils = require('./utils');

module.exports = async (key, value) => {
    var client = await utils.getConnectedClient();
    var queryString = `select count(*) from user_info where ${key}=$1`;
    let resp = await client.query(queryString, [value]);
    await client.end();
    return resp.rows[0].count != 0;
}