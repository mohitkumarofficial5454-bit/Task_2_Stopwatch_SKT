let startTime, updatedTime, difference = 0, timerInterval;
let running = false;
const display = document.getElementById("display");
const progress = document.querySelector(".progress");
const circumference = 2 * Math.PI * 144; // radius = 144

function formatTime(ms) {
  let milliseconds = parseInt(ms % 1000);
  let seconds = Math.floor((ms / 1000) % 60);
  let minutes = Math.floor((ms / (1000 * 60)) % 60);
  let hours = Math.floor(ms / (1000 * 60 * 60));

  return (
    (hours < 10 ? "0" + hours : hours) + ":" +
    (minutes < 10 ? "0" + minutes : minutes) + ":" +
    (seconds < 10 ? "0" + seconds : seconds) + ":" +
    (milliseconds < 100 ? (milliseconds < 10 ? "00" : "0") : "") + milliseconds
  );
}

function start() {
  if (!running) {
    startTime = new Date().getTime() - difference;
    timerInterval = setInterval(runTimer, 10);
    running = true;
  }
}

function runTimer() {
  updatedTime = new Date().getTime() - startTime;
  display.innerHTML = formatTime(updatedTime);

  let progressValue = (updatedTime % 60000) / 60000; // 1 full circle = 1 min
  progress.style.strokeDashoffset = circumference - (progressValue * circumference);
}

function pause() {
  clearInterval(timerInterval);
  running = false;
  difference = updatedTime;
}

function stop() {
  clearInterval(timerInterval);
  running = false;
  difference = 0;
  display.innerHTML = "00:00:00:000";
  progress.style.strokeDashoffset = circumference;
}

function reset() {
  clearInterval(timerInterval);
  running = false;
  difference = 0;
  display.innerHTML = "00:00:00:000";
  progress.style.strokeDashoffset = circumference;
}

function lap() {
  if (running) {
    const lapTime = document.createElement("div");
    lapTime.className = "lap-item";
    lapTime.innerText = "Lap: " + formatTime(updatedTime);
    document.getElementById("laps").appendChild(lapTime);
  }
}

function clearLaps() {
  document.getElementById("laps").innerHTML = "";
}