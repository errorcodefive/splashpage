"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _Bookmark = _interopRequireDefault(require("./Bookmark.jsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contentNode = document.getElementById('contents');

_reactDom.default.render(_react.default.createElement(_Bookmark.default, null), contentNode); //ReactDOM.render(<FlashTest />, contentNode);