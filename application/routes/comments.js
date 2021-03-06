const express = require('express');
const router = express.Router();
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
const { create } = require('../models/Comments');

router.post('/create', (req, res, next) => {
    if(!req.session.username) {
        errorPrint("Must be logged in to comment.");
        res.json({
            code: -1,
            status: "danger",
            message: "Must be logged in to create a comment"
        });
    } else {
        let {comment, postId} = req.body;
        let username = req.session.username;
        let userId = req.session.userId;
        create(userId, postId, comment)
        .then((wasSuccessful) => {
            if(wasSuccessful !== -1) {
                successPrint(`Comment was created for ${username}`);
                res.json({
                    code: 1,
                    status: "success",
                    message: "Comment created.",
                    comment : comment,
                    username : username,
                    commentId: wasSuccessful
                });
            } else {
                errorPrint("Comment was not saved.");
                res.json({
                    code: -1,
                    status: "danger",
                    message: "Comment was not created."
                });
            }
        })
        .catch((err) => next(err));
    }
});


module.exports = router;