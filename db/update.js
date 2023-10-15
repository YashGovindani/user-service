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
    var updateString = '';
    for(key of Object.keys(data.update)) {
        updateString = updateString + ` ${utils.dbEquivalent[key]} = '${data.update[key]}',`;
    }
    updateString = updateString.substring(0, updateString.length - 1);
    var queryString = `update user_info set${updateString}${(conditionString.length > 0) ?' where' : ''}${conditionString};`;
    await client.query(queryString,[]);
    await client.end();
}