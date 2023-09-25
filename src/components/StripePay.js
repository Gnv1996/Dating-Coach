
import React from 'react';
import { checkOut } from './lib/checkOut';
import { useNavigate } from 'react-router-dom';
function StripePay(props) {
  console.log(props)
const Navigate=useNavigate()
  async function handleCheckout() {
    
    const email = props?.email
    if(email===null){
      Navigate('/login')
    }else{
      checkOut({payID:props.payID, email: email,plan:props.selected==="1 month - 5$"?"Monthly":"Yearly"})
    }
   
  }

  return(
    <button
      type='submit'
      className='signin__btn'
      onClick={() => handleCheckout()}
      >
      {props?.payPeriod}
    </button>
  )
}

export default StripePay
