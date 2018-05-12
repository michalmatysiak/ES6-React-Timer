let timeTable = [];
class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                milliseconds: 0
            },
            watch: null
        };
    }

    getFormattedTimes() {
    const { minutes, seconds, milliseconds } = this.state.times;
    return `${pad0(minutes)}:${pad0(seconds)}:${pad0(Math.floor(milliseconds))}`;
  }

    start() {
        if (!this.running) {
        	(this.running = true), (this.watch = setInterval(() => this.step(), 10));
        }
    }

    step() { 
        if (!this.running) return;
        this.calculate();
    }

   
     calculate() {
    // pobierz ze state'a cały times (minutes, seconds, milliseconds)
    let { minutes, seconds, milliseconds } = this.state.times;

    // modyfikuj times
    milliseconds += 1;
    if (milliseconds >= 100) {
      seconds += 1;
      milliseconds = 0;
    }
    if (seconds >= 60) {
      minutes += 1;
      seconds = 0;
    }

    // ustaw nowe times
    this.setState({
      times: {
        minutes,
        seconds,
        milliseconds
      }
    })
  }
    stop() { 
    	this.running = false;
    	clearInterval(this.watch);
    }

    reset() { 
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                milliseconds: 0
            }
        });
    }
    get() {
    console.log(this.getFormattedTimes(this.state.times));
    timeTable = [...timeTable, this.getFormattedTimes(this.state.times)];
    console.log(timeTable);
  }
  results() {
    let pos = timeTable.length - 1;
    this.val = timeTable;
    let addTime = timeTable[pos]
    const res = document.getElementById('results');
    const list = document.createElement("li");
    list.innerText = addTime;
    res.appendChild(list);
    console.log(save());
  }
  render() {
    return (
      <div className="container">
        <div className="col-6">    
          <nav className="controls">
            <a href="#" className="button" id="start" onClick={() => this.start()}>Start</a>
            <a href="#" className="button" id="stop" onClick={() =>this.stop()}>Stop</a>
            <a href="#" className="button" id="reset" onClick={() =>this.reset()}>Reset</a>
            <a href="#" className="button" id="save" onClick={() =>this.get()}>Save</a>
          </nav>
          <div className="stopwatch" id="stopwatch">{ this.getFormattedTimes()}</div>
          <ul className="results" id="results"></ul>
        </div> 
      </div>
    );
  }
}

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = "0" + result;
  }
  return result;
}


ReactDOM.render(<Stopwatch />, document.getElementById("app"));

