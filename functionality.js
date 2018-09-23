let tourbuttons = document.getElementsByClassName('tour');
let article = document.getElementById('article');
let asideDays = document.getElementById('day');
let asideHours = document.getElementById('time');
let asideConfirm = document.getElementById('confirm');
let structure = [article, asideDays, asideHours, asideConfirm];

for (let button of tourbuttons) {
    button.addEventListener('click', viewDays);
}

function clearClasses() {
    for (let ele of structure) {
        ele.className = article.className.replace(/\bhome\b/g, "");
        ele.className = article.className.replace(/\bdays\b/g, "");
        ele.className = article.className.replace(/\btime\b/g, "");
        ele.className = article.className.replace(/\bconfirm\b/g, "");
    }
}

function appendClass(cls) {
    for (let ele of structure) {
        ele.className += cls + name;
    }
}

function viewHome()     {clearClasses(); appendClass('home');}
function viewDays()     {clearClasses(); appendClass('days');console.log("poke");}
function viewTime()     {clearClasses(); appendClass('time');}
function viewConfirm()  {clearClasses(); appendClass('confirm');}