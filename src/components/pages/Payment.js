
import React, { useState,useEffect } from 'react';
import StripePay from '../StripePay';
import * as EmailValidator from 'email-validator'

const options = ['1 month - 5$', '1 year - 50$']

const Payment = () => {
  // u
  const userData = JSON.parse(window.localStorage.getItem('userdata'));
  const email = userData && userData.hasOwnProperty('email') ? userData.email : null
  if(!EmailValidator.validate(email)){
    console.log("please login")
  }
    

  const [selected, setSelected] = useState(options[0]);

  // screen Dimension

  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  	function getCurrentDimension(){
    	return {
      		InnerWidth: window.innerWidth,
      		InnerHeight: window.innerHeight
    	}
  	}
  
  	useEffect(() => {
    		const updateDimension = () => {
      			setScreenSize(getCurrentDimension())
    		}
    		window.addEventListener('resize', updateDimension);
    
		
    		return(() => {
        		window.removeEventListener('resize', updateDimension);
    		})
  	}, [screenSize])
  
  
  return (
    <div className='chatview' style={{ width:"100%",height:screenSize.InnerHeight }}>
    <br/>
    <br/>
    <div align='center'>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className='dropdown'>
        { options.map((item, key) => <option key={key} >{options[key]}</option>) }
      </select>
      <br/>
      <br/>
      {
        selected === "1 month - 5$"
        ?
        (
          <StripePay
            email={email}
            payID={process.env.REACT_APP_PUBLIC_STRIPE_PRICE_ID_MONTH}
            payPeriod="Pay for month"
            selected={selected}
          />
        )
        : null
      }
      {
        selected === "1 year - 50$"
        ?
        (
          <StripePay
            email={email}
            payID={process.env.REACT_APP_PUBLIC_STRIPE_PRICE_ID_YEAR}
            payPeriod="Pay for year"
            selected={selected}
          />
        )
        : null
      }
    </div>
    </div>
  );
};

export default Payment;
