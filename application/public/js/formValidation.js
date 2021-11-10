var passwordToMatch = ""; // not sure if its good pratice to store this here, but I can't return with my validationPassword cuz its in an eventListener
var valid_username = false;
var valid_email = false;
var valid_password = false;
var valid_confirm_password = false;

// ugly code blocks below
const usernameElement = document.getElementById('username');
const usernameErrorContainer = document.getElementById('username-error-container');
usernameElement.addEventListener('input', (event) => { valid_username = validateUsername(event) }); // validates while text is being typed 
usernameElement.addEventListener('focus', () => {showDisplay(usernameErrorContainer)}); // shows text when focused
usernameElement.addEventListener('blur', () => {hideDisplay(usernameErrorContainer)}); // hides text when unfocused

const emailElement = document.getElementById('email');
const emailErrorContainer = document.getElementById('email-error-container');
emailElement.addEventListener('input', (event) => { valid_email = validateEmail(event)});
emailElement.addEventListener('focus', () => {showDisplay(emailErrorContainer)});
emailElement.addEventListener('blur', () => {hideDisplay(emailErrorContainer)});

const passwordElement = document.getElementById('password');
const passwordErrorContainer = document.getElementById('password-error-container');
passwordElement.addEventListener('input', (event) => { valid_password = validatePassword(event)});
passwordElement.addEventListener('focus', () => {showDisplay(passwordErrorContainer)});
passwordElement.addEventListener('blur', () => {hideDisplay(passwordErrorContainer)});

const confirmPasswordElement = document.getElementById('confirm-password');
const confirmPasswordErrorContainer = document.getElementById('confirm-password-error-container');
confirmPasswordElement.addEventListener('input', (event) => { valid_confirm_password = validateConfirmPassword(event) });
confirmPasswordElement.addEventListener('focus', () => {showDisplay(confirmPasswordErrorContainer)});
confirmPasswordElement.addEventListener('blur', () => {hideDisplay(confirmPasswordErrorContainer)});

const formSubmitButton = document.getElementById('registration-form');
formSubmitButton.addEventListener('submit', (event) => {validateForm(event)});

let eyecon = document.querySelectorAll('.eye-con');
eyecon.forEach((item) => {
    var itemClass = item;
    item.addEventListener('click', () => {
        togglePassword(itemClass, itemClass.parentNode);
    });
});


/**
 * Toggles password input from password to text and font awesome eye to slash and non-slash eye.
 * @param {*} eye a span tag that contains a child <i class="fas {some font awesome icon here}">.
 * @param {*} container a div that is the parent of eye.
 */
function togglePassword(eye, container) { 
    const passwordInput = container.children[0];
    const fontAwesomeEye = eye.children[0];
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    const eyeType =  fontAwesomeEye.getAttribute('class') === 'fas fa-eye' ? 'fas fa-eye-slash' : 'fas fa-eye';
    passwordInput.setAttribute('type', type);
    fontAwesomeEye.className = eyeType;
}

/**
 * validates form by checking global booleans
 * @returns true or false depending if all criteria has been met.
 */
function validateForm(event) {
    //event.preventDefault();
    let valid = true;
    if(!valid_username) {
        usernameElement.focus();
        valid = false;
    } else if(!valid_email) {
        emailElement.focus();
        valid = false;
    } else if(!valid_password) {
        passwordElement.focus();
        valid = false;
    } else if(!valid_confirm_password) {
        confirmPasswordElement.focus();
        valid = false;
    }

    // temporary if statement to just check that form has been received properly
    // if(valid) {
    //     alert("[This is a test] : SUBMISSION RECEIVED");
    // }

    return valid;
}

/**
 * Function that will be used by all validation functions to create tags to show requirements to the user
 * @param {string} typeOfReq-> This is a string to which div element to add to
 * @param  {...any} args -> this will display any number of args as requirements 
 */
function displayRequirements(typeOfReq, container, ...args) {
    args.forEach((element, index) => {
        if(document.getElementById(`${typeOfReq}-${index}`) === null) {
            let p = document.createElement('p');
            p.setAttribute("id", `${typeOfReq}-${index}`);
            p.innerHTML =  `&#10008 ${Object.keys(element)[0]}`; // heavy cross HTML CODE Character
            p.style.color = "#ff0000";
            p.style.fontSize = "20px";
            container.append(p);
            container.style.opacity = "1";       
        } else if(document.getElementById(`${typeOfReq}-${index}`) !== null) {
            let p = document.getElementById(`${typeOfReq}-${index}`);
            if(Object.values(element)[0]) {
                p.style.color = "#00D100";
                p.innerHTML =  `&#10004 ${Object.keys(element)[0]}`; // heavy checkmark HTML CODE Character
            } else if(!Object.values(element)[0]) {
                p.style.color = "#ff0000";
                p.innerHTML =  `&#10008 ${Object.keys(element)[0]}`;
            }
        }
    });
}

/**
 * This function will show the displayed text by reseting the font size for every text node
 * @param {*} container a parameter that is a html element that holds the error paragraph text
 */
