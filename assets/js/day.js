const day = new URLSearchParams(location.search).get("day");
const backBtn = document.querySelector('#back');

let redirectURL = 'index.html';

const redirectPage = function (url) {
    redirectURL = url;
    location.assign(url);
  };


backBtn.addEventListener('click', function() {redirectPage('index.html')}); 