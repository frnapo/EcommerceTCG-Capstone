/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Stripe, Truck } from "react-bootstrap-icons";

const ShippingMethod = ({ onProceed, orderDetails, cartTotal, onGoBack }) => {
  const [shippingOptions] = useState([
    { id: "posta4", name: "Posta 4", cost: 2.9 },
    { id: "posta1", name: "Posta 1", cost: 3.6 },
    { id: "postaInternational", name: "Posta International", cost: 4.9 },
  ]);

  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);
  const [total, setTotal] = useState(0);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  useEffect(() => {
    setTotal(cartTotal + selectedShipping.cost);
  }, [selectedShipping, cartTotal]);

  const handleSubmit = () => {
    if (!acceptedPrivacy) {
      toast.error("Devi accettare l'Informativa sulla Privacy per procedere");
      return;
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const items = cart.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      discountApplied: item.discountApplied || null,
    }));

    const completeOrderDetails = {
      ...orderDetails,
      items: items,

      shippingMethod: selectedShipping.name,
      shippingCost: selectedShipping.cost,
    };

    onProceed(completeOrderDetails);
  };

  return (
    <div>
      <div className="alert alert-info mt-5" role="alert">
        <h4 className="alert-heading">Sicurezza Pagamenti</h4>
        <p>
          La sicurezza dei tuoi pagamenti è la nostra priorità. Tutte le transazioni sono criptate e gestite
          direttamente tramite <strong>Stripe</strong>, leader mondiale nei servizi di pagamento online. Nessun dato
          relativo alla tua carta di credito viene memorizzato sui nostri server.
        </p>
        <hr />
        <p className="mb-0">
          Procedendo con il pagamento, accetti le{" "}
          <a href="https://stripe.com/en-it/legal/ssa/it-it" target="_blank" className="alert-link">
            condizioni del servizio
          </a>{" "}
          e la{" "}
          <a href="https://stripe.com/it/privacy" target="_blank" className="alert-link">
            privacy policy
          </a>{" "}
          di Stripe.
        </p>
      </div>

      <div className="row d-flex justify-content-center">
        <div className="col-12 col-lg-8 mb-4">
          <div className="bg-blue rounded-4 p-3">
            <fieldset className="mb-3">
              <legend>
                Opzioni di <span className="secondary-color">spedizione</span>
              </legend>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="posteItaliane"
                  name="shippingOption"
                  value="posteItaliane"
                  checked
                  readOnly
                />
                <label className="form-check-label" htmlFor="posteItaliane">
                  Poste Italiane
                </label>
              </div>
            </fieldset>

            <h5 className="mb-3">
              Seleziona metodo di <span className="secondary-color">spedizione</span>
            </h5>

            <select
              className="form-select"
              value={selectedShipping.id}
              onChange={(e) => setSelectedShipping(shippingOptions.find((option) => option.id === e.target.value))}
            >
              {shippingOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name} - €{option.cost.toFixed(2)}
                </option>
              ))}
            </select>
            <p className="lead fs-6 text-secondary mt-3">
              <Truck /> I tempi di consegna possono variare da 4 a 7 giorni lavorativi, a seconda della destinazione.
            </p>
          </div>
        </div>

        <div className="col-12 col-lg-auto d-flex justify-content-end  align-self-end mb-4">
          <div className="bg-blue rounded-4 px-3 py-1">
            <div className="text-end">
              <p className="m-0 mt-2 p-0">
                Spedizione <span className="fs-3">€{selectedShipping.cost.toFixed(2)}</span>
              </p>
              <p>
                Totale Ordine <span className="fs-1">€{total.toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 mb-4 d-flex justify-content-center">
        <input
          type="checkbox"
          className="form-check-input me-2"
          id="privacyPolicy"
          checked={acceptedPrivacy}
          onChange={() => setAcceptedPrivacy(!acceptedPrivacy)}
        />
        <label className="form-check-label d-block cursor-pointer" htmlFor="privacyPolicy">
          Accetto l&apos;
          <a href="#" className="text-decoration-none secondary-color">
            Informativa Breve sulla Privacy
          </a>{" "}
          per le operazioni di Spedizione
        </label>
      </div>

      <div className="text-center pb-4">
        <button className="btn px-4 py-2 btn-dark rounded-pill me-2" onClick={onGoBack}>
          Indietro
        </button>
        <button
          className={`btn rounded-pill px-4 py-2  ${acceptedPrivacy ? "btn-custom" : "btn-secondary"}`}
          onClick={handleSubmit}
          disabled={!acceptedPrivacy}
        >
          <Stripe /> Pagamento
        </button>
      </div>
    </div>
  );
};

export default ShippingMethod;
