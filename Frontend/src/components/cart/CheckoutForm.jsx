/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const CheckoutForm = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    onSubmit(formProps);
  };

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  return (
    <>
      <h5 className="mt-2 mb-4">
        Compila i campi <span className="secondary-color">richiesti</span>
      </h5>

      <div className="my-5">
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Nome del destinatario"
              name="recipientFirstName"
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Cognome del destinatario"
              name="recipientLastName"
              required
            />
          </div>
          <div className="col-12">
            <input type="text" className="form-control" placeholder="Indirizzo" name="address" required />
          </div>
          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Numero civico" name="buildingNumber" required />
          </div>
          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Piano / Interno" name="apartmentFloorInterior" />
          </div>
          <div className="col-md-4">
            <input type="text" className="form-control" placeholder="CAP" name="zipcode" required />
          </div>
          <div className="col-md-4">
            <input type="text" className="form-control" placeholder="Città" name="city" required />
          </div>
          <div className="col-md-4">
            <input type="text" className="form-control" placeholder="Provincia" name="province" required />
          </div>
          <div className="col-12">
            <input type="tel" className="form-control" placeholder="Telefono" name="phone" />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Prosegui
            </button>
          </div>
        </form>
      </div>

      <div>
        <div className="my-5">
          <h2>Riepilogo Carrello</h2>
          <ul className="list-group">
            {cartItems.map((item, index) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                {item.name}
                <span>
                  Quantità: {item.quantity} - Prezzo: €{item.price.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-end mt-3">
            Totale: €{cartItems.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2)}
          </p>
        </div>
        <p className="lead fs-6 text-center px-3">
          In fase di checkout non puoi modificare il carrello. Se desideri apportare delle modifiche all&apos;ordine
          torna indietro e riesegui il checkout!
        </p>
      </div>
    </>
  );
};

export default CheckoutForm;
