let finalConfirmButton = document.getElementById('finalConfirm');
let finalCancelButton = document.getElementById('finalCancel');
let finalMethod = document.getElementById('finalMethod');
let ipDiv = document.getElementById('ip')

let houses = {};
let myIp = '';
let service = 'http://localhost:7000/';
let selectedHouse = null;

finalConfirmButton.addEventListener("click", finalConfirm);
finalCancelButton.addEventListener("click", goBack);

useRoute('get_ip', [setMyIp]);
useRoute('houses', [setHouses]);

function update(data){for (let house of data) houses[house.id] = house;}
function autoUpdate(){
    useRoute('houses', [update, h]);
}

function setMyIp(data) {myIp = data.ip; ipDiv.innerHTML = "ip: " + data.ip;}
function setHouses(data) {
    for (let house of data){
        houses[house.id] = house;

        let section = document.createElement('section');
        let h1Addr = document.createElement('h1');
        let imgDiv = document.createElement('div');
        let img = document.createElement('img');
        let tourDiv = document.createElement('div');
        let desc = document.createElement('p');

        section.setAttribute('data-houseId', house.id);

        h1Addr.innerHTML = house.address;
        img.setAttribute('src', house.photo);
        desc.innerHTML = dummyDesc();
        tourDiv.setAttribute('class', 'tour');
        tourDiv.innerHTML = "Tour House";

        imgDiv.append(img)
        section.append(h1Addr); section.append(imgDiv); 
        section.append(tourDiv); section.append(desc);
        article.append(section);
    }

    for (let button of tourbuttons)
        button.addEventListener('click', tourHouse);
    
}

function tourHouse() {
    selectedHouse = this.parentElement.getAttribute("data-houseId");
    viewDays();
}

function alreadyRegistered() {
    let days_taken = houses[selectedHouse].days_taken;
    for (let d of days_taken){
        let date = new Date(d[0]);
        let finalDate = new Date(navYear, navMonth, selectedDayId, selectedHourId)
        // console.log(date.toString() + " <> " + finalDate.toString())
        if (date.toString() == finalDate.toString()){
            console.log("I'm here already");
            console.log("myIp: "+ myIp + " regiIp: "+d[1])
            return true;
        }
    }
    console.log("no match: " + finalDate.toString())
    return false
}

function finalConfirm() {
    let houseId = selectedHouse;
    let navMonthFix = navMonth + 1;
    let scheduledTime = '' + navYear +'-'+ navMonthFix +'-'+ selectedDayId + "T" + selectedHourId + ":00:00"
    useRoute('join_tour', [join_leave("join")], [houseId, scheduledTime])
}


function join_leave(choice) {
    function alarm(data){
        if (data.error !== undefined)
            if (choice === "join")
                alert("You're already signed up for that slot.")
            else
                alert("You're not signed up for that slot.")
        else
            console.log(choice + " successful");
        viewHome();
    }
    return alarm;
}


function useRoute(route, callbacks, args){
    let xhttp = new XMLHttpRequest();
    let url = service + route;
    if (args)
        for (let arg of args)
            url += "/" + arg;
    // console.log("url: " + url);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let info = JSON.parse(this.responseText)
            for(let callback of callbacks)
                callback(info)
        }
    }
    xhttp.open("GET", url, true);
    xhttp.send();
}

function dummyDesc(){
    return `Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit. Idem iste, inquam, 
            de voluptate quid sentit? Sic consequentibus 
            vestris sublatis prima tolluntur. Duo Reges: 
            constructio interrete. Quis Aristidem non mortuum 
            diligit? Eorum enim omnium multa praetermittentium, 
            dum eligant aliquid, quod sequantur, 
            quasi curta sententia; Quippe: habes enim a rhetoribus; 
            Huius ego nunc auctoritatem sequens idem faciam. 
            Itaque nostrum est-quod nostrum dico, 
            artis est-ad ea principia, quae accepimus.`
}

setInterval(autoUpdate, 7000)