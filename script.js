class Stopwatch {
  constructor(display) {
    this.running = false;
    this.display = display;
    this.reset();
    this.print(this.times);
  }

  reset() {
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
  }

  print() {
    this.display.innerText = this.format(this.times);
  }

  format(times) {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(
      Math.floor(times.miliseconds)
    )}`;
  }

  step() {
    if (!this.running) return;
    this.calculate();
    this.print();
  }

  calculate() {
    this.times.miliseconds += 1;
    if (this.times.miliseconds >= 100) {
      this.times.seconds += 1;
      this.times.miliseconds = 0;
    }
    if (this.times.seconds >= 60) {
      this.times.minutes += 1;
      this.times.seconds = 0;
    }
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  stop() {
    this.running = false;
    clearInterval(this.watch);
  }

  resetTimer() {
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
    this.display.innerText = this.format(this.times);
    document.getElementById("results").innerHTML = "";
  }

  save() {
    let lapTime = document.getElementById("stopwatch").innerHTML;
    console.log(lapTime);

    const nextResult = document.createElement("li");
    const textResult = document.createTextNode(lapTime);
    nextResult.appendChild(textResult);
    document.getElementById("results").appendChild(nextResult);
  }
}

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = "0" + result;
  }
  return result;
}

const stopwatch = new Stopwatch(document.querySelector(".stopwatch"));

let startButton = document.getElementById("start");
startButton.addEventListener("click", () => stopwatch.start());

let stopButton = document.getElementById("stop");
stopButton.addEventListener("click", () => stopwatch.stop());

let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", () => stopwatch.resetTimer());

let saveButton = document.getElementById("save");
saveButton.addEventListener("click", () => stopwatch.save());