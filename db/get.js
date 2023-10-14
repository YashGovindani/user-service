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
    var whatString = '';
    if(data.what.length == 0) whatString = ' *';
    else {
        for(column of data.what) {
            whatString = whatString + ` ${utils.dbEquivalent[column]},`;
        }
        whatString = whatString.substring(0, whatString.length - 1);
    }
    var queryString = `select${whatString} from user_info${(conditionString.length > 0) ?' where' : ''}${conditionString};`;
    let result = await client.query(queryString,[]);
    await client.end();
    return result.rows.map(row => {
        let updatedRow = {};
        for(key of Object.keys(row)) {
            updatedRow[utils.codeEquivalent[key]] = row[key];
        }
        return updatedRow;
    });
}