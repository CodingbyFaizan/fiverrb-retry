// import React, { useState } from 'react'
// import "./Pay.scss"
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import newRequest from "../../utils/newRequest.js";
// import {useParams} from "react-router-dom";
// import CheckoutForm from "../../components/checkoutForm/CheckoutForm"

// const stripePromise = loadStripe("pk_test_51MqZorSGnj6acjKEpkyax6qI09veigk3O4cIYY9tzyFsLQKRwGy8nKtJ5I5GGRrDIti0Y8fCnUUitQS8z7U8AZBy00uDlyo9Ow");


// const Pay = () => {
//     const [clientSecret, setClientSecret] = useState("");
//     const {id} = useParams()

//     useEffect(() => {
//         const makeRequest = async () => {
//             try{
//                 const res = await newRequest.post(`/orders/create-payment-intent/${id}`
//                 );
//                 setClientSecret(res.data.clientSecret); 
//             }catch(err){
//                 console.log(err);
//             }
//         };
//         makeRequest();
//     },[]);

//     const appearance = {
//         theme: 'stripe',
//       };
//       const options = {
//         clientSecret,
//         appearance,
//       };

//   return (
//     <div className='pay'>
//         {clientSecret && (
//         <Elements options={options} stripe={stripePromise}>
//           <CheckoutForm/>
//         </Elements>
//       )}
//     </div>  
//   )
// }

// export default Pay;

import React, { useEffect, useState } from "react";
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51MqZorSGnj6acjKEpkyax6qI09veigk3O4cIYY9tzyFsLQKRwGy8nKtJ5I5GGRrDIti0Y8fCnUUitQS8z7U8AZBy00uDlyo9Ow"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return <div className="pay">
    {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
  </div>;
};

export default Pay;