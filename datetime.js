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
function decrementMonth() {navigation = new Date(navYear, navMonth - 1, 2); n(); re(); u(); h();}
function incrementMonth() {navigation = new Date(navYear, navMonth + 1, 2); n(); re(); u(); h();}

function h(data){
    // highlight slots taken by other people
    if (selectedHouse === null) return;

    let days_taken = houses[selectedHouse].days_taken;
    for (let d of days_taken){
        let date = new Date(d[0]);
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let hour = date.getHours();
        let takenIp = d[1];
        // console.log(year +" "+month +" "+day + " "+hour)

        if(navYear === year && navMonth === month) {
            let color = "darkgreen"
            if (takenIp === myIp) color = "#7B7263"
            let takenEle = document.getElementById("d"+day);
            takenEle.style.background = color;
            if (day == selectedDayId){
                let takenTime = document.getElementById("t"+hour);
                takenTime.style.background = color;
            } 
        }
    }

    let duration = houses[selectedHouse].duration;
    let start = new Date(duration[0]);
    let startStart = new Date(start.getFullYear(), start.getMonth(), 1)
    let end = new Date(duration[1]);
    let endEnd = new Date(end.getFullYear(), end.getMonth + 1, 0)

    if (start.getFullYear() > navYear || start.getMonth() > navMonth) allGray();
    if (end.getFullYear() < navYear || end.getMonth < navMonth) allGray();
    if (start.getFullYear() == navYear && start.getMonth() == navMonth)
        gray(startStart.getDate(), start.getDate() - 1);
    if (end.getFullYear() == navYear && end.getMonth() == navMonth)
        gray(end.getDate() + 1, endEnd.getDate());
}

function inDuration(targetDay) {
    let duration = houses[selectedHouse].duration;
    let start = new Date(duration[0]);
    let end = new Date(duration[1]);
    if (start > targetDay) {console.log('1');return false;}
    if (end < targetDay) {console.log('2');return false;}
    return true;
}

function gray(begin, end) {
    for (let i = begin; i <= end; i++){
        let takenEle = document.getElementById("d"+i);
        takenEle.style.background = "#653239";
    }
}

function allGray(){
    for (let d of days)
        d.style.background = "#653239";
}

function highlightTaken(){h();}

function n(){
    // update navigation variables
    navYear = navigation.getFullYear(); 
    navMonth = navigation.getMonth();
    navDay = navigation.getDate();
}

function re(){
    // redraw year and month on navigation
    yearEle.innerHTML = navYear;
    monthEle.innerHTML = navigation.toDateString().split(' ')[1];
}

function u(){
    for (let day of days)
        day.style.background = "none";
    // unselect
    if ((view === "time" || view === "home") && selectedHour !== null){
        selectedHour.style.background = "none";
        selectedHour.style.opacity = "1";
        selectedHour = null;
        selectedHourId = null;
    }

    if ((view === "days" || view === "home") && selectedDay !== null){
        selectedDay.style.background = "none";
        selectedDay.style.opacity = "1";
        selectedDay = null;
        selectedDayId = null;
    }

    h();
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
            if (inDuration(new Date(navYear, navMonth, num))){
                selectedDayId = num;
                selectedDay = document.getElementById(id);
            } else return;
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
        finalTime.innerHTML = modulus + suffix + "?";
    } else u();
}


function unselect(){u();}