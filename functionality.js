let tourbuttons = document.getElementsByClassName('tour');
let article = document.getElementById('article');
let asideDays = document.getElementById('day');
let asideHours = document.getElementById('time');
let asideConfirm = document.getElementById('confirm');
let structure = [article, asideDays, asideHours, asideConfirm];

let backButton = document.getElementById("back");
backButton.addEventListener('click', goBack);

let last_view = "home";
let view = "home";

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
    last_view = view;
    view = cls;
    for (let ele of structure) {
        ele.className += cls + name;
    }
}

function viewHome()     {clearClasses(); appendClass('home');}
function viewDays()     {clearClasses(); appendClass('days');}
function viewTime()     {clearClasses(); appendClass('time');}
function viewConfirm()  {clearClasses(); appendClass('confirm');}

function goBack()       {clearClasses(); appendClass(last_view)}


///// footer navigation ////
function addTitle() {}
function addMonths() {}
function addBack() {}
function addConfirm() {}

function removeTitle() {}
function removeMonths() {}
function removeBack() {}
function removeConfirm() {}