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
      watch: null,
      timeTable: []
    };
  }

  getFormattedTimes() {
    const { minutes, seconds, milliseconds } = this.state.times;
    return `${pad0(minutes)}:${pad0(seconds)}:${pad0(
      Math.floor(milliseconds)
    )}`;
  }

  start() {
    if (!this.state.running) {
      this.setState({
        running: true,
        watch: setInterval(() => this.step(), 10)
      });
    }
  }

  step() {
    if (!this.state.running) return;
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
    });
  }
  stop() {
    this.setState({
        running: false,
      });
    clearInterval(this.state.watch);
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
    this.setState({
      timeTable: [...this.state.timeTable, this.getFormattedTimes()]
    });
  }
  render() {
    return (
      <div className="container">
        <div className="col-6">
          <nav className="controls">
            <a
              href="#"
              className="button start"
              onClick={() => this.start()}
            >
              Start
            </a>
            <a
              href="#"
              className="button stop"
              onClick={() => this.stop()}
            >
              Stop
            </a>
            <a
              href="#"
              className="button reset"
              onClick={() => this.reset()}
            >
              Reset
            </a>
            <a href="#" className="button save" onClick={() => this.get()}>
              Save
            </a>
          </nav>
          <div className="stopwatch">
            {this.getFormattedTimes()}
          </div>
          <ul className="results"> 
            {this.state.timeTable.map(time => <li>{time}</li>)}
          </ul>
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
