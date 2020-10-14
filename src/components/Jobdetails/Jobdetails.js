import React from 'react';
import './Jobdetails.css';
import {MDBCard, MDBCardBody, MDBCardImage, MDBCardText } from 'mdbreact';

const Jobdetails = (props) => {

	// UTC date format is converted to local date/time
	const date_conv = new Date(props.content.created_at).toDateString();
	const job_url = '/job/'+props.content.id;

	return (
		
	      <MDBCard>
	        <MDBCardImage className="img-fluid company-logo" alt={props.content.company} src={props.content.company_logo} waves />
	        <MDBCardBody>
	          <MDBCardText>
	            <span>{date_conv} . {props.content.type}</span>
	          </MDBCardText>	
	          <MDBCardText><b>{props.content.title}</b></MDBCardText>
	          <MDBCardText>
	            <span>{props.content.company}</span>
	            <br/>
	            <span>{props.content.location}</span>
	          </MDBCardText>
	         <a target="_BLANK" href={job_url} className="btn">Read More</a>
	        </MDBCardBody>
	      </MDBCard>


	);

}


export default Jobdetails;