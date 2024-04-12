import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ITflag from "../../assets/img/ITflag.png";
import ENGflag from "../../assets/img/ENGflag.png";
import JPflag from "../../assets/img/JPflag.png";
import toast from "react-hot-toast";
import CartManager from "./CartManager";

const OrderConfirmPage = () => {
  const location = useLocation();
  const { orderId, orderTotal } = location.state || { orderId: "N/A", orderTotal: "N/A" };
  const [orderDetails, setOrderDetails] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  const handleAddToCart = (product) => {
    if (product) {
      const wasAdded = CartManager.addToCart(product, 1);

      if (wasAdded) {
        toast.success(`Aggiunto ${product.name}, Quantità: 1 al carrello.`);
      } else {
        toast.error(`Non puoi aggiungere più di ${product.availableQuantity} unità di ${product.name} al carrello.`);
      }
    } else {
      toast.error("Nessun prodotto selezionato.");
    }
  };

  useEffect(() => {
    if (orderId !== "N/A") {
      fetch(`https://localhost:7289/api/Orders/byorder/${orderId}`)
        .then((response) => response.json())
        .then((data) => {
          setOrderDetails(data);
        })
        .catch((error) => console.error("Error fetching order details:", error));

      fetch(`https://localhost:7289/api/Orders/suggested/${orderId}`)
        .then((response) => response.json())
        .then((data) => setSuggestedProducts(data))
        .catch((error) => console.error("Error fetching suggested products:", error));
    }
  }, [orderId]);

  if (!orderId) {
    return (
      <div className="alert alert-danger" role="alert">
        Ordine non trovato o accesso non autorizzato.
      </div>
    );
  }

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

  return (
    <div className="container mt-5">
      <h2 className="mb-3">
        Il pagamento è andato a <span className="secondary-color">buon fine!</span>
      </h2>
      <div className="alert alert-success" role="alert">
        <h4 className="alert-heading">Conferma dell&apos;ordine n.{orderId}</h4>
        <p>Ti ringraziamo per il tuo acquisto!</p>
        <hr />
        <p className="mb-0">
          Una conferma è stata inviata alla tua email, ti ricontatteremo non appena l&apos;ordine sarà spedito. Cosa
          devi fare ora?
          <br />
          <br />
          Puoi aspettare comodamente il corriere a casa tua, oppure seguire la spedizione dal link che ti abbiamo
          inviato se hai selezionato una spedizione che prevede il tracking.
          <br />
          Puoi consultare tutti i tuoi ordini{" "}
          <a href="#" className="text-decoration-none">
            cliccando qui
          </a>
          .
        </p>
      </div>

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
          <h5 className="text-end">
            Spese di spedizione: <strong className="fs-3">€{parseFloat(orderDetails.shippingPrice).toFixed(2)}</strong>
          </h5>
          <h4 className="text-end">
            Totale Ordine: <strong className="fs-1">€{parseFloat(orderTotal).toFixed(2)}</strong>
          </h4>
        </div>
      )}

      {suggestedProducts.length > 0 && (
        <div>
          <h5 className="mt-5 mb-3">
            Prodotti Consigliati in base al tuo <span className="secondary-color">acquisto</span>
          </h5>
          <div className="row p-3 bg-blue mb-4 rounded-3">
            {suggestedProducts.map((product) => (
              <div key={product.productId} className="  col-6 col-md-3 mb-1">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{ width: "130px" }}
                  className="d-flex mx-auto mb-2"
                />
                <div className=" text-center">
                  <h5 className="">{product.name}</h5>
                  <button onClick={() => handleAddToCart(product)} className="btn btn-custom">
                    Carrello - €{product.price}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmPage;
