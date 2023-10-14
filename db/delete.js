var utils = require("./utils");

module.exports = async (data) => {
    var client = await utils.getConnectedClient();
    var conditionString = '';
    for(key of Object.keys(data.by)) {
        for(value of data.by[key]) {
            conditionString = conditionString + ` ${utils.dbEquivalent[key]} = '${value}' or`;
        }
    }
    conditionString = conditionString.substring(0, conditionString.length - 2);
    var queryString = `delete from user_info${(conditionString.length > 0) ?' where' : ''}${conditionString};`;
    let result = await client.query(queryString,[]);
    await client.end();
    return {
        rowCount: result.rowCount
    };
}