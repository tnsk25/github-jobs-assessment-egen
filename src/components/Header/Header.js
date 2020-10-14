import React from 'react';
import './Header.css';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBFormInline, MDBIcon} from "mdbreact";

const Header = (props) => {

	return (

	<MDBNavbar color="indigo" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Job Board</strong>
        </MDBNavbarBrand>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBFormInline waves>
          		<MDBIcon className="theme-icon" icon="sun" />
			    <div className='custom-control custom-switch theme-switch'>
			        <input type='checkbox' className='custom-control-input' id='thememode' name="theme" onChange={props.toggle}/>
			        <label className='custom-control-label' htmlFor='thememode'></label>
			    </div>
			    <MDBIcon className="theme-icon" icon="moon" />
              </MDBFormInline>
            </MDBNavItem>
          </MDBNavbarNav>
     </MDBNavbar>


	);

}


export default Header;