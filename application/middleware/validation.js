const checkUsername = (username) => {
    /**
     * REGEX EXPLANATION:
     * ^ --> start of string
     * \D --> anything not a digit
     * \w --> anything that is alphanumeric
     * {3,} --> 3 or more characters
     */
    let usernameChecker = /^\D\w{3,}$/;
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
    let email = req.body.email;

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

module.exports = {registerValidator, loginValidator};