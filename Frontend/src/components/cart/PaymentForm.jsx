import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import StripeIMG from "../../assets/img/stripe.png";
import ConfirmCancelModal from "./ConfirmCancelModal";
import { useEffect, useState } from "react";
import ITflag from "../../assets/img/ITflag.png";
import ENGflag from "../../assets/img/ENGflag.png";
import JPflag from "../../assets/img/JPflag.png";

// eslint-disable-next-line react/prop-types
const PaymentForm = ({ clientSecret, orderId, orderTotal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const handleCancelOrder = async () => {
    fetch(`https://localhost:7289/api/Orders/cancel/${orderId}`, { method: "PUT" })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to cancel order");
        toast.success("Ordine annullato con successo!");
        navigate("/");
      })
      .catch((error) => {
        toast.error("Errore nell'annullamento dell'ordine");
        console.error("Error cancelling order:", error);
      });
  };

  function getFlag(language) {
    switch (language) {
      case "Italiano":
        return ITflag;
      case "English":
        return ENGflag;
      case "Japanese":
        return JPflag;
      default:
        return "";
    }
  }

  useEffect(() => {
    if (orderId !== "N/A") {
      fetch(`https://localhost:7289/api/Orders/byorder/${orderId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setOrderDetails(data);
        })
        .catch((error) => console.error("Error fetching order details:", error));
    }
  }, [orderId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      toast.error(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        toast.success("Pagamento effettuato con successo!");
        localStorage.removeItem("cart");
        window.dispatchEvent(new CustomEvent("cartUpdated"));
        navigate(`/order-confirm`, { state: { orderId: orderId, orderTotal: orderTotal } });
      }
    }
  };

  return (
    <div className="container pt-3 pb-5">
      <div className="p-1 p-md-4 rounded-4">
        <div className="row">
          <div className="col-12">
            {orderDetails && orderDetails.orderProducts && (
              <div className="mt-4">
                <h4>
                  Riepilogo <span className="secondary-color">ordine</span>
                </h4>
                <ul className="mb-4 p-0">
                  {orderDetails.orderProducts.map((product) => (
                    <li key={product.productId} className="list-group-item my-3 rounded-3 bg-blue p-3 text-white">
                      <div className="d-flex align-items-center">
                        <img className="me-3" src={product.imageUrl} alt={product.name} style={{ height: "170px" }} />
                        <div>
                          <h4 className="mb-1">{product.name}</h4>
                          <p className="fw-light m-0 mb-1 p-0">
                            <span className="badge badge-rarity">{product.rarity}</span> -{" "}
                            <span className="text-secondary">{product.serialNumber}</span>
                          </p>
                          <div className="d-flex align-items-center">
                            <img
                              className="rounded-1"
                              src={getFlag(product.language)}
                              alt={`${product.language} flag`}
                              style={{ width: "30px", height: "20px", marginRight: "5px" }}
                            />
                            <p className="my-1 fw-light">{product.condition}</p>
                          </div>
                          <p className="my-1 fw-light">Quantità: {product.quantity}</p>
                          <p className="lead fs-6">€{parseFloat(product.price).toFixed(2)} cad</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            {orderDetails && orderDetails.shippingPrice && (
              <>
                <h5 className="text-end">
                  Spese di spedizione:{" "}
                  <strong className="fs-3">€{parseFloat(orderDetails.shippingPrice).toFixed(2)}</strong>
                </h5>
                <h4 className="text-end">
                  Totale Ordine: <strong className="fs-1">€{parseFloat(orderTotal).toFixed(2)}</strong>
                </h4>
              </>
            )}
          </div>

          <div className="row mt-3 mx-auto">
            <div className="col-12 bg-blue rounded-3 ms-auto col-lg-4 p-3  mb-3 mb-lg-0 me-0 me-lg-3">
              <h5 className="mb-3">
                Spedisci <span className="secondary-color">a</span>
              </h5>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="Indirizzo"
                  name="shippingAddress"
                  value="Indirizzo"
                  checked
                  readOnly
                />
                <label className="form-check-label" htmlFor="posteItaliane">
                  Indirizzo selezionato
                </label>
              </div>
              {orderDetails && orderDetails.orderProducts && (
                <>
                  {orderDetails.orderProducts && orderDetails.orderProducts.length > 0 && (
                    <div className="ms-4 mt-2 fw-light">
                      <p className="p-0 m-0">
                        {orderDetails.orderProducts[0].recipientFirstName}{" "}
                        {orderDetails.orderProducts[0].recipientLastName}
                      </p>
                      <p className="p-0 m-0">{orderDetails.orderProducts[0].address}</p>
                      <p className="p-0 m-0"> {orderDetails.orderProducts[0].buildingNumber}</p>
                      <p className="p-0 m-0">{orderDetails.orderProducts[0].apartmentFloorInterior}</p>
                      <p className="p-0 m-0">
                        {orderDetails.orderProducts[0].zipcode} {orderDetails.orderProducts[0].city}{" "}
                        {orderDetails.orderProducts[0].province}
                      </p>
                      <p className="p-0 m-0">{orderDetails.orderProducts[0].phone}</p>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="col-12 me-auto col-lg-7 col-xl-6 bg-blue p-3  rounded-3">
              <h5 className="mb-3">
                Completa il <span className="secondary-color">pagamento</span>
              </h5>
              <div className="form-check mb-2">
                <input
                  type="radio"
                  className="form-check-input"
                  id="Stripe"
                  name="stripePayment"
                  value="Stripe"
                  checked
                  readOnly
                />
                <label className="form-check-label" htmlFor="posteItaliane">
                  Pagamento con stripe
                </label>
              </div>
              <form onSubmit={handleSubmit}>
                <div>
                  <CardElement className="form-control" />
                </div>

                <div className="d-flex justify-content-center mt-3">
                  <button type="button" className="btn btn-dark me-2" onClick={() => setShowModal(true)}>
                    Annulla
                  </button>

                  <ConfirmCancelModal
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                    handleConfirm={() => {
                      setShowModal(false);
                      handleCancelOrder();
                    }}
                  />
                  <button type="submit" disabled={!stripe} className="btn btn-custom px-5 py-2">
                    Paga ora
                  </button>
                </div>

                <img
                  src={StripeIMG}
                  className="img-fluid mx-auto d-flex mt-3"
                  alt="powered by stripe"
                  style={{ width: "250px" }}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
