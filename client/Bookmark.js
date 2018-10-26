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

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var contentNode = document.getElementById('bookmarksMain');

function BookmarksTable(props) {
  console.log("Creating bookmarks table");
  console.log(JSON.stringify(props.bookmarks));
  var bookmarkRows = props.bookmarks.map(function (bookmark) {
    return _react.default.createElement(BookmarkRow, {
      key: bookmark._id,
      bookmark: bookmark,
      deleteBookmark: props.deleteBookmark,
      loadData: props.loadData
    });
  });
  return _react.default.createElement("table", null, _react.default.createElement("thead", null, _react.default.createElement("tr", null, _react.default.createElement("th", null, "ID"), _react.default.createElement("th", null, "Name"), _react.default.createElement("th", null, "Link"), _react.default.createElement("th", null), _react.default.createElement("th", null))), _react.default.createElement("tbody", null, bookmarkRows));
}

var BookmarkAdd =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BookmarkAdd, _React$Component);

  function BookmarkAdd() {
    var _this;

    _classCallCheck(this, BookmarkAdd);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BookmarkAdd).call(this));
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(BookmarkAdd, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var form = document.forms.bookmarkAdd;
      this.props.createBookmark({
        name: form.name.value,
        link: form.link.value
      });
      form.name.value = "";
      form.link.value = "";
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, _react.default.createElement("form", {
        name: "bookmarkAdd",
        onSubmit: this.handleSubmit
      }, _react.default.createElement("input", {
        type: "text",
        name: "name",
        placeholder: "Name"
      }), _react.default.createElement("input", {
        type: "text",
        name: "link",
        placeholder: "Link"
      }), _react.default.createElement("button", null, "Add")));
    }
  }]);

  return BookmarkAdd;
}(_react.default.Component);

var BookmarkRow = function BookmarkRow(props) {
  return _react.default.createElement("tr", null, _react.default.createElement("td", null, props.bookmark._id), _react.default.createElement("td", null, props.bookmark.name), _react.default.createElement("td", null, _react.default.createElement(BookmarksLink, {
    bookmark: props.bookmark
  })), _react.default.createElement("td", null, _react.default.createElement("button", {
    onClick: function onClick() {
      return props.deleteBookmark(props.bookmark);
    }
  }, "X")), _react.default.createElement("td", null, _react.default.createElement(BookmarkUpdateModal, {
    bookmark: props.bookmark,
    loadData: props.loadData
  })));
};

var BookmarksList =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(BookmarksList, _React$Component2);

  function BookmarksList() {
    var _this2;

    _classCallCheck(this, BookmarksList);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(BookmarksList).call(this));
    _this2.state = {
      bookmarks: []
    };
    _this2.createBookmark = _this2.createBookmark.bind(_assertThisInitialized(_assertThisInitialized(_this2))); //TODO: update bookmark

    _this2.loadData = _this2.loadData.bind(_assertThisInitialized(_assertThisInitialized(_this2)));
    _this2.deleteBookmark = _this2.deleteBookmark.bind(_assertThisInitialized(_assertThisInitialized(_this2)));
    return _this2;
  }

  _createClass(BookmarksList, [{
    key: "deleteBookmark",
    value: function deleteBookmark(bookmark) {
      var _this3 = this;

      console.log("Delete ID: " + bookmark._id);

      if (confirm("Do you want to delete")) {
        fetch('/api/bookmarks/' + bookmark._id, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function (response) {
          return response.json();
        }).then(function (response) {
          console.log("HERE:" + JSON.stringify(response));

          _this3.loadData();
        }).catch(function (err) {
          alert("Error sending data to server: " + err.message);
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
      console.log("componentDidMount");
    }
  }, {
    key: "loadData",
    value: function loadData() {
      var _this4 = this;

      fetch('/api/bookmarks').then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log("Fetching Bookmarks"); //console.log("Total number of records: ", data._metadata.total_count);

        console.log(JSON.stringify(data));

        _this4.setState({
          bookmarks: data.data
        });
      }).catch(function (err) {
        console.log(err);
      });
    }
  }, {
    key: "forceChange",
    value: function forceChange() {
      console.log("bookmarks have been force updated");
      this.loadData();
    }
  }, {
    key: "createBookmark",
    value: function createBookmark(newBookmark) {
      var _this5 = this;

      fetch('/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBookmark)
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        console.log("HERE:" + JSON.stringify(response));

        _this5.loadData(response);
      }).catch(function (err) {
        alert("Error sending data to server: " + err.message);
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, _react.default.createElement("h1", null, "Bookmarks"), _react.default.createElement("hr", null), _react.default.createElement(BookmarksTable, {
        bookmarks: this.state.bookmarks,
        deleteBookmark: this.deleteBookmark,
        loadData: this.loadData
      }), _react.default.createElement("hr", null), _react.default.createElement(BookmarkAdd, {
        createBookmark: this.createBookmark
      }));
    }
  }]);

  return BookmarksList;
}(_react.default.Component);

