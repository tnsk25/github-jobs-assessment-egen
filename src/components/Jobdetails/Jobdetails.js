import React from 'react';
import './Jobdetails.css';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from 'mdbreact';

const Jobdetails = (props) => {

	return (
		
	      <MDBCard>
	        <MDBCardImage className="img-fluid company-logo" alt={props.content.company} src={props.content.company_logo} waves />
	        <MDBCardBody>
	          <MDBCardText>
	            <span>{props.content.created_at} . {props.content.type}</span>
	          </MDBCardText>	
	          <MDBCardTitle>{props.content.title}</MDBCardTitle>
	          <MDBCardText>
	            <span>{props.content.company}</span>
	            <br/>
	            <span>{props.content.location}</span>
	          </MDBCardText>
	          <MDBBtn href="#">Read More</MDBBtn>
	        </MDBCardBody>
	      </MDBCard>


	);

}


export default Jobdetails;