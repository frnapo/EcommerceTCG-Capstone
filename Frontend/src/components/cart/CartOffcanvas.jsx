/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import CartManager from "./CartManager";
import toast from "react-hot-toast";
import CloseIcon from "../../assets/icons/CloseIcon";
import { X } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const CartOffcanvas = ({ showCart, onClose }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (showCart) {
      const items = CartManager.getCart();
      setCartItems(items);
    }
  }, [showCart]);

  const handleRemoveItem = (productId) => {
    const productToRemove = cartItems.find((item) => item.productId === productId);
    if (productToRemove) {
      CartManager.removeFromCart(productId);
      const updatedItems = cartItems.filter((item) => item.productId !== productId);
      setCartItems(updatedItems);
    } else {
      toast.error("Prodotto non trovato nel carrello.");
    }
  };

  const handleQuantityChange = (event, productId, availableQuantity) => {
    const newQuantity = Math.min(event.target.value, availableQuantity);
    if (newQuantity > 0 && newQuantity <= availableQuantity) {
      CartManager.updateProductQuantity(productId, newQuantity);
      const updatedItems = cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedItems);
    }
  };

  const handleClearCart = () => {
    CartManager.clearCart();
    setCartItems([]);
  };

  return (
    <Offcanvas show={showCart} onHide={onClose} placement="end" className="custom-offcanvas">
      <Offcanvas.Header className="d-flex justify-content-between">
        <div>
          <Offcanvas.Title className="fs-1">Carrello</Offcanvas.Title>
        </div>
        <div className="cursor-pointer" onClick={onClose}>
          <CloseIcon />
        </div>
      </Offcanvas.Header>

      <Offcanvas.Body>
        {cartItems.length > 0 ? (
          <>
            <hr className="m-0 p-0" />
            <p className="text-center my-4 lead fs-4">{`Hai ${cartItems.length} articoli nel carrello`}</p>
            <hr className="m-0 p-0" />
            {cartItems.map((item) => (
              <div className="row my-4 d-flex align-items-center" key={item.productId}>
                <div className="col-3">
                  <img src={item.imageUrl} alt={item.name} style={{ width: "70px", marginRight: "10px" }} />
                </div>
                <div className="col-5">
                  <p className="m-0 p-0 fs-4">{item.name}</p>
                  <p className="m-0 p-0 lead fs-6">
                    €{(item.quantity * item.price).toFixed(2)} ({item.quantity} x €{item.price.toFixed(2)})
                  </p>
                </div>
                <div className="col-2">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(e, item.productId, item.availableQuantity)}
                    min="1"
                    max={item.availableQuantity}
                    style={{ width: "35px" }}
                  />
                </div>

                <div className="col-2" onClick={() => handleRemoveItem(item.productId)}>
                  <X className="fs-4 cursor-pointer custom-icon" />
                </div>
              </div>
            ))}

            <p>
              Totale{" "}
              <span className="fs-1">
                €{cartItems.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2)}
              </span>
            </p>

            <div className="d-flex flex-column justify-content-center">
              <Link
                to="/checkout"
                className="py-2 fw-bold mb-3 rounded-pill text-center text-decoration-none fs-4 btn-custom"
                style={{ marginInline: "60px" }}
                onClick={onClose}
              >
                Checkout
              </Link>
              <button
                onClick={handleClearCart}
                className="py-2 fw-bold rounded-pill btn btn-dark fs-4"
                style={{ marginInline: "60px" }}
              >
                Svuota Carrello
              </button>
            </div>
          </>
        ) : (
          <p className="text-center mt-4 lead fs-3">Il carrello è vuoto</p>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartOffcanvas;
