var router = require('express').Router();
var controllers = require('./controllers');

// create
router.route('/add').post(controllers.add);
// router.route('/get').post(controllers.get);
// router.route('/update').post(controllers.update);
// router.route('/delete').post(controllers.delete);

module.exports=router;