import React, { Component, Fragment } from 'react';
import './App.css';
import Header from '../components/Header/Header';
import Jobfilter from '../components/Jobfilter/Jobfilter';
import Jobdetails from '../components/Jobdetails/Jobdetails';
import {MDBContainer} from "mdbreact";
import axios from 'axios';

const APISettings = {
    baseUrl: 'http://localhost:8080/https://jobs.github.com/positions.json'
}

class App extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      jobs: []
    };
  }
  
  componentDidMount = () => {


    // if (navigator.geolocation) 
    // {
        
    //     navigator.geolocation.getCurrentPosition( (position) => {
    //       console.log("in nav");  
    //       axios.get(APISettings.baseUrl, { 
    //         params: { 
    //           lat: position.coords.latitude,
    //           long: position.coords.longitude
    //         } 
    //       }).then( (response) =>{

    //         this.setState({
    //           jobs: response.data
    //         });

    //         console.log(this.state.jobs)

    //       });

    //     });
    // }
    // else
    // {
    //   console.log("in else");
      axios.get(APISettings.baseUrl).then( (response) =>{

            this.setState({
              jobs: response.data
            });

            console.log(this.state.jobs)

          });
    // }

  }

  componentDidUpdate = () => {
    console.log("Component Updated");
  }

  shouldComponentUpdate = () => {
   console.log("Should Component Update!!"); 
   return true;
  }

  render() {
    
    console.log("Component rendered");

    return (
      <MDBContainer>
        <Fragment>
          <div className="App">
            
            <Header/>
            <Jobfilter/>
            
            <div className="row">
            
            {this.state.jobs.length ?

            <Fragment>
              
            {
              this.state.jobs.map( (job,index) => {

                return(
                  <div key={index} className="col-md-4 col-lg-4 col-sm-6 col-xs-12">
                    <Jobdetails 
                      key={index}
                      content = {job}
                    />
                  </div>
                );

              })  
            } 
            </Fragment>
            :
            null
            }

            </div>
          </div>
        </Fragment>
      </MDBContainer>
    );
  }

}

export default App;