var BookmarksLink =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(BookmarksLink, _React$Component3);

  function BookmarksLink() {
    _classCallCheck(this, BookmarksLink);

    return _possibleConstructorReturn(this, _getPrototypeOf(BookmarksLink).apply(this, arguments));
  }

  _createClass(BookmarksLink, [{
    key: "render",
    value: function render() {
      var bookmark = this.props.bookmark;
      return _react.default.createElement("a", {
        href: bookmark.link,
        target: "_blank"
      }, bookmark.name);
    }
  }]);

  return BookmarksLink;
}(_react.default.Component);

var BookmarkUpdateForm =
/*#__PURE__*/
function (_React$Component4) {
  _inherits(BookmarkUpdateForm, _React$Component4);

  function BookmarkUpdateForm(props) {
    var _this6;

    _classCallCheck(this, BookmarkUpdateForm);

    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(BookmarkUpdateForm).call(this, props));
    _this6.state = {
      _id: _this6.props.bookmark._id,
      name: _this6.props.bookmark.name,
      link: _this6.props.bookmark.link,
      command: _this6.props.bookmark.command,
      query_url: _this6.props.bookmark.query_url
    };
    _this6.handleSubmit = _this6.handleSubmit.bind(_assertThisInitialized(_assertThisInitialized(_this6)));
    _this6.handleChangeName = _this6.handleChangeName.bind(_assertThisInitialized(_assertThisInitialized(_this6)));
    _this6.handleChangeLink = _this6.handleChangeLink.bind(_assertThisInitialized(_assertThisInitialized(_this6)));
    _this6.handleChangeCommand = _this6.handleChangeCommand.bind(_assertThisInitialized(_assertThisInitialized(_this6)));
    _this6.handleChangeQuery = _this6.handleChangeQuery.bind(_assertThisInitialized(_assertThisInitialized(_this6)));
    _this6.updateBookmark = _this6.updateBookmark.bind(_assertThisInitialized(_assertThisInitialized(_this6)));
    _this6.closingModal = _this6.closingModal.bind(_assertThisInitialized(_assertThisInitialized(_this6)));
    _this6.myOnSubmit = _this6.myOnSubmit.bind(_assertThisInitialized(_assertThisInitialized(_this6)));
    _this6.loadData = _this6.props.loadData.bind(_assertThisInitialized(_assertThisInitialized(_this6)));
    return _this6;
  }

  _createClass(BookmarkUpdateForm, [{
    key: "closingModal",
    value: function closingModal() {
      this.props.closeModal();
    }
  }, {
    key: "handleChangeName",
    value: function handleChangeName(e) {
      this.setState({
        name: e.target.value
      });
    }
  }, {
    key: "handleChangeLink",
    value: function handleChangeLink(e) {
      this.setState({
        link: e.target.value
      });
    }
  }, {
    key: "handleChangeCommand",
    value: function handleChangeCommand(e) {
      this.setState({
        command: e.target.value
      });
    }
  }, {
    key: "handleChangeQuery",
    value: function handleChangeQuery(e) {
      this.setState({
        query_url: e.target.value
      });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var form = document.forms.bookmarkUpdate;
      this.updateBookmark({
        _id: this.props.bookmark._id,
        name: form.name.value,
        link: form.link.value,
        command: form.command.value,
        query_url: form.query_url.value
      });
    }
  }, {
    key: "myOnSubmit",
    value: function myOnSubmit(e) {
      this.handleSubmit(e);
    }
  }, {
    key: "render",
    value: function render() {
      var bookmark = this.props.bookmark;
      return _react.default.createElement("div", null, "Update ", bookmark.name, _react.default.createElement("form", {
        name: "bookmarkUpdate",
        onSubmit: this.myOnSubmit
      }, _react.default.createElement("input", {
        type: "text",
        name: "name",
        value: this.state.name,
        onChange: this.handleChangeName
      }), _react.default.createElement("input", {
        type: "text",
        name: "link",
        value: this.state.link,
        onChange: this.handleChangeLink
      }), _react.default.createElement("input", {
        type: "text",
        name: "command",
        value: bookmark.command,
        placeholder: "Command",
        onChange: this.handleChangeCommand
      }), _react.default.createElement("input", {
        type: "text",
        name: "query_url",
        value: bookmark.query_url,
        placeholder: "Query URL",
        onChange: this.handleChangeQuery
      }), _react.default.createElement("button", null, "Update")));
    }
  }, {
    key: "updateBookmark",
    value: function updateBookmark(bmToUpdate) {
      var _this7 = this;

      this.closingModal();
      fetch('/api/bookmarks/' + bmToUpdate._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bmToUpdate)
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        console.log("Received response from bookmark PUT: " + JSON.stringify(response));
      }).then(function (response) {
        _this7.loadData();
      });
    }
  }]);

  return BookmarkUpdateForm;
}(_react.default.Component);

