import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

const StripeButton = ({ price }) => {
  const stripePrice = price * 100;
  const publishableToken =
    "pk_test_51IBQ8pBaQ2afoaAUZ7P5G4SHxfO0XnDNlKoTJrfk7PYK5a0mweWgp8PvwbCtzshDwkf34mWfouorlZ1XXTumpiSR009goOk0SP";

  const onToken = (token) => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: stripePrice,
        token,
      },
    })
      .then((response) => {
        console.log(response);
        alert("Payment went successful");
      })
      .catch((error) => {
        console.log("error", JSON.parse(error));
        alert("We had some problems with processing your payment");
      });
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
