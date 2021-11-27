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

var state = {
    page: 0,
    content: []
};

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
        content = [];
        data_json.results.forEach((row) => {
            newMainContentHTML += createCard(row);
            counter++;
            if(counter == 8) {
                content.push(newMainContentHTML);
                newMainContentHTML = '';
                counter = 0;
            }
        });
        content.push(newMainContentHTML);
        state.content = content;
        mainContent.innerHTML = content[0];
        buildPaginator(state);
        if(data_json.message) {
            addFlashFromFrontEnd(data_json.message);
        }
    })
    .catch((err) => console.log(err));
}

/**
 * If I had more time, I would've properly implemented the neighbor buttons, but this will have to do for now.
 */
function buildPaginator(state) {
    if(document.getElementById('page-bar')) {
        document.getElementById('specific-page-number').innerText = 1;
        state.page = 0;
        return; // please do not build another bar, thank you.
    }
    let pageBarContainer = document.getElementById('page-bar-container');
    let pageBar = document.createElement('div');
    let pageBack = document.createElement('div');
    let pageForward = document.createElement('div');
    let previousButton = document.createElement('button');
    let nextButton = document.createElement('button');
    let initialButton = document.createElement('button');
    let lastButton = document.createElement('button');
    pageBack.setAttribute('id', 'page-back-buttons');
    pageForward.setAttribute('id', 'page-forward-buttons');
    initialButton.setAttribute('id', 'initial-button');
    previousButton.setAttribute('id', 'previous-button');
    nextButton.setAttribute('id', 'next-button');
    lastButton.setAttribute('id', 'last-button');
    pageBar.setAttribute('id', 'page-bar');
    initialButton.innerText = '<<';
    previousButton.innerText = '<';
    nextButton.innerText = '>';
    lastButton.innerText = '>>';
    let specificPageNumber = document.createElement('div');
    specificPageNumber.setAttribute('id', 'specific-page-number');
    specificPageNumber.innerText = 1;
    
    let mainContent = document.getElementById('main-content');
    initialButton.onclick = (event) => {
        if(event.target.id === 'initial-button') {
            mainContent.innerHTML = state.content[0];
            state.page = 0;
            specificPageNumber.innerText = 1;
        }
    }

    lastButton.onclick = (event) => {
        if(event.target.id === 'last-button') {
            if(state.content[state.content.length - 1] !== "") {
                mainContent.innerHTML = state.content[state.content.length - 1];
                state.page = state.content.length - 1;
                specificPageNumber.innerText = state.page + 1;
            }
        }
    }
    
    nextButton.onclick = (event) => {
        if(event.target.id === 'next-button') {
            if(state.page < state.content.length - 1) {
                mainContent.innerHTML = state.content[++state.page];
                specificPageNumber.innerText = state.page + 1;
            }
        }
    }
    
    previousButton.onclick = (event) => {
        if(event.target.id === 'previous-button') {
            if(state.page > 0) {
                mainContent.innerHTML = state.content[--state.page];
                specificPageNumber.innerText = state.page + 1;
            }
        }
    }
    pageBack.appendChild(initialButton);
    pageBack.appendChild(previousButton);
    pageBar.appendChild(pageBack);
    pageForward.appendChild(nextButton);
    pageForward.appendChild(lastButton);
    pageBar.appendChild(specificPageNumber);
    pageBar.appendChild(pageForward);
    pageBarContainer.appendChild(pageBar);
}

let flashElement = document.getElementById('flash-message');
if(flashElement) {
    setFlashMessageFadeOut(flashElement);
}

let searchButton = document.getElementById('search-button');
if(searchButton) {
    searchButton.onclick = executeSearch;
}


/*
CODE GRAVEYARD: (buildPaginator)
for(var i = 1; (i <= state.content.length) && (i <= state.maxButtonsPerPage); i++) {
        if(state.content[i - 1] !== "") {
            let button = document.createElement('button');
            button.setAttribute('class', 'specific-page-button');
            button.innerText = i;
            specificPageBar.appendChild(button);
        }
    }

    specificPageBar.onclick = (event) => {
        if(event.target.className === 'specific-page-button') {
            let mainContent = document.getElementById('main-content');
            mainContent.innerHTML = state.content[event.target.innerText - 1];
            state.page = parseInt(event.target.innerText);
        }
    }

*/