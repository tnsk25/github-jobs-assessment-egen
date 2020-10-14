import React, { Component, Fragment } from 'react';
import {Route, Switch } from 'react-router-dom';
import './App.css';
import Header from '../components/Header/Header';
import Jobfilter from '../components/Jobfilter/Jobfilter';
import Jobdetails from '../components/Jobdetails/Jobdetails';
import Jobspecifications from '../components/Jobspecifications/Jobspecifications';
import {MDBContainer} from "mdbreact";
import axios from 'axios';

const APISettings = {
    baseUrl: 'http://0.0.0.0:8080/https://jobs.github.com/positions.json'
}

class App extends Component {

  // initial state is set
  
  constructor(props)
  {
    super(props);
    this.state = {
      theme: 'light',
      jobs: [],
      params: 
      { 
        page: 1
      }
    };
  }
  
  componentDidMount = () => {

    // Function to get jobs based on the current geocoordinates. If user denies access latest 50 jobs are fecthed.

    let currentComponent = this;
    navigator.geolocation.watchPosition(function(position) {
      
      if(currentComponent.state.jobs.length===0)
      {

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

      }
      
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

  // function to change theme (light/dark modes)

  toggleTheme = (event) => {
    let themeBool = event.target.checked;
    if(themeBool)
      this.setState({theme:'dark'});
    else
      this.setState({theme:'light'});

  }

  // function to filter job results based on search input values

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

  // initially last 50 jobs are fecthed. This function is used to fetch the next/prev 50 jobs if exist

  loadPage = (mode) => {

    let page_num = mode==='next' ? this.state.params.page+1 : this.state.params.page-1;

    this.setState({
      params : {
        ...this.state.params,
        'page': page_num 
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
          <div className="App" id={this.state.theme} >
            <Header toggle={this.toggleTheme} />
            <Switch>
                <Route path='/job/:id' component={Jobspecifications} />
                <Route path="/">
                  <Jobfilter search={this.handleSearch}/>
                  
                  <div className="row jobs-row">
                  
                  {this.state.jobs.length ?

                  <Fragment>
                    
                  {
                    this.state.jobs.map( (job,index) => {

                      return(
                        <div key={index} className="col-md-4 col-lg-4 col-sm-6 col-xs-12 jobs-col">
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
                  <div className="no-jobs">
                    <h4>
                      <b>No jobs found</b>
                    </h4>
                  </div>
                  }

                  </div>
                  <div className="pagination-options">  

                    {
                      this.state.params.page > 1
                      ?
                      <button className="btn" onClick={this.loadPage.bind(this,'prev')}>Prev</button>
                      :
                      null
                    }

                    {
                     this.state.jobs.length ===50
                     ?
                     <button className="btn" onClick={this.loadPage.bind(this,'next')}>Next</button>
                     :
                     null 
                    }

                  </div>

              </Route>

            </Switch>

        </div>
        </Fragment>
      </MDBContainer>
    );
  }

}

export default App;
