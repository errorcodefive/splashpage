"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactNotifications = require("react-notifications");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var contentNode = document.getElementById('rssfeedMain');

var rssFeedBody =
/*#__PURE__*/
function (_React$Component) {
  _inherits(rssFeedBody, _React$Component);

  function rssFeedBody() {
    var _this;

    _classCallCheck(this, rssFeedBody);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(rssFeedBody).call(this)); //true will be list, false will be feed
    //the list is a list of the RSS feeds
    //the feed contains the items of the various rss feeds
    //look into conditional rendering

    _this.state = {
      rssState: true
    };
    return _this;
  } //RSSlist items are stored in db
  //feeds are pulled and updated within the device


  _createClass(rssFeedBody, [{
    key: "deleteRSS",
    value: function deleteRSS(rssItem) {
      console.log("Delete RSS ID: " + rssItem._id);
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {} //this contains both rssList and rssFeed, needs a button to toggle the two views

  }, {
    key: "render",
    value: function render() {
      var renderList = this.state.rssState;
      var visible;

      if (renderList) {
        //render List instead of feed
        visible = _react["default"].createElement("rssList", null);
      } else {
        //render Feed instead of list
        visible = _react["default"].createElement("rssFeed", null);
      }

      return _react["default"].createElement("div", null, "RSSFEEDS HERE", _react["default"].createElement("button", {
        onClick: this.handleClick
      }, "Click to toggle"), visible);
    }
  }]);

  return rssFeedBody;
}(_react["default"].Component); //this is the list of feed name and links


var rssList =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(rssList, _React$Component2);

  function rssList() {
    _classCallCheck(this, rssList);

    return _possibleConstructorReturn(this, _getPrototypeOf(rssList).call(this));
  }

  _createClass(rssList, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, "This is the rssList");
    }
  }]);

  return rssList;
}(_react["default"].Component); //this is a single line for rssList - needs name, url and delete button


var rssListLine =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(rssListLine, _React$Component3);

  function rssListLine() {
    _classCallCheck(this, rssListLine);

    return _possibleConstructorReturn(this, _getPrototypeOf(rssListLine).call(this));
  }

  _createClass(rssListLine, [{
    key: "render",
    value: function render() {
      var rssItem = this.props.rssItem;
      return _react["default"].createElement("tr", null, _react["default"].createElement("td", null, rssItem.name), _react["default"].createElement("td", null, rssItem.link), _react["default"].createElement("td", null, rssItem.description));
    }
  }]);

  return rssListLine;
}(_react["default"].Component); //this is the list of feed items (feed mode)


var rssFeed =
/*#__PURE__*/
function (_React$component) {
  _inherits(rssFeed, _React$component);

  function rssFeed() {
    _classCallCheck(this, rssFeed);

    return _possibleConstructorReturn(this, _getPrototypeOf(rssFeed).call(this));
  }

  _createClass(rssFeed, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, "This is the rssFeed");
    }
  }]);

  return rssFeed;
}(_react["default"].component); //Two lists, one of the feed name and links w/ delete, add
//Second list with the feed items
//Possible a toggle to change between the two


_reactDom["default"].render(_react["default"].createElement("rssFeedBody", null), contentNode);