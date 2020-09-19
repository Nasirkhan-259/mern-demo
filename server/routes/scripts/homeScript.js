let TodoModel = require('../../models/Todo');
let fs = require('fs');
module.exports = {
    listAll: async function (req, res) {
        try {
            TodoModel.find({}, async function (err, todos) {
                if (err)
                    console.log(err);
                else {

                    res.json(todos)
                }

            })
        } catch (error) {
            return res.send({ "success": false, 'message': error })
        }

    },
    saveRecord: async function (req, res) {
        try {
            if (req.body.title == undefined || req.body.title == "") {
                return res.send({ "success": false, 'message': "Title is missing" })
            }
            if (req.body.subTitle == undefined || req.body.subTitle == "") {
                return res.send({ "success": false, 'message': "Sub Title is missing" })
            }
            if (req.body.level == undefined || req.body.level == "") {
                return res.send({ "success": false, 'message': "Level is missing" })
            }
            if (req.body.price == undefined || req.body.price == "") {
                return res.send({ "success": false, 'message': "Price is missing" })
            }
            let imagePath;
            if (req.files && req.files.image) {
                let dir = './public/uploads/';
                if (!fs.existsSync(dir)) {
                    await fs.mkdirSync(dir, { recursive: true });
                }

                let profileImage = req.files.image;
                let nowDate = Date.now();
                let imageUrl = dir + nowDate / 1000 + "" + profileImage.name;

                await profileImage.mv(imageUrl, async function (err) {
                    if (err)
                        console.log(err);
                });

                imagePath = imageUrl.substring(9);
            }
            else {
                return res.send({ "success": false, 'message': "Image is missing" })
            }
            let newEntry = new TodoModel();
            newEntry.title = req.body.title;
            newEntry.subTitle = req.body.subTitle;
            newEntry.level = req.body.level;
            if (imagePath && imagePath != "") {
                newEntry.attachment = imagePath;
            }
            newEntry.price = Number(req.body.price)
            await newEntry.save(async function (err, savedEntry) {
                if (err) {
                    console.log(err);
                    return res.send({ "success": false, 'message': err });
                }
                else {
                    return res.send({ "success": true, record: savedEntry });
                }
            })
        } catch (error) {
            return res.send({ "success": false, 'message': error });
        }
    },
    updateRecord: async function (req, res) {
        try {
            if (req.body.title == undefined || req.body.title == "") {
                return res.send({ "success": false, 'message': "Title is missing" })
            }
            if (req.body.subTitle == undefined || req.body.subTitle == "") {
                return res.send({ "success": false, 'message': "Sub Title is missing" })
            }
            if (req.body.level == undefined || req.body.level == "") {
                return res.send({ "success": false, 'message': "Level is missing" })
            }
            if (req.body.price == undefined || req.body.price == "") {
                return res.send({ "success": false, 'message': "Price is missing" })
            }
            if ((req.files == undefined || req.files == null || req.files.image == undefined) && req.body.oldImage == "") {
                return res.send({ "success": false, 'message': "Image is missing" })
            }
            let imagePath;
            if (req.files && req.files.image) {
                let dir = './public/uploads/';
                if (!fs.existsSync(dir)) {
                    await fs.mkdirSync(dir, { recursive: true });
                }

                let profileImage = req.files.image;
                let nowDate = Date.now();
                let imageUrl = dir + nowDate / 1000 + "" + profileImage.name;

                await profileImage.mv(imageUrl, async function (err) {
                    if (err)
                        console.log(err);
                });

                imagePath = imageUrl.substring(9);
            }
            TodoModel.findById({ _id: req.params.id }, async function (err, record) {
                if (err)
                    console.log(err);
                else {
                    if (record != null) {
                        record.title = req.body.title;
                        record.subTitle = req.body.subTitle;
                        record.level = req.body.level;
                        if (imagePath && imagePath != "") {
                            record.attachment = imagePath;
                        }
                        record.price = Number(req.body.price)

                        record.save().then(todo => {
                            res.json({ 'success': true, record: todo });
                        })
                            .catch(err => {
                                res.status(400).send("Update not possible");
                            });
                    }
                    else {
                        res.json('no record found');
                    }
                }
            })
        } catch (error) {
            console.log(error);
            return res.send({ "success": false, 'message': error });
        }

    },
    deleteRecord: async function (req, res) {
        try {
            let record = await TodoModel.deleteOne({ _id: req.params.id });
            return res.send({ "success": true, record: req.params.id });
        } catch (error) {
            return res.send({ "success": false, 'message': error });
        }
    },
    getRecord: async function (req, res) {
        try {
            let record = await TodoModel.findById({ _id: req.params.id });
            return res.send({ "success": true, record});
        } catch (error) {
            return res.send({ "success": false, 'message': error });
        }
    }
};