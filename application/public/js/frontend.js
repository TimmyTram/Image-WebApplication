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

function setFlashMessageFadeOut() {
    setTimeout(() => {
        let currentOpacity = 1.0;
        let timer = setInterval(() => {
            if(currentOpacity < 0.05) {
                clearInterval(timer);
                flashElement.remove();
            }
            currentOpacity -= 0.05;
            flashElement.style.opacity = currentOpacity;
        }, 50);
    }, 4000);
}

let flashElement = document.getElementById('flash-message');
if(flashElement) {
    setFlashMessageFadeOut();
}
