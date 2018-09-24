let myDate = new Date();
let myYear = myDate.getFullYear();
let myMonth = myDate.getMonth();
let myDay = myDate.getDate();

let navigation = new Date(myYear, myMonth, 1);
let navYear = null; // doubles as selected year
let navMonth = null; // doubles as selected month
let navDay = null;

let selection = new Date();

let selectedDay = null;
let selectedHour = null;
let selectedDayId = null;
let selectedHourId = null;

let selectedEle = null;
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
for(let day of days) day.addEventListener('click', select);
for(let hour of times) hour.addEventListener('click', select);

let finalDate = document.getElementById('finalDate');
let finalTime = document.getElementById('finalTime');

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

    if (view === "time" && selectedHour !== null){
        selectedHour.style.background = "none";
        selectedHour.style.opacity = "1";
        selectedHour = null;
        selectedHourId = null;
    }

    if (view === "days" && selectedDay !== null){
        selectedDay.style.background = "none";
        selectedDay.style.opacity = "1";
        selectedDay = null;
        selectedDayId = null;
    }


    remove(nextButton);
}
//////// Selection Functions /////////

function colorSelected(){}

function select(){
    u();

    let id = this.getAttribute('id');
    if (id !== null){
        let num = id.substring(1);
        let type = id.substring(0, 1);
        if (type === 'd') {
            selectedDayId = num;
            selectedDay = document.getElementById(id)
        }
        else if (type === 't') {
            selectedHourId = id.substring(1);
            selectedHour = document.getElementById(id);
        }

        addSpan(nextButton);
        selectedEle = document.getElementById(id);
        selectedEle = document.getElementById(id);
        selectedEle.style.background = "darkblue";
        selectedEle.style.opacity = "0.7";
        
        // finalDate.innerHTML = navYear + '-' + navMonth + '-' + selectedDayId;
        finalDate.innerHTML = new Date(navYear, navMonth, selectedDayId).toDateString();

        let suffix = selectedHourId > 11 ? 'pm' : 'am';
        let modulus = selectedHourId % 12;

        if (modulus === 0) modulus = 12;
        finalTime.innerHTML = modulus + suffix;
    } else u();
}


function unselect(){u();}