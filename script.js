const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");
const milisecond = document.getElementById("milisecond");
const startbtn = document.getElementById("start");
const pausebtn = document.getElementById("pause");
const resetbtn = document.getElementById("reset");
const lapbtn = document.getElementById("lap");
const resetLapsbtn = document.getElementById("resetLaps");
const lapsContainer = document.getElementById("laps");

let lapCount = 0;

const itos = (number) => {
    let str = "";
    if (number <= 9) {
        str = "0" + String(number)
    }
    else str = String(number);
    return str;
}

let status = {
    started: false,
    paused: false,
}

let timer = null;
let time = {
    prevTime: 0,
    startTime: 0
}

const start = () => {
    status.started = true;
    time.startTime = (new Date()).getTime();
    time.prevTime = 0;
    updateUI();
    startTimer();
}

const pause = () => {
    if (status.paused === true) {
        time.startTime = (new Date()).getTime();
        startTimer();
        status.paused = false;
    }
    else {
        stopTimer();
        time.prevTime = time.prevTime + (new Date()).getTime() - time.startTime;
        time.startTime = 0;
        status.paused = true;
    }
    updateUI();
}

const reset = () => {
    status.started = false;
    status.paused = false;
    time = {
        prevTime: 0,
        startTime: 0
    };
    stopTimer();
    hour.innerText = "00";
    minute.innerText = "00";
    second.innerText = "00";
    milisecond.innerText = "00";
    updateUI();
}

const lap = () => {
    lapCount++;
    const lapTime = `${itos(hour.innerText)}:${itos(minute.innerText)}:${itos(second.innerText)}:${itos(milisecond.innerText)}`;
    const lapElement = document.createElement("div");
    lapElement.innerText = `Lap ${lapCount}: ${lapTime}`;
    lapsContainer.appendChild(lapElement);
}

const resetLaps = () => {
    lapCount = 0;
    lapsContainer.innerHTML = "";
    resetLapsbtn.disabled = true;
}

const updateUI = () => {
    if (status.started === true) {
        startbtn.disabled = true;
        pausebtn.disabled = false;
        resetbtn.disabled = false;
        lapbtn.disabled = false;
    }
    else {
        startbtn.disabled = false;
        pausebtn.disabled = true;
        resetbtn.disabled = true;
        lapbtn.disabled = true;
    }
    if (status.paused === true) {
        pausebtn.innerText = "Resume"
    }
    else {
        pausebtn.innerText = "Pause"
    }
    resetLapsbtn.disabled = lapsContainer.innerHTML.trim() === "";
}

const startTimer = () => {
    timer = setInterval(updateTimer, 100);
}

const stopTimer = () => {
    clearInterval(timer)
}

const updateTimer = () => {
    let _time = time.prevTime + (new Date()).getTime() - time.startTime;
    let ms = _time % 1000;
    ms = Math.floor(ms / 100);
    milisecond.innerText = itos(ms);
    _time = Math.floor(_time / 1000);
    let ss = _time % 60;
    second.innerText = itos(ss);

    _time = Math.floor(_time / 60);
    let mm = _time % 60;
    minute.innerText = itos(mm);

    _time = Math.floor(_time / 60);
    let hh = _time % 60;
    hour.innerText = itos(hh);
}

updateUI();
startbtn.onclick = start;
pausebtn.onclick = pause;
resetbtn.onclick = reset;
lapbtn.onclick = lap;
resetLapsbtn.onclick = resetLaps;
