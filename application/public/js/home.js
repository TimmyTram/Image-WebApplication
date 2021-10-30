/**
 * This function will fadeout the boxes and decrement photo counter
 * @param {*} event -> receive a click event
 */
function fadeout(event) {
    let div = event.path || (event.composedPath && event.composedPath());
    div = div[1];
    const pattern_photo = /(photo-)/;
    if(pattern_photo.exec(div.id)) {
        div.onclick = null;
        div.style.transition = "all 0.5s";
        div.style.opacity = 0;
        setTimeout(() => {
            div.remove();
            let counter = document.getElementById('items-counter');
            const pattern = /[0-9]{1,}/;
            let numberOfPhotos = pattern.exec(counter.innerHTML)[0];
            counter.innerHTML = `There are ${--numberOfPhotos} photo(s) being shown.`;
        }, 500);
    }
}

/**
 * This function creates a div+img and adds to given container
 * Additionally, it resizes the images to fit the page.
 * @param {*} data -> receive json
 * @param {*} containerDiv recieve html element to add to
 */
function createPhotoCard(data, containerDiv) {
    let div = document.createElement('div');
    let img = document.createElement('img');
    let h1 = document.createElement('h1');
    div.setAttribute("id", `photo-${data.id}`);
    div.setAttribute("class", "fadeout");
    img.setAttribute("src", data.url);
    div.onclick = fadeout;
    img.setAttribute("alt", "Image cannot be displayed.");
    img.style.maxWidth = "100%"; // prevents from going out horizontally
    img.style.maxHeight = "100%"; // keeps aspect ratio?
    h1.innerHTML = data.title;
    h1.setAttribute("id", `title-${data.id}`);
    div.append(img);
    div.append(h1);
    containerDiv.append(div);
}

let mainDiv = document.getElementById('item-container');

if(mainDiv) {
    let url = "https://jsonplaceholder.typicode.com/albums/2/photos";
    fetch(url)
    .then((data) => data.json())
    .then((photos) => {
        photos.forEach((photo) => {
            createPhotoCard(photo, mainDiv);
        });
        document.getElementById('items-counter').innerHTML = `There are ${photos.length} photo(s) being shown.`;
    })
}