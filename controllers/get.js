let utils = require('./utils');

let requestCheck = async (data) => {
    var failed = false;
    var msgs = [];
    if(Array.isArray(data) || typeof data != "object") {
        failed =true;
        msgs.push("invalid input");
    }
    for(key of Object.keys(data)) {
        if(["firstName", "lastName", "emailId", "phoneNumber"].findIndex(key) == -1) {}
        for(value of data)
    }
};

module.exports = async (data) => {

};