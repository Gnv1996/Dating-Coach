import getStripe from "./getStripe";

export const checkOut = async (data) => {
 
    const email = data.email
    const stripe = await getStripe();

   

    const {error} = await stripe?.redirectToCheckout({
      lineItems: [
        {
          price:data.payID,
          quantity: 1,
        },
        
      ],
 
      mode: 'subscription',
      successUrl:
       `http://localhost:5154/#/success?pay=${data.plan==="Monthly"?5:50}&plan=${data.plan}&user=verified`,
      cancelUrl: `http://localhost:5154/#/cancel`,
      customerEmail: email
    })
   console.log(error.message)

  return checkOut;
};
