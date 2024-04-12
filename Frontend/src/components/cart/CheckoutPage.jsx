import { useState, useEffect } from "react";
import CheckoutForm from "./CheckoutForm";
import ShippingMethod from "./ShippingMethod";
import fetchWithToken from "../../redux/wrapper";
import { useSelector } from "react-redux";
import PaymentForm from "./PaymentForm";
import ProgressBar from "../cart/ProgressBar";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [step, setStep] = useState(1);
  const [orderDetails, setOrderDetails] = useState({});
  const [cartTotal, setCartTotal] = useState(0);
  const [outOfStockItems, setOutOfStockItems] = useState([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    setCartTotal(total);
  }, []);

  const userId = useSelector((state) => state.auth.user.id);
  // console.log(userId);

  const handleFormSubmit = (formData) => {
    setOrderDetails({ ...orderDetails, ...formData });
    setStep(2);
  };

  const handleProceedToPayment = async (completeOrderDetails) => {
    const token = localStorage.getItem("userToken");

    if (!Array.isArray(completeOrderDetails.items)) {
      console.error("completeOrderDetails.items non è un array:", completeOrderDetails.items);
      return;
    }

    console.log("Dati dell'ordine completi:", completeOrderDetails);
    const orderDataToSend = {
      ...completeOrderDetails,
      userId: userId,
      items: completeOrderDetails.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        discountApplied: item.discountApplied || null,
      })),
    };

    const apiUrl = "https://localhost:7289/api/Cart/createorder";
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(orderDataToSend),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      console.log("Invio dell'ordine in corso...");
      const response = await fetchWithToken(apiUrl, token, fetchOptions);
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Errore durante la creazione dell'ordine:", errorResponse);
        throw new Error("Errore durante la creazione dell'ordine");
      }
      const orderResponse = await response.json();
      console.log("Ordine creato con successo:", orderResponse);
      setOrderDetails({
        ...orderDetails,
        ...completeOrderDetails,
        clientSecret: orderResponse.clientSecret,
        orderId: orderResponse.orderId,
        orderTotal: orderResponse.orderTotal,
      });
      setStep(3);
    } catch (error) {
      console.error("Errore durante l'invio dell'ordine:", error);
    }
  };

  useEffect(() => {
    const verifyCartQuantities = async () => {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      let itemsOutOfStock = [];

      for (const item of cartItems) {
        try {
          const response = await fetch(`https://localhost:7289/api/products/${item.productId}`);
          if (!response.ok) {
            throw new Error("Problema nella fetch dei prodotti");
          }
          const product = await response.json();

          if (product.availableQuantity < item.quantity) {
            itemsOutOfStock.push({ ...item, availableQuantity: product.availableQuantity });
          }
        } catch (error) {
          console.error("Errore durante la verifica delle quantità:", error);
        }
      }

      setOutOfStockItems(itemsOutOfStock);
    };

    verifyCartQuantities();
  }, []);

  const navigate = useNavigate();

  const handleOpenCartAndRedirect = () => {
    window.dispatchEvent(new CustomEvent("openCart"));
    navigate(-1);
  };

  const handleGoBack = () => {
    setStep((currentStep) => Math.max(currentStep - 1, 1));
  };
  return (
    <div className="container">
      <h1 className="mt-4">
        Il tuo <span className="secondary-color">Ordine</span>
      </h1>

      <ProgressBar currentStep={step} />
      {step === 1 && (
        <CheckoutForm
          onSubmit={handleFormSubmit}
          outOfStockItems={outOfStockItems}
          handleOpenCartAndRedirect={handleOpenCartAndRedirect}
        />
      )}
      {step === 2 && (
        <ShippingMethod
          onGoBack={handleGoBack}
          onProceed={handleProceedToPayment}
          orderDetails={orderDetails}
          cartTotal={cartTotal}
        />
      )}
      {step === 3 && (
        <PaymentForm
          clientSecret={orderDetails.clientSecret}
          orderId={orderDetails.orderId}
          orderTotal={orderDetails.orderTotal}
        />
      )}
    </div>
  );
};

export default CheckoutPage;
