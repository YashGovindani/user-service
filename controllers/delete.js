var db = require('../db');

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
        for(val of data[key]) {
            if(typeof val != "string") {
                failed = true,
                msgs.push(`${key} should be string`);
                break;
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
        await db.delete(req.body);
        res.status(200);
        return res.json({
            status: "success"
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