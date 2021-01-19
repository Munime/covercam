import StripeCheckout from "react-stripe-checkout";

const StripeButton = ({ price }) => {
  const stripePrice = price * 100;
  const publishableToken =
    "pk_test_51IBQ8pBaQ2afoaAUZ7P5G4SHxfO0XnDNlKoTJrfk7PYK5a0mweWgp8PvwbCtzshDwkf34mWfouorlZ1XXTumpiSR009goOk0SP";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Recieved");
  };
  return (
    <StripeCheckout
      name="CoverCam Ltd."
      label="Pay Now"
      description={`Your total is $${price}`}
      amount={stripePrice}
      currency="USD"
      panelLabel="Pay Now"
      shippingAddress
      billingAddress
      stripeKey={publishableToken}
      token={onToken}
    />
  );
};

export default StripeButton;