function showDisplay(container) {
    let errorText = container.childNodes;

    if(container.hasChildNodes()) {
        errorText.forEach(element => {
            element.style.fontSize = "20px";
        })
        container.style.opacity = "1";
    }
}

/**
 * This function will hide the requirements by setting font size to 0 to stop grid from resizing
 * @param {*} container a parameter that is a html element that holds the error paragraph text
 */
function hideDisplay(container) {
    let errorText = container.childNodes;
    if(container.hasChildNodes()) {
        errorText.forEach(element => {
            element.style.fontSize = "0px";
        })
        container.style.opacity = "0";
    }
}

/**
 * This function uses regex to check if username meets the requirements and calls a displayRequirement function to display on html page
 * @param {event} event to receive username from input tag
 */
function validateUsername(event) {
    let username = event.target.value;
    usernameElement.style.outlineColor = "#ff0000";
    let isValidStart = false;
    let isAlphanumeric = false;
    let isValidUsername = false;
    // hopefully these regex patterns actually work
    const pattern_start = /^[a-zA-Z]/; // regex pattern for 1st char to be an alphabetical character
    const pattern_alphanumeric = /[a-zA-Z0-9]{3,}/; // regex pattern for first 3 characters or more to be alphanumeric (not using \w because underscores)
    const req_start = "Username Begins with a character";
    const req_alphanumeric = "Username has at least 3 alphanumeric characters";

    // logic to make thing pop out and red green text if right or wrong
    if(pattern_start.test(username)) {
        isValidStart = true;
    }

    if(pattern_alphanumeric.test(username)) {
        isAlphanumeric = true;
    }

    // gotta put this here so booleans are true and not always false
    //displayRequirements("username-error", req_start, req_alphanumeric, isValidStart, isAlphanumeric);
    displayRequirements("username-error", usernameErrorContainer, {[req_start] : isValidStart}, {[req_alphanumeric] : isAlphanumeric});

    if(isValidStart && isAlphanumeric) {
        usernameElement.style.outlineColor = "#34b233";
        isValidUsername = true;
        //console.log("valid username");
    }
    return isValidUsername;
}

/**
 * This function uses regex to change css and create html error tags (pulled email regex from mozilla just to make sure)
 * @param {event} event receive email from user
 */
function validateEmail(event) {
    let email = event.target.value;
    let isValid = false;
    emailElement.style.outlineColor = "#ff0000";
    const req_text = "Email is valid";
    // regex from https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email
    const pattern_email = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if(pattern_email.test(email)) {
        //console.log("valid email");
        emailElement.style.outlineColor = "#34b233";
        isValid = true;
    } 
    displayRequirements("email-error", emailErrorContainer, {[req_text] : isValid})
    return isValid;
}

/**
 * Has 4 checks before it is a valid email, have to check one by one to pass to display function and update in real time
 * @param {event} event receive password from user
 */
function validatePassword(event) {
    let password = event.target.value;
    passwordElement.style.outlineColor = "#ff0000";
    let isValidPassword = false;
    let isValidLength = false;
    let hasUpper = false;
    let hasNum = false;
    let hasSpecial = false;
    
    // hopefully these patterns is correct
    //const pattern = /[A-Z]{1,}[(/*\-+!@#$^&*)]{1,}[0-9]{1,}[a-zA-Z0-9(/*\-+!@#$^&*)]{8,}/; <= If i wanted just one pattern
    const pattern_length = /[a-zA-Z0-9(/*\-+!@#$^&*)]{8,}/;
    const pattern_upper = /[A-Z]{1,}/;
    const pattern_num = /[0-9]{1,}/;
    const pattern_special = /[(/*\-+!@#$^&*)]{1,}/;
    const req_length = "Has at least 8 characters";
    const req_upper = "Has at least 1 Upper Case letter";
    const req_num = "Has at least 1 Number Case letter";
    const req_special = "Has at least 1 of the following: (/*-+!@#$^&*)";

    if(pattern_length.test(password)) {
        isValidLength = true;
    }
    if(pattern_upper.test(password)) {
        hasUpper = true;
    }
    if(pattern_num.test(password)) {
        hasNum = true;
    }
    if(pattern_special.test(password)) {
        hasSpecial = true;
    }

    displayRequirements("password-error", passwordErrorContainer, 
    {[req_length] : isValidLength}, {[req_upper] : hasUpper}, 
    {[req_num] : hasNum}, {[req_special] : hasSpecial}
    );

    if(isValidLength && hasUpper && hasNum && hasSpecial) {
        isValidPassword = true;
        passwordElement.style.outlineColor = "#34b233";
        passwordToMatch = password;
        //console.log(passwordToMatch);
    }
    return isValidPassword;
}

/**
 * Matches password
 * @param {event} event recieve password from user
 */
function validateConfirmPassword(event) {
    let confirmPassword = event.target.value;
    let isValid = false;
    const req_text = "Passwords match!";
    if(confirmPassword === passwordToMatch) {
        isValid = true;
        //console.log("passwords match!");
    }
    displayRequirements("confirm-password-error", confirmPasswordErrorContainer, {[req_text] : isValid});
    return isValid;
}

