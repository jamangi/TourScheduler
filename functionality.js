let tourbuttons = document.getElementsByClassName('tour');
let article = document.getElementById('article');
let asideDays = document.getElementById('day');
let asideHours = document.getElementById('time');
let asideConfirm = document.getElementById('confirm');
let asideConfirmImg = document.getElementById('confirmImg');
let structure = [article, asideDays, asideHours, asideConfirm, asideConfirmImg];

let title = document.getElementById("title");
let dateNav = document.getElementById("dateNav")
let backButton = document.getElementById("backButton");         backButton.addEventListener('click', goBack);
let nextButton = document.getElementById("confirmButton");   nextButton.addEventListener('click', confirm);
let navSection = [title, dateNav, backButton, nextButton]

let view = "home";

for (let button of tourbuttons) {
    button.addEventListener('click', viewDays);
}

viewHome();


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

function viewHome()     {clearClasses(); appendClass('home'); navSet();}
function viewDays()     {clearClasses(); appendClass('days'); navSet();}
function viewTime()     {clearClasses(); appendClass('time'); navSet();}
function viewConfirm()  {clearClasses(); appendClass('confirm'); navSet();}

function goBack(){
    u();
    if (view === "confirm") viewDays();
    else if (view === "time") viewDays();
    else if (view === "days") viewHome();
}

function confirm(){
    if (view === "days") viewTime();
    else if (view === "time") viewConfirm();
    else if (view === "confirm") viewTime();
}

function navClear() {
    for (let nav of navSection) 
        nav.style.display = "none";
}

function navSet() {
    navClear();
    if (view === "home")            {addBlock(title); addBlock(dateNav);}
    else if (view === "days")       {addBlock(title); addBlock(dateNav); addSpan(backButton);}
    else if (view === "time")       {addBlock(title); addSpan(backButton);}
    else if (view === "confirm")    {addBlock(title); addSpan(backButton);}
}

///// footer navigation ////
function addBlock(ele){ele.style.display = "block";}
function addSpan(ele){ele.style.display = "inline";}
function remove(ele){ele.style.display = "none";}