//Shows examples of Bootstrap form input functions

import React, {Component} from 'react';
import {
  Form,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Feedback,
  Well
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import config from '../config.js';

class Tasker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: moment(),
      endDate: moment(),
      result: ''
    };

    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.submitDates = this.submitDates.bind(this);
  }

  componentDidMount() {
    //
  }

  componentDidUpdate(prevProps, prevState) {
    //
  }

  handleStartDateChange(date) {
    this.setState({startDate: date});
  }

  handleEndDateChange(date) {
    this.setState({endDate: date});
  }

  submitDates() {
    if (this.state.startDate == null || this.state.endDate == null) {
      this.setState({result: "Dates cannot be empty."});
      return;
    }

    const start = this.state.startDate.format('DD-MM-YYYY');
    const end = this.state.endDate.format('DD-MM-YYYY');
    const urlString = config.api.postTaskUrl;
    // API enppoint is secured with Auth0
    const apiHeaders = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Bearer " + localStorage.getItem('access_token')
      }
    };

    axios.post(urlString, {
      start,
      end
    }, apiHeaders).then(res => {
      this.setState({
        result: "Task in Days: " + res.data
      });
    }).catch(error => {
      this.setState({result: error.response.data.message});
    });

  }

  render() {

    return (<div class="content-box-tasker">
      <h1>Day Counter</h1>
      <p>Welcome to Day Counter. Enter a start and end date to count the number of days in-between.
      </p>
      <form>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>START DATE:</label>
              <DatePicker name="start" selected={this.state.startDate} dateFormat="DD/MM/YYYY" onChange={this.handleStartDateChange}/>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>END DATE:</label>
              <DatePicker name="end" selected={this.state.endDate} dateFormat="DD/MM/YYYY" onChange={this.handleEndDateChange}/>
            </div>
          </div>
          <div class="col-md-12">
            <Button bsStyle="primary" onClick={this.submitDates}>SUBMIT</Button>
          </div>
          <p/>
          <div class="col-md-12">
            <Well bsSize="large">{this.state.result}</Well>
          </div>
        </div>
      </form>
    </div>);
  }
}

export default Tasker;
