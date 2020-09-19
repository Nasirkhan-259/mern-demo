let express = require('express');
let router = express.Router();
homeScript = require('./scripts/homeScript');
// Load All Records 
router.get('/', (req, res) => {
    homeScript.listAll(req, res);
});
//Save record to database
router.post('/add/record', (req, res) => {
    homeScript.saveRecord(req, res);
});
//update record by id
router.post('/update/record/:id', (req, res) => {
    homeScript.updateRecord(req, res);
});
//delete Record by Id
router.get('/delete/record/:id', (req, res) => {
    homeScript.deleteRecord(req, res);
});
module.exports = router;