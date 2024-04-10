import { useLocation } from "react-router-dom";

const OrderConfirmPage = () => {
  const location = useLocation();
  const { orderNumber, orderTotal } = location.state || { orderNumber: "N/A", orderTotal: "N/A" };

  return (
    <div className="container mt-5">
      <h1>Conferma dell ordine</h1>
      <p>Grazie per il tuo acquisto!</p>
      <p>
        Il numero del tuo ordine è: <strong>{orderNumber}</strong>
      </p>
      <p>
        Il totale del tuo ordine è: <strong>€{orderTotal}</strong>
      </p>
      <p>Una conferma è stata inviata alla tua email. Ti contatteremo non appena l ordine sarà spedito.</p>
    </div>
  );
};

export default OrderConfirmPage;
