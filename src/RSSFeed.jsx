import React from 'react';
import ReactDOM from 'react-dom';
import {NotificationManager, NotificationContainer} from 'react-notifications';

var contentNode = document.getElementById('rssfeedMain');

class rssFeedBody extends React.Component{

    constructor(){
        super();
    }

    render(){
        return(
            <div>RSSFEEDS HERE</div>
        )
    }

}

class rssList extends React.Component{
    constructor(){
        super();
    }

}

//Two lists, one of the feed name and links w/ delete, add
//Second list with the feed items
//Possible a toggle to change between the two