var BookmarkUpdateModal =
/*#__PURE__*/
function (_React$Component5) {
  _inherits(BookmarkUpdateModal, _React$Component5);

  function BookmarkUpdateModal() {
    var _this8;

    _classCallCheck(this, BookmarkUpdateModal);

    _this8 = _possibleConstructorReturn(this, _getPrototypeOf(BookmarkUpdateModal).call(this));
    _this8.state = {
      showModal: false
    };
    _this8.handleOpenModal = _this8.handleOpenModal.bind(_assertThisInitialized(_assertThisInitialized(_this8))); //this.afterOpenModal = this.afterOpenModal.bind(this);

    _this8.handleCloseModal = _this8.handleCloseModal.bind(_assertThisInitialized(_assertThisInitialized(_this8)));
    return _this8;
  }

  _createClass(BookmarkUpdateModal, [{
    key: "handleOpenModal",
    value: function handleOpenModal() {
      this.setState({
        showModal: true
      });
    } // afterOpenModal(){
    // 	this.
    // }

  }, {
    key: "handleCloseModal",
    value: function handleCloseModal() {
      this.setState({
        showModal: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var bookmark = this.props.bookmark;
      return (//render a bookmark row + an update button
        _react.default.createElement("div", null, _react.default.createElement("button", {
          onClick: this.handleOpenModal
        }, "Update ", bookmark.name), _react.default.createElement(ReactModal, {
          isOpen: this.state.showModal,
          contentLabel: "Test123",
          onRequstClose: this.closeModal
        }, _react.default.createElement("button", {
          onClick: this.handleCloseModal
        }, "Close Modal"), _react.default.createElement(BookmarkUpdateForm, {
          bookmark: bookmark,
          closeModal: this.handleCloseModal,
          loadData: this.props.loadData
        })))
      );
    }
  }]);

  return BookmarkUpdateModal;
}(_react.default.Component);

_reactDom.default.render(_react.default.createElement(BookmarksList, null), contentNode);

var _default = BookmarksList;
exports.default = _default;