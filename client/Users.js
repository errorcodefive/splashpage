"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var contentNode = document.getElementById('loginMain');

var LoginMain =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LoginMain, _React$Component);

  function LoginMain() {
    _classCallCheck(this, LoginMain);

    return _possibleConstructorReturn(this, _getPrototypeOf(LoginMain).call(this));
  }

  _createClass(LoginMain, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, _react.default.createElement(LoginForm, null));
    }
  }]);

  return LoginMain;
}(_react.default.Component);

var LoginForm =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(LoginForm, _React$Component2);

  function LoginForm() {
    var _this;

    _classCallCheck(this, LoginForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LoginForm).call(this));
    _this.state = {
      password: '',
      username: ''
    };
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.findUser = _this.findUser.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(LoginForm, [{
    key: "handleSubmit",
    value: function handleSubmit(event) {
      event.preventDefault(); //after submit is clicked then get user information based on username

      console.log("Username: " + this.refs.username.value);
      console.log("Password: " + this.refs.password.value);
      findUser({
        username: this.refs.username.value,
        password: this.refs.password.value
      });
    }
  }, {
    key: "handleChange",
    value: function handleChange(event) {
      this.setState({
        username: event.target.username,
        password: event.target.password
      });
    }
  }, {
    key: "findUser",
    value: function findUser(userInfo) {
      fetch('/api/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        console.log("HERE:" + JSON.stringify(response));
      }).catch(function (err) {
        console.log("Error sending data to server: " + err.message);
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("form", {
        onSubmit: this.handleSubmit
      }, _react.default.createElement("label", null, "Username:"), _react.default.createElement("input", {
        type: "text",
        ref: "username"
      }), _react.default.createElement("label", null, "Password:"), _react.default.createElement("input", {
        type: "text",
        ref: "password"
      }), _react.default.createElement("input", {
        type: "submit",
        value: "Submit"
      }));
    }
  }]);

  return LoginForm;
}(_react.default.Component);

_reactDom.default.render(_react.default.createElement(LoginMain, null), contentNode);

var _default = LoginMain;
exports.default = _default;