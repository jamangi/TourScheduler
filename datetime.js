let myDate = new Date();
let myYear = myDate.getFullYear();
let myMonth = myDate.getMonth();
let myDay = myDate.getDate();

let navigation = new Date(myYear, myMonth, 1);
let navYear; // doubles as selected year
let navMonth; // doubles as selected month
let navDay;

let selection = new Date();

let selectedDay;
let selectedHour;
let selectedDayId;
let selectedHourId;

let selectedEle;
let hoursSelected = 0;
/////////  HTML Elements  /////////////
let yearEle = document.getElementById("year")
let monthEle = document.getElementById("month")

let last = document.getElementById("last"); last.addEventListener('click', decrementMonth);
let next = document.getElementById("next"); next.addEventListener('click', incrementMonth);

n();
re();

let days = document.getElementsByClassName('box day');
let times = document.getElementsByClassName('box time');
for(let day of days) day.addEventListener('click', selectDay);
for(let hour of times) hour.addEventListener('click', selectHour);

//////// Navigation Functions ///////////
function decrementMonth() {navigation = new Date(navYear, navMonth - 1, 1); n(); re();}
function incrementMonth() {navigation = new Date(navYear, navMonth + 1, 1); n(); re();}

function n(){
    navYear = navigation.getFullYear(); 
    navMonth = navigation.getMonth();
    navDay = navigation.getDate();
}

function re(){
    yearEle.innerHTML = navYear;
    monthEle.innerHTML = navigation.toDateString().split(' ')[1];
}

function u(){
    if (selectedDay !== undefined && selectedHour === undefined){
        selectedDay.style.background = "none";
        selectedDay = undefined;
        selectedDayId = undefined;
    }

    if (selectedHour !== undefined){
        selectedHour.style.background = "none";
        selectedHour = undefined;
        selectedHourId = undefined;
    }

    remove(nextButton);
}
//////// Selection Functions /////////

function colorSelected(){}

function selectDay(){
    u();
    let id = this.getAttribute('id')    
    if (id !== null){
        selectedDayId = id.substring(1);
        addSpan(nextButton);
        selectedEle = document.getElementById(id);

        selectedDay = document.getElementById(id);
        selectedDay.style.background = "darkblue";
        selectedDay.style.opacity = "0.8";
    } else u();
}

function selectHour(){
    let id = this.getAttribute('id') 
    selectedHourId = this.getAttribute('id').substring(1);
    addSpan(nextButton);
}

function unselect(){u();}