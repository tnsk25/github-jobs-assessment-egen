import React from 'react';
import './Jobfilter.css';

const Jobfilter = (props) => {

	return (

		<form className="filterform" onSubmit={props.search}>
		  <div className="row">
		    <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
		      <div className="md-form mt-0">
			    <i className="filter-icon fas fa-search prefix"></i>
		        <input type="text" name="description" className="form-control" id="details" placeholder="Title, company, skill.."/>
		      </div>
		    </div>

		    <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
		      <div className="md-form mt-0">
		      	<i className="filter-icon fas fa-map-marker-alt prefix"></i>
		        <input type="text" name="location" className="form-control" id="location" placeholder="Location.."/>
		      </div>
		    </div>

		    <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">

		    	<div className="d-flex justify-content-around">

		    		<div className="custom-control custom-checkbox fulltime-checkbox">
						<input type="checkbox" name="full_time" className="custom-control-input" id="defaultUnchecked" />
						<label className="custom-control-label" htmlFor="defaultUnchecked"><b>Full Time Only</b></label>				    
					</div>

					<div className="button-submit">
		    			<button type="submit" className="btn btn-primary">Search</button>
		    		</div>

		    	</div>

		    </div>
		  </div>
		</form>

);

};


export default Jobfilter;