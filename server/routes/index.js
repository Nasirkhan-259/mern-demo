let express = require('express'),
    homeRouter = require('./homeRouter'),
    router = express.Router();


router.use(homeRouter);

module.exports = router;