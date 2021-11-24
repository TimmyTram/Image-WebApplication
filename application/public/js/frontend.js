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

function setFlashMessageFadeOut(flashMessageElement) {
    setTimeout(() => {
        let currentOpacity = 1.0;
        let timer = setInterval(() => {
            if(currentOpacity < 0.05) {
                clearInterval(timer);
                flashMessageElement.remove();
            }
            currentOpacity -= 0.05;
            flashMessageElement.style.opacity = currentOpacity;
        }, 50);
    }, 4000);
}

function addFlashFromFrontEnd(message) {
    let flashMessageDiv = document.createElement('div');
    let innerFlashDiv = document.createElement('div');
    let innerI = document.createElement('i');
    let innerSpan = document.createElement('span');
    let outerI = document.createElement('i');
    outerI.setAttribute('class', 'fas fa-check-circle');
    let innerTextNode = document.createTextNode(" " + message + " ");
    innerSpan.appendChild(innerTextNode);
    innerSpan.appendChild(outerI);
    innerI.appendChild(innerSpan);
    innerFlashDiv.appendChild(innerI);
    flashMessageDiv.appendChild(innerFlashDiv);
    flashMessageDiv.setAttribute('id', 'flash-message');
    innerFlashDiv.setAttribute('id', 'flash-success');
    innerI.setAttribute('class', 'fas fa-check-circle');
    document.getElementsByTagName('body')[0].appendChild(flashMessageDiv);
    setFlashMessageFadeOut(flashMessageDiv);
}

function createCard(postData) {
    return `
    <div id="post-${postData.id}" class="card">
        <img src=${postData.thumbnail} alt="Missing Image.">
        <div class="card-body">
            <p class="card-title">${postData.title}</p>
            <p class="card-text">${postData.description}</p>
            <a href="/post/${postData.id}" class="anchor-buttons"><i class="fas fa-info-circle"></i> Post Details</a>
        </div>
    </div>
        `;
}

function executeSearch() {
    let searchTerm = document.getElementById('search-bar').value;
    if(!searchTerm) {
        location.replace('/');
        return;
    }
    let mainContent = document.getElementById('main-content');
    let searchUrl = `/posts/search?search=${searchTerm}`;
    fetch(searchUrl)
    .then((data) => {
        return data.json();
    })
    .then((data_json) => {
        let newMainContentHTML = '';
        let counter = 0;
        data_json.results.forEach((row) => {
            if(counter < 8) {
                newMainContentHTML += createCard(row);
            }
            counter++;
        });
        
        mainContent.innerHTML = newMainContentHTML;

        if(data_json.message) {
            addFlashFromFrontEnd(data_json.message);
        }
    })
    .catch((err) => console.log(err));
}

let flashElement = document.getElementById('flash-message');
if(flashElement) {
    setFlashMessageFadeOut(flashElement);
}

let searchButton = document.getElementById('search-button');
if(searchButton) {
    searchButton.onclick = executeSearch;
}