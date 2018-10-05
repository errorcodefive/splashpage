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
			key: bookmark._id, bookmark: bookmark, deleteBookmark: props.deleteBookmark, loadData: props.loadData });
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
				React.createElement("th", null),
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
				{ onClick: function onClick() {
						return props.deleteBookmark(props.bookmark);
					} },
				"X"
			)
		),
		React.createElement(
			"td",
			null,
			React.createElement(BookmarkUpdateModal, { bookmark: props.bookmark, loadData: props.loadData })
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
		//TODO: update bookmark
		_this2.loadData = _this2.loadData.bind(_this2);
		_this2.deleteBookmark = _this2.deleteBookmark.bind(_this2);
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
					headers: { 'Content-Type': 'application/json' }
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
				console.log("Fetching Bookmarks");
				//console.log("Total number of records: ", data._metadata.total_count);
				console.log(JSON.stringify(data));
				_this4.setState({ bookmarks: data.data });
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
				headers: { 'Content-Type': 'application/json' },
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
			return React.createElement(
				"div",
				null,
				React.createElement(
					"h1",
					null,
					"Bookmarks"
				),
				React.createElement("hr", null),
				React.createElement(BookmarksTable, { bookmarks: this.state.bookmarks, deleteBookmark: this.deleteBookmark, loadData: this.loadData }),
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
				{ href: bookmark.link, target: "_blank" },
				bookmark.name
			);
		}
	}]);

	return BookmarksLink;
}(React.Component);

var BookmarkUpdateForm = function (_React$Component4) {
	_inherits(BookmarkUpdateForm, _React$Component4);

	function BookmarkUpdateForm(props) {
		_classCallCheck(this, BookmarkUpdateForm);

		var _this7 = _possibleConstructorReturn(this, (BookmarkUpdateForm.__proto__ || Object.getPrototypeOf(BookmarkUpdateForm)).call(this, props));

		_this7.state = {
			_id: _this7.props.bookmark._id,
			name: _this7.props.bookmark.name,
			link: _this7.props.bookmark.link,
			command: _this7.props.bookmark.command,
			query_url: _this7.props.bookmark.query_url
		};

		_this7.handleSubmit = _this7.handleSubmit.bind(_this7);
		_this7.handleChangeName = _this7.handleChangeName.bind(_this7);
		_this7.handleChangeLink = _this7.handleChangeLink.bind(_this7);
		_this7.handleChangeCommand = _this7.handleChangeCommand.bind(_this7);
		_this7.handleChangeQuery = _this7.handleChangeQuery.bind(_this7);
		_this7.updateBookmark = _this7.updateBookmark.bind(_this7);
		_this7.closingModal = _this7.closingModal.bind(_this7);
		_this7.myOnSubmit = _this7.myOnSubmit.bind(_this7);
		_this7.loadData = _this7.props.loadData.bind(_this7);
		return _this7;
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
			console.log("I am in the handlesubmit");
			e.preventDefault();
			var form = document.forms.bookmarkUpdate;
			this.updateBookmark({
				_id: this.props.bookmark._id,
				name: form.name.value,
				link: form.link.value,
				command: form.command.value,
				query_url: form.query_url.value
			});
			return new Promise(function (resolve, reject) {
				console.log("I am inside the promise of handlesubmit");
				this.loadData();
			});
		}
	}, {
		key: "myOnSubmit",
		value: function myOnSubmit(e) {
			console.log("I am inside the myOnSubmit");
			this.handleSubmit(e);
		}
	}, {
		key: "render",
		value: function render() {
			var bookmark = this.props.bookmark;
			return React.createElement(
				"div",
				null,
				"Update ",
				bookmark.name,
				React.createElement(
					"form",
					{ name: "bookmarkUpdate", onSubmit: this.myOnSubmit },
					React.createElement("input", { type: "text", name: "name", value: this.state.name, onChange: this.handleChangeName }),
					React.createElement("input", { type: "text", name: "link", value: this.state.link, onChange: this.handleChangeLink }),
					React.createElement("input", { type: "text", name: "command", value: bookmark.command, placeholder: "Command", onChange: this.handleChangeCommand }),
					React.createElement("input", { type: "text", name: "query_url", value: bookmark.query_url, placeholder: "Query URL", onChange: this.handleChangeQuery }),
					React.createElement(
						"button",
						null,
						"Update"
					)
				)
			);
		}
	}, {
		key: "updateBookmark",
		value: function updateBookmark(bmToUpdate) {
			this.closingModal();
			fetch('/api/bookmarks/' + bmToUpdate._id, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(bmToUpdate)
			}).then(function (response) {
				return response.json();
			}).then(function (response) {
				console.log("Received response from bookmark PUT: " + JSON.stringify(response));
			});
		}
	}]);

	return BookmarkUpdateForm;
}(React.Component);

var BookmarkUpdateModal = function (_React$Component5) {
	_inherits(BookmarkUpdateModal, _React$Component5);

	function BookmarkUpdateModal() {
		_classCallCheck(this, BookmarkUpdateModal);

		var _this8 = _possibleConstructorReturn(this, (BookmarkUpdateModal.__proto__ || Object.getPrototypeOf(BookmarkUpdateModal)).call(this));

		_this8.state = {
			showModal: false
		};
		_this8.handleOpenModal = _this8.handleOpenModal.bind(_this8);
		//this.afterOpenModal = this.afterOpenModal.bind(this);
		_this8.handleCloseModal = _this8.handleCloseModal.bind(_this8);
		return _this8;
	}

	_createClass(BookmarkUpdateModal, [{
		key: "handleOpenModal",
		value: function handleOpenModal() {
			this.setState({ showModal: true });
		}
		// afterOpenModal(){
		// 	this.
		// }

	}, {
		key: "handleCloseModal",
		value: function handleCloseModal() {
			this.setState({ showModal: false });
		}
	}, {
		key: "render",
		value: function render() {
			var bookmark = this.props.bookmark;
			return (
				//render a bookmark row + an update button
				React.createElement(
					"div",
					null,
					React.createElement(
						"button",
						{ onClick: this.handleOpenModal },
						"Update ",
						bookmark.name
					),
					React.createElement(
						ReactModal,
						{ isOpen: this.state.showModal, contentLabel: "Test123", onRequstClose: this.closeModal },
						React.createElement(
							"button",
							{ onClick: this.handleCloseModal },
							"Close Modal"
						),
						React.createElement(BookmarkUpdateForm, { bookmark: bookmark, closeModal: this.handleCloseModal, loadData: this.props.loadData })
					)
				)
			);
		}
	}]);

	return BookmarkUpdateModal;
}(React.Component);

ReactDOM.render(React.createElement(BookmarksList, null), contentNode);