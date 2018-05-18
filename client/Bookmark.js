"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById('bookmarksMain');

function BookmarksTable(props) {
	console.log("Creating bookmarks table");
	console.log(JSON.stringify(props.bookmarks));
	var bookmarkRows = props.bookmarks.map(function (bookmark) {
		return React.createElement(BookmarkRow, {
			key: bookmark._id, bookmark: bookmark, deleteBookmark: function deleteBookmark() {
				return props.deleteBookmark;
			} });
	});
	return React.createElement(
		"table",
		null,
		React.createElement(
			"thead",
			null,
			React.createElement(
				"tr",
				null,
				React.createElement(
					"th",
					null,
					"ID"
				),
				React.createElement(
					"th",
					null,
					"Name"
				),
				React.createElement(
					"th",
					null,
					"Link"
				),
				React.createElement("th", null)
			)
		),
		React.createElement(
			"tbody",
			null,
			bookmarkRows
		)
	);
}

var BookmarkAdd = function (_React$Component) {
	_inherits(BookmarkAdd, _React$Component);

	function BookmarkAdd() {
		_classCallCheck(this, BookmarkAdd);

		var _this = _possibleConstructorReturn(this, (BookmarkAdd.__proto__ || Object.getPrototypeOf(BookmarkAdd)).call(this));

		_this.handleSubmit = _this.handleSubmit.bind(_this);
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
			return React.createElement(
				"div",
				null,
				React.createElement(
					"form",
					{ name: "bookmarkAdd", onSubmit: this.handleSubmit },
					React.createElement("input", { type: "text", name: "name", placeholder: "Name" }),
					React.createElement("input", { type: "text", name: "link", placeholder: "Link" }),
					React.createElement(
						"button",
						null,
						"Add"
					)
				)
			);
		}
	}]);

	return BookmarkAdd;
}(React.Component);

var BookmarkRow = function BookmarkRow(props) {
	return React.createElement(
		"tr",
		null,
		React.createElement(
			"td",
			null,
			props.bookmark._id
		),
		React.createElement(
			"td",
			null,
			props.bookmark.name
		),
		React.createElement(
			"td",
			null,
			React.createElement(BookmarksLink, { bookmark: props.bookmark })
		),
		React.createElement(
			"td",
			null,
			React.createElement(
				"button",
				{ onClick: props.deleteBookmark(props.bookmark._id) },
				"X"
			)
		)
	);
};

var BookmarksList = function (_React$Component2) {
	_inherits(BookmarksList, _React$Component2);

	function BookmarksList() {
		_classCallCheck(this, BookmarksList);

		var _this2 = _possibleConstructorReturn(this, (BookmarksList.__proto__ || Object.getPrototypeOf(BookmarksList)).call(this));

		_this2.state = { bookmarks: [] };
		_this2.createBookmark = _this2.createBookmark.bind(_this2);
		_this2.loadData = _this2.loadData.bind(_this2);
		_this2.deleteBookmark = _this2.deleteBookmark.bind(_this2);
		return _this2;
	}

	_createClass(BookmarksList, [{
		key: "deleteBookmark",
		value: function deleteBookmark(id) {
			if (confirm("Do you want to delete")) {}
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
			var _this3 = this;

			fetch('/api/bookmarks').then(function (response) {
				return response.json();
			}).then(function (data) {
				console.log("Fetching Bookmarks");
				//console.log("Total number of records: ", data._metadata.total_count);
				console.log(JSON.stringify(data));
				_this3.setState({ bookmarks: data.data });
			}).catch(function (err) {
				console.log(err);
			});
		}
	}, {
		key: "createBookmark",
		value: function createBookmark(newBookmark) {
			var _this4 = this;

			fetch('/api/bookmarks', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newBookmark)
			}).then(function (response) {
				return response.json();
			}).then(function (response) {
				console.log("HERE:" + JSON.stringify(response));
				_this4.loadData(response);
			}).catch(function (err) {
				alert("Error sending data to server: " + err.message);
			});
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"h1",
					null,
					"Bookmarks"
				),
				React.createElement("hr", null),
				React.createElement(BookmarksTable, { bookmarks: this.state.bookmarks, deleteBookmark: this.deleteBookmark }),
				React.createElement("hr", null),
				React.createElement(BookmarkAdd, { createBookmark: this.createBookmark })
			);
		}
	}]);

	return BookmarksList;
}(React.Component);

var BookmarksLink = function (_React$Component3) {
	_inherits(BookmarksLink, _React$Component3);

	function BookmarksLink() {
		_classCallCheck(this, BookmarksLink);

		return _possibleConstructorReturn(this, (BookmarksLink.__proto__ || Object.getPrototypeOf(BookmarksLink)).apply(this, arguments));
	}

	_createClass(BookmarksLink, [{
		key: "render",
		value: function render() {
			var bookmark = this.props.bookmark;
			return React.createElement(
				"a",
				{ href: bookmark.link },
				bookmark.name
			);
		}
	}]);

	return BookmarksLink;
}(React.Component);

ReactDOM.render(React.createElement(BookmarksList, null), contentNode);