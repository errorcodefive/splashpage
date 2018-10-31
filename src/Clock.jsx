import React from "react";
import ReactDOM from "react-dom";
import ReactModal from "react-modal";
import Clock from "react-live-clock";
import TimezonePicker from "react-timezone";

var contentNode = document.getElementById("clocksMain");

class ClocksMain extends React.Component {
  constructor() {
    super();
    var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log("Time zone is: " + timezone);
    this.state = { activetimezone: timezone };
    this.handleTimeZoneChange = this.handleTimeZoneChange.bind(this);
  }
  handleTimeZoneChange(e) {
    this.setState({
      activetimezone: e
      });
      console.log("timezone state changed to: ", e);
  }
  render() {
    return (
      <div>
        <DateDisp timezone={this.state.activetimezone} />
        <ClockTime timezone={this.state.activetimezone} handleTimeZoneChange={this.handleTimeZoneChange}/>
      </div>
    );
  }
}
class ClockTime extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    //this.handleTimeZoneChange = this.props.handleTimeZoneChange.bind(this);
  }
  render() {
    return (
      <div>
        <Clock timezone={this.props.timezone} format={'h:mm'}/>
        {this.props.timezone}
        <TimeZoneSelector timezone={this.props.timezone} handleTimeZoneChange={this.props.handleTimeZoneChange}/>
      </div>
    );
  }
}
class DateDisp extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <Clock timezone={this.props.timezone} format={'dddd, MMMM Do'} />
    )
  }
}
class TimeZoneSelector extends React.Component {
    constructor(props){
        super(props);
        this.handleTimeZoneChange = this.props.handleTimeZoneChange.bind(this);
    }
  render() {
      this.current_timezone=this.props.timezone;
    return (
      <TimezonePicker
        value=""
        // onChange={timezone => {
        //     console.log("New timezone Selected:", timezone);

        // };
        onChange={
            timezone => {
                console.log("New timezone selected:", timezone);
                this.handleTimeZoneChange(timezone);
            }
        }
        inputProps={{
          placeholder: this.current_timezone,
          name: this.current_timezone
        }}
      />
    );
  }
}

ReactDOM.render(<ClocksMain />, contentNode);
export default ClocksMain;