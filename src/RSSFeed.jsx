import React from 'react';
import ReactDOM from 'react-dom';
import {NotificationManager, NotificationContainer} from 'react-notifications';

var contentNode = document.getElementById('rssfeedMain');

class rssFeedBody extends React.Component{

    constructor(){
        super();
        //true will be list, false will be feed
        //the list is a list of the RSS feeds
        //the feed contains the items of the various rss feeds
        //look into conditional rendering
        this.state={
            rssState: true,
        };
    }
    //RSSlist items are stored in db
    //feeds are pulled and updated within the device
    
    deleteRSS(rssItem){
        console.log("Delete RSS ID: " + rssItem._id);
    }
    handleClick(e){

    }
    //this contains both rssList and rssFeed, needs a button to toggle the two views
    render(){
        var renderList = this.state.rssState;
        let visible;

        if(renderList){
            //render List instead of feed
            visible = <rssList></rssList>
        }else{
            //render Feed instead of list
            visible=<rssFeed></rssFeed>
        }
        return(
            <div>RSSFEEDS HERE
            <button onClick={this.handleClick}>Click to toggle</button>
            {visible}
            </div>
        )
    }

}
//this is the list of feed name and links
class rssList extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div>This is the rssList</div>
        )
    }
}
//this is a single line for rssList - needs name, url and delete button
class rssListLine extends React.Component{
    constructor(){
        super();
        
    }
    render(){
        var rssItem = this.props.rssItem;
        return(
            <tr>
                <td>{rssItem.name}</td>
                <td>{rssItem.link}</td>
                <td>{rssItem.description}</td>
            </tr>    
        );
    }

}
//this is the list of feed items (feed mode)
class rssFeed extends React.component{
    constructor(){
        super();
    }
    render(){
        return(
            <div>This is the rssFeed</div>
        )
    }
}
//Two lists, one of the feed name and links w/ delete, add
//Second list with the feed items
//Possible a toggle to change between the two

ReactDOM.render(<rssFeedBody />, contentNode);
