/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Alert, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ITflag from "../../assets/img/ITflag.png";
import ENGflag from "../../assets/img/ENGflag.png";
import JPflag from "../../assets/img/JPflag.png";

const CheckoutForm = ({ onSubmit, outOfStockItems, handleOpenCartAndRedirect }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const isDisabled = outOfStockItems.length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isDisabled) {
      const formData = new FormData(event.target);
      const formProps = Object.fromEntries(formData);
      onSubmit(formProps);
    }
  };

  const handleMouseEnter = () => {
    if (isDisabled) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Modifica il carrello prima di continuare
    </Tooltip>
  );

  const handleRedirect = () => {
    navigate(-1);
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

  return (
    <>
      <div className="bg-blue p-4 rounded-4 mt-5">
        <h5 className="mb-0">
          Compila i campi <span className="secondary-color">richiesti</span>
        </h5>
        <p className="fs-6 lead p-0 m-0 mb-4">I campi contrassegnati con * sono obbligatori</p>

        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Nome del destinatario*"
              name="recipientFirstName"
              required
              defaultValue={user.firstName}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Cognome del destinatario*"
              name="recipientLastName"
              required
              defaultValue={user.lastName}
            />
          </div>
          <div className="col-12">
            <input type="text" className="form-control" placeholder="Indirizzo*" name="address" required />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Numero civico*"
              name="buildingNumber"
              maxLength="10"
              required
            />
          </div>
          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Piano / Interno" name="apartmentFloorInterior" />
          </div>
          <div className="col-md-4">
            <input type="text" className="form-control" placeholder="CAP*" name="zipcode" required />
          </div>
          <div className="col-md-4">
            <input type="text" className="form-control" placeholder="Città*" name="city" required />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Provincia*"
              name="province"
              maxLength="2"
              minLength="2"
              required
            />
          </div>
          <div className="col-12">
            <input
              type="tel"
              className="form-control"
              placeholder="Telefono"
              name="phone"
              pattern="\d{1,20}"
              title="Il numero di telefono deve contenere solo numeri e può essere lungo massimo 20 cifre."
            />
          </div>

          <div className="col-12  d-flex justify-content-center">
            <div>
              <button className="me-2 btn px-4 rounded-pill btn-dark" onClick={handleRedirect}>
                Indietro
              </button>
            </div>
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <OverlayTrigger placement="bottom" overlay={renderTooltip} show={showTooltip}>
                <span>
                  <Button
                    className={`rounded-pill btn px-3 ${isDisabled ? "btn-secondary" : "btn-custom"}`}
                    type="submit"
                    disabled={isDisabled}
                  >
                    Prosegui
                  </Button>
                </span>
              </OverlayTrigger>
            </div>
          </div>
        </form>
      </div>

      <div className="mt-5">
        <h3>
          Riepilogo <span className="secondary-color">carrello</span>
        </h3>

        {outOfStockItems && outOfStockItems.length > 0 && (
          <Alert variant="danger">
            <p>Alcuni articoli nel tuo carrello non sono più disponibili nella quantità desiderata: </p>
            <ul>
              {outOfStockItems.map((item) => (
                <li key={item.productId}>
                  {item.name}: {item.availableQuantity} pezzi rimanenti disponibili
                </li>
              ))}
            </ul>
            <button className="btn btn-warning text-center" onClick={handleOpenCartAndRedirect}>
              Modifica il Carrello
            </button>
          </Alert>
        )}

        <div>
          <ul className="mb-4 p-0">
            {cartItems.map((product, index) => (
              <li key={index} className="list-group-item my-3 rounded-3 bg-blue p-3 text-white">
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
        <p className="text-end mt-3">
          Totale parziale:{" "}
          <span className="fs-1">
            €{cartItems.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2)}
          </span>
        </p>
        <p className="lead fs-6 text-center px-3">
          In fase di checkout non puoi modificare il carrello. Se desideri apportare delle modifiche all&apos;ordine
          clicca{" "}
          <span className="fw-bold cursor-pointer" onClick={handleOpenCartAndRedirect}>
            QUI!
          </span>
        </p>
      </div>
    </>
  );
};

export default CheckoutForm;
