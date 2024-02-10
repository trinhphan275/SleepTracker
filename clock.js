const hourHand = document.querySelector("#hour");
const minuteHand = document.querySelector("#minute");
const timeTag = document.querySelector(".displayTime");
const addButton = document.querySelector(".addButton");
const selectMenu = document.querySelectorAll("select");
const timeList = document.querySelector(".timeList");

let alarmTime, isAlarmSet;

// assign the values for the option menu
for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

// function that modifies the position of the clock
function setClock() {
    let currentDate = new Date();
    let hour = currentDate.getHours();
    let minute = currentDate.getMinutes();
    let second = currentDate.getSeconds();
    let secondsRatio = second / 60;
    let minutesRatio = (secondsRatio + minute) / 60;
    let hoursRatio = (minutesRatio + hour) / 12;

    //rotation
    hourHand.style.setProperty("--rotation", hoursRatio * 360);
    minuteHand.style.setProperty("--rotation", minutesRatio * 360);

    // display time
    var ampm = hour >= 12 ? 'PM' : 'AM';
    let date = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
    let time = (hour % 12) + ":" + minute + ":" + second + " " + ampm;
    
    timeTag.textContent = date + " " + time;
}

setInterval(() => {
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";
    if(h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    h = h == 0 ? h = 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    if (alarmTime === `${h}:${m} ${ampm}`) {
        alert("Alarm!");
        alarmTime = "";
        timeList.remove(timeList.lastChild);
        addButton.textContent("Add Alarm");
        isAlarmSet = false;
    }
});

function setAlarm() {
    if (isAlarmSet == true) {
        timeList.remove(timeList.lastChild);
        addButton.textContent("Add Alarm");
        isAlarmSet = false;
        return;
    }
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return alert("Please, select a valid time to set Alarm!");
    }
    alarmTime = time;
    let newTime = document.createElement("div");
    newTime.setAttribute("class", "timeItem");
    newTime.textContent = alarmTime;
    timeList.appendChild(newTime);
    addButton.textContent = "Clear Alarm";
    isAlarmSet = true;
}
addButton.addEventListener("click", setAlarm);

setInterval(setClock, 1000);

setClock();

