import React from 'react';
import ReactDOM from 'react-dom';
import BookmarksList from './Bookmark.jsx';
//import NotificationComponent from './Notifications.jsx';
import './styles/notifications.css';

var contentNode = document.getElementById('contents');
//ReactDOM.render(<NotificationComponent />, contentNode);
ReactDOM.render(<BookmarksList />, contentNode);

//ReactDOM.render(<FlashTest />, contentNode);