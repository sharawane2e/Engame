// // stripe.button.component.jsx
// import React from "react";
// import StripeCheckout from "react-stripe-checkout";

// const StripeCheckoutButton = ({ price }) => {
//   const priceForStripe = price * 100;
//   const publishableKey = "pk_test_sLUqHXtqXOkwSdPosC8ZikQ800snMatYMb";

//   const onToken = (token) => {
//     console.log(token);
//     alert("Payment Succesful!");
//   };

//   return (
//     <StripeCheckout
//       label="Pay Now"
//       name="Freaky Jolly Co."
//       billingAddress
//       shippingAddress
//       image="https://www.freakyjolly.com/wp-content/uploads/2020/04/fj-logo.png"
//       description={`Your total is $${price}`}
//       amount={priceForStripe}
//       panelLabel="Pay Now"
//       token={onToken}
//       stripeKey={publishableKey}
//     />
//   );
// };

// export default StripeCheckoutButton;]

import React, { useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./App.css";
const App = () => {
  const stripe = loadStripe("pk_test_***************");
  return (
    <Elements stripe={stripe}>
      <CheckoutForm />
    </Elements>
  );
};
function CheckoutForm() {
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const payMoney = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setPaymentLoading(true);
    const clientSecret = getClientSecret();
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "Faruq Yusuff",
        },
      },
    });
    setPaymentLoading(false);
    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Success!");
      }
    }
  };

  return (
    <div
      style={{
        padding: "3rem",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <form
          style={{
            display: "block",
            width: "100%",
          }}
          onSubmit={payMoney}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CardElement
              className="card"
              options={{
                style: {
                  base: {
                    backgroundColor: "white",
                  },
                },
              }}
            />
            <button className="pay-button" disabled={isPaymentLoading}>
              {isPaymentLoading ? "Loading..." : "Pay"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
