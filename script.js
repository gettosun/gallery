let input = document.querySelector('input');
const tap = document.querySelector('button'),
      body = document.querySelector('.body'),
      gallery = document.querySelector('.gallery');
let pageNum = 1;
let searchReq = 'popular';
let url = `https://api.unsplash.com/search/photos?page=${pageNum}>;orientation=landscape;query=${searchReq}&per_page=12&client_id=3_irHGSQ57-FwWpUUV1-3PmfKksCXsOE27EgUUCGHQU`;
const imageQuantity = document.querySelector('.image-quantity'),
      pageQuantity = document.querySelector('.page-quantity'),
      currentPage = document.querySelector('.current-page');
const prevBut = document.querySelector('.prev'),
      nextBut = document.querySelector('.next');
const preview = document.querySelectorAll('.gallery-item'),
      close = document.querySelector('.close');
const popup = document.querySelector('.popup'),
      overlay = document.querySelector('.overlay');
let linksArr = [];
const nextImg = document.querySelector('.next-image'),
      prevImg = document.querySelector('.prev-image');


getData(url);

input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        tap.click();
        }
});

tap.addEventListener('click', () => {
    pageOne();
    searchReq = input.value;
    url = `https://api.unsplash.com/search/photos?page=${pageNum}>;orientation=landscape;query=${searchReq}&per_page=12&client_id=3_irHGSQ57-FwWpUUV1-3PmfKksCXsOE27EgUUCGHQU`;
    getData(url);
    gallery.innerHTML = '';
});

function pageOne() {
    pageNum = 1;
}

function pagePlus() {
    pageNum = pageNum + 1;
}

function pageMinus() {
    pageNum = pageNum - 1;
    if (pageNum < 1) {
        pageNum = 1;
    }
}

nextBut.addEventListener('click', () => {
    pagePlus();
    searchReq = input.value;
    if (input.value === '') {
        searchReq = 'popular';
    }
    url = `https://api.unsplash.com/search/photos?page=${pageNum}>;orientation=landscape;query=${searchReq}&per_page=12&client_id=3_irHGSQ57-FwWpUUV1-3PmfKksCXsOE27EgUUCGHQU`;
    getData(url);
    
    gallery.innerHTML = '';
});

prevBut.addEventListener('click', () => {
    pageMinus();
    searchReq = input.value;
    if (input.value === '') {
        searchReq = 'popular';
    }
    url = `https://api.unsplash.com/search/photos?page=${pageNum}>;orientation=landscape;query=${searchReq}&per_page=12&client_id=3_irHGSQ57-FwWpUUV1-3PmfKksCXsOE27EgUUCGHQU`;
    getData(url);
    
    gallery.innerHTML = '';
});

async function getData(url) {
    const res = await fetch(url);
    const data = await res.json();
    const dataArr = data.results.map(i => i.urls.regular);
    
    dataArr.map(el => linksArr.push(el));
    imageQuantity.textContent = `${data.total}`;
    pageQuantity.textContent = `${data.total_pages}`;
    currentPage.textContent = `${pageNum}`;

    for (i = 0; i < dataArr.length; i++) {
        const galleryItem = `<div class="gallery-item" style="background-image: url(${dataArr[i]});"><a class="gallery-link" href="${dataArr[i]}" target="_blank"></a></div>`;
        gallery.insertAdjacentHTML('beforeend', galleryItem);
    }

    /* console.log(dataArr); */
    
    if (dataArr.length === 0) {
        const oopsMessage = `<div class="oops-message"><h2>OOOPS! <br> There is no matches with your request <br> Try again</h2></div>`;
        gallery.insertAdjacentHTML('beforeend', oopsMessage);
    }
    
    //console.log(linksArr);
}
gallery.addEventListener('click', function(event) {
    if (event.target.matches('.gallery-link')) {
        event.preventDefault();
        popupOn(event.target.href);
    }
});

overlay.addEventListener('click', function() {
    popup.classList.remove('popup_active');
    overlay.classList.remove('overlay_active');
    body.classList.remove('body_fixed');
});

function popupOn(link) {
    popup.classList.add('popup_active');
    overlay.classList.add('overlay_active');
    body.classList.add('body_fixed');
    popup.style.backgroundImage = `url(${link})`;
}
nextImg.addEventListener('click', function() {
    const imgLink = popup.style.backgroundImage.slice(5, -2);
    const imgIndex = linksArr.indexOf(imgLink);
    if(imgIndex === linksArr.length - 1) {
        popupOn(linksArr[0]);
    } else {
        popupOn(linksArr[imgIndex + 1]);
    }
});
prevImg.addEventListener('click', function() {
    const imgLink = popup.style.backgroundImage.slice(5, -2);
    const imgIndex = linksArr.indexOf(imgLink);
    if(imgIndex === 0) {
        popupOn(linksArr[linksArr.length - 1]);
    } else {
        popupOn(linksArr[imgIndex - 1]);
    }
});

console.log(body);