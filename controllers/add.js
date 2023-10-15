var db = require('../db');
var utils = require('./utils');

let requestCheck = async (data) => {
    var failed = false;
    var msgs = [];
    if(Object.keys(data).length != 4) {
        failed = true;
        msgs.push("invalid input");
        return {failed, msgs};
    }
    for(key of Object.keys(data)) {
        if(["firstName", "lastName", "emailId", "phoneNumber"].findIndex(val => val == key) == -1) {
            failed = true;
            msgs.push("invalid input");
            return {failed, msgs};
        }
    }
    if(!utils.isFirstNameValid(data.firstName)) {
        failed = true;
        msgs.push(`invalid first name : ${data.firstName}`);
    }
    if(!utils.isLastNameValid(data.lastName)) {
        failed = true;
        msgs.push(`invalid last name : ${data.lastName}`);
    }
    if(utils.isEmailValid(data.emailId)) {
        if (await db.exists("email_id", data.emailId)) {
            failed = true;
            msgs.push(`user exists with email : ${data.emailId}`);
        }
    } else {
        failed =true;
        msgs.push(`invalid email : ${data.emailId}`);
    }
    if(utils.isPhoneNumberValid(data.phoneNumber)) {
        if(await db.exists("phone_number", data.phoneNumber)) {
            failed = true;
            msgs.push(`user exists with phone number : ${data.phoneNumber}`);
        }
    } else {
        failed =true;
        msgs.push(`invalid phone number : ${data.phoneNumber}`);
    }
    return {failed, msgs};
};

var handleArray = async (req, res, _next) => {
    try {
        var existing = [];
        if(req.body.length == 0)
        {
            res.status(200);
            return res.json({
                status: "success",
                countOfAdded: 0
            });
        }
        for(obj of req.body) {
            var checkResult = await requestCheck(obj);
            if(checkResult.failed) {
                existing.push({
                    data: obj,
                    messages: checkResult.msgs
                });
                continue;
            } 
            await db.add(obj);
        }
        res.status(200);
        if(existing.length > 0) {
            return res.json({
                status: "failed",
                messages: existing,
                countOfAdded: req.body.length - existing.length 
            })
        }
        else {
            return res.json({
                status: "success",
                countOfAdded: req.body.length
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500);
        return res.json({
            status: "failed",
            message: "Something went wrong"
        });
    }
};

module.exports = async (req, res, _next) => {
    if(!req.body || !Array.isArray(req.body)) {
        res.status(400);
        return res.json({
            status: "failed",
            message: "invalid input"
        });
    }
    return await handleArray(req, res, _next);
};