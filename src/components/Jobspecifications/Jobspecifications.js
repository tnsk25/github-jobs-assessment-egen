import React, {Component} from 'react';
import './Jobspecifications.css';
import axios from 'axios';
import {MDBCard, MDBCardBody, MDBCardImage, MDBCardText } from 'mdbreact';

const APISettings = {
    baseUrl: 'http://localhost:8080/https://jobs.github.com/positions/'
}

class Jobspecifications extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      job:[]
    };
  }

// function to retrieve information about a specific job id
  	
  componentDidMount = () => {

  	const { match: { params } } = this.props;
	const url = APISettings.baseUrl + params.id +'.json';

	axios.get(url,{
		params: {
			markdown:false
		}
	}).then( (response) => {

		this.setState({
			job: response.data
		})
	})

  };

  render() {
    
    return (
    	<MDBCard className="jobcard-page">
	        <MDBCardImage className="img-fluid company-logo" alt={this.state.job.company} src={this.state.job.company_logo} waves />
	        <MDBCardBody>
	          <MDBCardText>
	            <span>{new Date(this.state.job.created_at).toDateString()} . {this.state.job.type}</span>
	          </MDBCardText>	
	          <MDBCardText><b>{this.state.job.title}</b></MDBCardText>
	          <MDBCardText>
	            <span>{this.state.job.company}</span>
	            <br/>
	            <span>{this.state.job.location}</span>
	          </MDBCardText>
	          <div dangerouslySetInnerHTML={{ __html: this.state.job.description }} />
	          <p><strong>How to Apply</strong></p>
	          <div dangerouslySetInnerHTML={{ __html: this.state.job.how_to_apply }} />

	        </MDBCardBody>
	      </MDBCard>
    );
   } 
}  

export default Jobspecifications;