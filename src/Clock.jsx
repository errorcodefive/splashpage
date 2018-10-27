import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import Clock from 'react-live-clock';
import TimezonePicker from 'react-timezone';

var contentNode = document.getElementById('clocksMain');

class ClocksMain extends React.Component{
    constructor(){
        super();
        var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        console.log("Time zone is: " + timezone);
        this.state={activetimezone: timezone};

        this.handleTimeZoneChange = this.handleTimeZoneChange.bind(this);
    }
    handleTimeZoneChange(e){
        this.setState({
            activetimezone: e
        });
    }
    render(){
        return(
            <div>
                <ClockTime timezone={this.state.activetimezone}/>
            </div>
        );
    }
}
class ClockTime extends React.Component{
    constructor(props){
        super(props);
        console.log(props);
    }
    render(){
        return(
            <div>
            <Clock timezone={this.props.timezone} />
            { this.props.timezone }
            <TimeZoneSelector />
            </div>
        );
    }
}
class TimeZoneSelector extends React.Component{
    render(){
        return(
            <TimezonePicker
            value=""
            onChange={timezone => console.log('New timezone Selected:', timezone)}
            inputProps={{
                placeholder: 'Select timezone', name: 'timezone'
            }}
            />
        )
    }
}
class DateField extends React.Component{

}
class MarketTime extends React.Component{

}
class AlarmsMain extends React.Component{

}
class AlarmTable extends React.Component{

}
class AlarmRow extends React.Component{

}
class AlarmEditModal extends React.Component{

}
class AlarmEditor extends React.Component{

}
ReactDOM.render(<ClocksMain />, contentNode);
export default ClocksMain
