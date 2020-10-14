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
      jobs: [],
      params: 
      { 
        page: 1
      }
    };
  }
  
  componentDidMount = () => {
    let currentComponent = this;
    navigator.geolocation.watchPosition(function(position) {
      axios.get(APISettings.baseUrl, { 
          params: { 
            lat: position.coords.latitude,
            long: position.coords.longitude
          } 
        }).then( (response) =>{
          if(response.data.length)
          {
            currentComponent.setState({ jobs: response.data });
          }
          else
          {
            axios.get(APISettings.baseUrl).then( (jobresponse) =>{

              currentComponent.setState({
                jobs: jobresponse.data
              });

            }); 
          }
        });

    },
    function(error) {
      if (error.code === error.PERMISSION_DENIED)
      {
        axios.get(APISettings.baseUrl).then( (response) =>{

          currentComponent.setState({
            jobs: response.data
          });

        });
      }
    });

  }

  handleSearch = (event) => {
      event.preventDefault();
      this.setState({
      params: {...this.state.params,
      [event.target.location.name]: event.target.location.value,
      [event.target.description.name]: event.target.description.value,
      [event.target.full_time.name]: event.target.full_time.checked
      }
      }, () => {
      axios.get(APISettings.baseUrl, { 
          params: {
            markdown: true, 
            ...this.state.params} 
        }).then( (response) =>{
            this.setState({ jobs: response.data });
        });
      });
  }

  loadPage = (mode) => {

    let page_num = mode==='next' ? this.state.params.page+1 : this.state.params.page-1

    this.setState({
      params : {
        ...this.state.params,
        ['page']: page_num 
      }
    }, () => {
      axios.get(APISettings.baseUrl, { 
          params: {
            markdown: true, 
            ...this.state.params} 
        }).then( (response) =>{
            this.setState({ jobs: response.data });
        });
      });

  }

  render() {
    
    return (
      <MDBContainer>
        <Fragment>
          <div className="App">
            
            <Header/>
            <Jobfilter search={this.handleSearch}/>
            
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

          {
           this.state.jobs.length ===50
           ?
           <a onClick={this.loadPage.bind(this,'next')}>Next</a>
           :
           null 
          }

          {
            this.state.params.page > 1
            ?
            <a onClick={this.loadPage.bind(this,'prev')}>Prev</a>
            :
            null
          }

        </Fragment>
      </MDBContainer>
    );
  }

}

export default App;
