import React from 'react';
import './Jobdetails.css';
import {MDBCard, MDBCardBody, MDBCardImage, MDBCardText } from 'mdbreact';

const Jobdetails = (props) => {

	const date_conv = new Date(props.content.created_at).toDateString();

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
	         <button className="btn">Read More</button>
	        </MDBCardBody>
	      </MDBCard>


	);

}


export default Jobdetails;