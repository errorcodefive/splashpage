import React from 'react';
import ReactDOM from 'react-dom';
import Clock from 'react-live-clock';

var contentNode = document.getElementById("datesMain");

class DatesMain extends React.Component{
    constructor(){
        super();

    }
    render(){
        return(
            <div>Dateplaceholder</div>
        )
    }
}

ReactDOM.render(<DatesMain />, contentNode);
export default DatesMain;