"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactModal = _interopRequireDefault(require("react-modal"));

var _reactLiveClock = _interopRequireDefault(require("react-live-clock"));

var _reactTimezone = _interopRequireDefault(require("react-timezone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var contentNode = document.getElementById("clocksMain");

var ClocksMain =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ClocksMain, _React$Component);

  function ClocksMain() {
    var _this;

    _classCallCheck(this, ClocksMain);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ClocksMain).call(this));
    var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log("Time zone is: " + timezone);
    _this.state = {
      activetimezone: timezone
    };
    _this.handleTimeZoneChange = _this.handleTimeZoneChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ClocksMain, [{
    key: "handleTimeZoneChange",
    value: function handleTimeZoneChange(e) {
      this.setState({
        activetimezone: e
      });
      console.log("timezone state changed to: ", e);
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, _react["default"].createElement(DateDisp, {
        timezone: this.state.activetimezone
      }), _react["default"].createElement(ClockTime, {
        timezone: this.state.activetimezone,
        handleTimeZoneChange: this.handleTimeZoneChange
      }));
    }
  }]);

  return ClocksMain;
}(_react["default"].Component);

var ClockTime =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(ClockTime, _React$Component2);

  function ClockTime(props) {
    var _this2;

    _classCallCheck(this, ClockTime);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(ClockTime).call(this, props));
    console.log(props); //this.handleTimeZoneChange = this.props.handleTimeZoneChange.bind(this);

    return _this2;
  }

  _createClass(ClockTime, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, _react["default"].createElement(_reactLiveClock["default"], {
        timezone: this.props.timezone,
        format: 'h:mm'
      }), this.props.timezone, _react["default"].createElement(TimeZoneSelector, {
        timezone: this.props.timezone,
        handleTimeZoneChange: this.props.handleTimeZoneChange
      }));
    }
  }]);

  return ClockTime;
}(_react["default"].Component);

var DateDisp =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(DateDisp, _React$Component3);

  function DateDisp(props) {
    _classCallCheck(this, DateDisp);

    return _possibleConstructorReturn(this, _getPrototypeOf(DateDisp).call(this, props));
  }

  _createClass(DateDisp, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement(_reactLiveClock["default"], {
        timezone: this.props.timezone,
        format: 'dddd, MMMM Do'
      });
    }
  }]);

  return DateDisp;
}(_react["default"].Component);

var TimeZoneSelector =
/*#__PURE__*/
function (_React$Component4) {
  _inherits(TimeZoneSelector, _React$Component4);

  function TimeZoneSelector(props) {
    var _this3;

    _classCallCheck(this, TimeZoneSelector);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(TimeZoneSelector).call(this, props));
    _this3.handleTimeZoneChange = _this3.props.handleTimeZoneChange.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  _createClass(TimeZoneSelector, [{
    key: "render",
    value: function render() {
      var _this4 = this;

      this.current_timezone = this.props.timezone;
      return _react["default"].createElement(_reactTimezone["default"], {
        value: "" // onChange={timezone => {
        //     console.log("New timezone Selected:", timezone);
        // };
        ,
        onChange: function onChange(timezone) {
          console.log("New timezone selected:", timezone);

          _this4.handleTimeZoneChange(timezone);
        },
        inputProps: {
          placeholder: this.current_timezone,
          name: this.current_timezone
        }
      });
    }
  }]);

  return TimeZoneSelector;
}(_react["default"].Component);

_reactDom["default"].render(_react["default"].createElement(ClocksMain, null), contentNode);

var _default = ClocksMain;
exports["default"] = _default;