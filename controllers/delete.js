let db = require('../db');
let utils = require('./utils');

let requestCheck = async (data) => {
    var failed = false;
    var msgs = [];
    data = data.by;
    if(Array.isArray(data) || typeof data != "object") {
        failed = true;
        msgs.push("invalid input");
    }
    for(key of Object.keys(data)) {
        if(["id", "firstName", "lastName", "emailId", "phoneNumber"].findIndex(val => val == key) == -1 || !Array.isArray(data[key])) {
            failed = true;
            msgs.push("invalid input");
            return {failed, msgs};
        }
        if(key == "id") {
            for(firstName of data[key]) {
                if(typeof firstName != "string") {
                    failed = true;
                    msgs.push(`id should be string`);
                }
            }
        }
        if(key == "firstName") {
            for(firstName of data[key]) {
                if(typeof firstName != "string") {
                    failed = true;
                    msgs.push(`firstName should be string`);
                }
            }
        }
        if(key == "lastName") {
            for(lastName of data[key]) {
                if(typeof lastName != "string") {
                    failed = true;
                    msgs.push(`lastName should be string`);
                }
            }
        }
        if(key == "emailId") {
            for(emailId of data[key]) {
                if(typeof emailId != "string") {
                    failed =true;
                    msgs.push(`emailId should be string`);
                }
            }
        }
        if(key == "phoneNumber") {
            for(phoneNumber of data[key]) {
                if(typeof phoneNumber != "string") {
                    failed =true;
                    msgs.push(`phoneNumber should be string`);
                }
            }
        }
    }
    return {failed, msgs};
};

module.exports = async (req, res, _next) => {
    if(!req.body) {
        res.status(400);
        return res.json({
            status: "failed",
            message: "invalid input"
        });
    }
    try {
        var checkResult = await requestCheck(req.body);
        if(checkResult.failed) {
            res.status(400);
            return res.json({
                status: "failed",
                messages: checkResult.msgs
            });
        }
        let result = await db.delete(req.body);
        res.status(200);
        return res.json({
            status: "success",
            data: result
        });
    } catch (err) {
        console.log(err);
        res.status(500);
        return res.json({
            status: "failed",
            message: "Something went wrong"
        });
    }
};