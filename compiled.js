"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
  _inherits(Stopwatch, _React$Component);

  function Stopwatch(props) {
    _classCallCheck(this, Stopwatch);

    var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

    _this.state = {
      running: false,
      times: {
        minutes: 0,
        seconds: 0,
        milliseconds: 0
      },
      watch: null,
      timeTable: []
    };
    return _this;
  }

  _createClass(Stopwatch, [{
    key: "getFormattedTimes",
    value: function getFormattedTimes() {
      var _state$times = this.state.times,
          minutes = _state$times.minutes,
          seconds = _state$times.seconds,
          milliseconds = _state$times.milliseconds;

      return pad0(minutes) + ":" + pad0(seconds) + ":" + pad0(Math.floor(milliseconds));
    }
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;

      if (!this.state.running) {
        this.setState({
          running: true,
          watch: setInterval(function () {
            return _this2.step();
          }, 10)
        });
      }
    }
  }, {
    key: "step",
    value: function step() {
      if (!this.state.running) return;
      this.calculate();
    }
  }, {
    key: "calculate",
    value: function calculate() {
      // pobierz ze state'a cały times (minutes, seconds, milliseconds)
      var _state$times2 = this.state.times,
          minutes = _state$times2.minutes,
          seconds = _state$times2.seconds,
          milliseconds = _state$times2.milliseconds;

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
          minutes: minutes,
          seconds: seconds,
          milliseconds: milliseconds
        }
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      this.setState({
        running: false
      });
      clearInterval(this.state.watch);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.setState({
        times: {
          minutes: 0,
          seconds: 0,
          milliseconds: 0
        }
      });
    }
  }, {
    key: "get",
    value: function get() {
      this.setState({
        timeTable: [].concat(_toConsumableArray(this.state.timeTable), [this.getFormattedTimes()])
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "div",
          { className: "col-6" },
          React.createElement(
            "nav",
            { className: "controls" },
            React.createElement(
              "a",
              {
                href: "#",
                className: "button start",
                onClick: function onClick() {
                  return _this3.start();
                }
              },
              "Start"
            ),
            React.createElement(
              "a",
              {
                href: "#",
                className: "button stop",
                onClick: function onClick() {
                  return _this3.stop();
                }
              },
              "Stop"
            ),
            React.createElement(
              "a",
              {
                href: "#",
                className: "button reset",
                onClick: function onClick() {
                  return _this3.reset();
                }
              },
              "Reset"
            ),
            React.createElement(
              "a",
              { href: "#", className: "button save", onClick: function onClick() {
                  return _this3.get();
                } },
              "Save"
            )
          ),
          React.createElement(
            "div",
            { className: "stopwatch" },
            this.getFormattedTimes()
          ),
          React.createElement(
            "ul",
            { className: "results" },
            this.state.timeTable.map(function (time) {
              return React.createElement(
                "li",
                null,
                time
              );
            })
          )
        )
      );
    }
  }]);

  return Stopwatch;
}(React.Component);

function pad0(value) {
  var result = value.toString();
  if (result.length < 2) {
    result = "0" + result;
  }
  return result;
}

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById("app"));
