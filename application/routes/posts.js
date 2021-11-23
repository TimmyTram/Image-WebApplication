const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
const sharp = require('sharp');
const multer = require('multer');
const crypto = require('crypto');
const PostError = require('../helpers/error/PostError');
const { postValidator } = require('../middleware/validation');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/uploads");
    },
    filename: function(req, file, cb) {
        let fileExt = file.mimetype.split('/')[1];
        let randomName = crypto.randomBytes(22).toString("hex");
        cb(null, `${randomName}.${fileExt}`);
    }
});

const uploader = multer({storage: storage});

router.use('/createPost', uploader.single("uploadImage"), postValidator);
router.post('/createPost', (req, res, next) => {
    let fileUploaded = req.file.path;
    let fileAsThumbnail = `thumbnail-${req.file.filename}`;
    let destinationOfThumbnail = req.file.destination + "/" + fileAsThumbnail;
    let title = req.body.title;
    let description = req.body.description;
    let fk_userId = req.session.userId;

    sharp(fileUploaded)
    .resize(200)
    .toFile(destinationOfThumbnail)
    .then(() => {
        let baseSQL = `INSERT INTO posts (title, description, photopath, thumbnail, created, fk_userId) VALUE (?, ?, ?, ?, now(), ?);`;
        return db.execute(baseSQL, [title, description, fileUploaded, destinationOfThumbnail, fk_userId]);
    })
    .then(([results, fields]) => {
        if(results && results.affectedRows) {
            req.flash('success', "Your post was created successfully!");
            req.session.save((err) => {
                res.redirect('/');
            });
        } else {
            throw new PostError('Post could not be created!', '/postimage', 200);
        }
    })
    .catch((err) => {
        if(err instanceof PostError) {
            errorPrint(err.getMessage());
            req.flash('error', err.getMessage());
            res.status(err.getStatus());
            res.redirect(err.getRedirectURL());
        } else {
            next(err);
        }
    });

});

module.exports = router;