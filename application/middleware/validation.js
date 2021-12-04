const checkUsername = (username) => {
    /**
     * Regex given in video was letting _break as a username get through,
     * wrote my own regex to prevent that
     * ^ --> start of string
     * [a-zA-Z] --> set of chars abc...xyz and ABC...XYZ
     * [a-zA-Z0-9] --> set of alphanumeric characters
     * {3,} --> 3 or more occurences
     */
    let usernameChecker = /^[a-zA-Z][a-zA-Z0-9]{3,}$/
    return usernameChecker.test(username);
}

const checkPassword = (password) => {
    /**
     * REGEX EXPLANATION: (Hopefully this is correct?)
     * Within (?=.*?) --> . --> means match any character except line terminators
     * Within (?=.*?) --> *? --> means match the previous token as few times as possible
     * [A-Z] --> set of Capital letters
     * [0-9] --> set of Numbers
     * [\/*\-+!@#$^&*] --> set of Special Characeters
     * {8,} --> 8 or more characters and includes the previous capture groups
     */
    let passwordChecker = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[\/*\-+!@#$^&*]).{8,}$/;
    return passwordChecker.test(password);
}

const checkEmail = (email) => {
    // regex from https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email
    let emailChecker = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailChecker.test(email);
}

const registerValidator = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let cpassword = req.body.cpassword;
    let email = req.body.email;
    let ageVerification = req.body.ageVerification
    let agreeToTOS = req.body.agreeToTOS;

    if(!checkUsername(username)) {
        req.flash('error', 'Invalid Username!');
        req.session.save(err => {
            res.redirect('/registration');
        })
    } else if(!checkPassword(password)) {
        req.flash('error', 'Invalid Password!');
        req.session.save(err => {
            res.redirect('/registration');
        });
    } else if(!checkEmail(email)) {
        req.flash('error', 'Invalid Email!');
        req.session.save(err => {
            res.redirect('/registration');
        });
    } else if(password != cpassword) { // gotta check passwords or else user can accidentially create account with password mismatch
        req.flash('error', 'Invalid: Passwords do not match!');
        req.session.save(err => {
            res.redirect('/registration');
        });
    } else if(ageVerification !== 'on') {
        req.flash('error', 'Invalid Age!');
        req.session.save(err => {
            res.redirect('/registration');
        });
    } else if(agreeToTOS !== 'on') {
        req.flash('error', 'Invalid: You did not agree to the TOS!');
        req.session.save(err => {
            res.redirect('/registration');
        });
    } else {
        next();
    }
}

// Not sure what to do here? Kinda does the same thing as when I throw UserErrors tbh.
const loginValidator = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    if(!checkUsername(username)) {
        req.flash('error', 'Invalid Username!');
        req.session.save(err => {
            res.redirect('/login');
        })
    } else if(!checkPassword(password)) {
        req.flash('error', 'Invalid Password!');
        req.session.save(err => {
            res.redirect('/login');
        });
    } else {
        next();
    }
}

const postValidator = (req, res, next) => {
    let fileUploaded = req.file.path;
    let fileAsThumbnail = `thumbnail-${req.file.filename}`;
    let destinationOfThumbnail = req.file.destination + "/" + fileAsThumbnail;
    let title = req.body.title;
    let description = req.body.description;
    let fk_userId = req.session.userId;
    const max_title_length = 50;
    const max_description_length = 10000;
    let acceptableUsePolicy = req.body.acceptableUsePolicy; 

    if(fileUploaded.length == 0) {
       req.flash('error', 'No File was Uploaded!');
       req.session.save(err => {
           res.redirect('/postimage');
       }); 
    } else if(title.length == 0) {
        req.flash('error', 'No Title was given!');
        req.session.save(err => {
            res.redirect('/postimage');
        }); 
    } else if(title.length > max_title_length) {
        req.flash('error', `Title Length can only contain ${max_title_length} characters. You have ${title.length - max_title_length} characters too many.`);
        req.session.save(err => {
            res.redirect('/postimage');
        }); 
    } else if(description.length == 0) {
        req.flash('error', 'No Description was given!');
        req.session.save(err => {
            res.redirect('/postimage');
        }); 
    } else if(description.length > max_description_length) {
        req.flash('error', `Description can only contain ${max_description_length} characters. You have ${description.length - max_description_length} characters too many.`);
        req.session.save(err => {
            res.redirect('/postimage');
        }); 
    } else if(typeof fk_userId === 'undefined') {
        req.flash('error', 'User does not exist!');
        req.session.save(err => {
            res.redirect('/postimage');
        }); 
    } else if(acceptableUsePolicy !== 'on') {
        req.flash('error', 'Invalid: You did not agree to the Acceptable Use Policy!');
        req.session.save(err => {
            res.redirect('/postimage');
        }); 
    } else {
        next();
    }
}

module.exports = {registerValidator, loginValidator, postValidator};