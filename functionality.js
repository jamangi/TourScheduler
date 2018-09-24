let tourbuttons = document.getElementsByClassName('tour');
let article = document.getElementById('article');
let asideDays = document.getElementById('day');
let asideHours = document.getElementById('time');
let asideConfirm = document.getElementById('confirm');
let asideConfirmImg = document.getElementById('confirmImg');
let structure = [article, asideDays, asideHours, asideConfirm, asideConfirmImg];

let title = document.getElementById("title");
let dateNav = document.getElementById("dateNav")
let backButton = document.getElementById("backButton");      backButton.addEventListener('click', goBack);
let nextButton = document.getElementById("confirmButton");   nextButton.addEventListener('click', confirm);
let navSection = [title, dateNav, backButton, nextButton]

let footerLogo = document.getElementById("footerLogo");  footerLogo.addEventListener('click', viewHome);

let view = "home";


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

function viewHome()     {clearClasses(); appendClass('home'); navSet(); u();}
function viewDays()     {clearClasses(); appendClass('days'); navSet(); h();}
function viewTime()     {clearClasses(); appendClass('time'); navSet();}
function viewConfirm()  {
    clearClasses(); appendClass('confirm'); navSet();
    let sideImg = document.getElementById('sideImg');
    sideImg.setAttribute('src', houses[selectedHouse].photo);
}

function goBack(){
    if (view === "confirm") viewTime();
    else if (view === "time") viewDays();
    else if (view === "days") viewHome();
}

function confirm(){
    if (view === "days") viewTime();
    else if (view === "time") viewConfirm();
}

function navClear() {
    for (let nav of navSection) 
        nav.style.display = "none";
}

function navSet() {
    navClear();
    if (view === "home")            {addBlock(title);}
    else if (view === "days")       {addBlock(title); addBlock(dateNav); addSpan(backButton);}
    else if (view === "time")       {addBlock(title); addSpan(backButton);}
    else if (view === "confirm")    {addBlock(title); addSpan(backButton);}

    if (view === "days" && selectedDay) addSpan(confirmButton);
    if (view === "time" && selectedHour) addSpan(confirmButton);
}

///// footer navigation ////
function addBlock(ele){ele.style.display = "block";}
function addSpan(ele){ele.style.display = "inline";}
function remove(ele){ele.style.display = "none";}