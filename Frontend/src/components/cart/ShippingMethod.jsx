/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const ShippingMethod = ({ onProceed, orderDetails, cartTotal }) => {
  const [shippingOptions] = useState([
    { id: "posta4", name: "Posta 4", cost: 2.9 },
    { id: "posta1", name: "Posta 1", cost: 3.6 },
    { id: "postaInternational", name: "Posta International", cost: 4.9 },
  ]);

  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(cartTotal + selectedShipping.cost);
  }, [selectedShipping, cartTotal]);

  const handleSubmit = () => {
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
      <h5 className="mt-2 mb-4">
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
      <p>Costo Spedizione: €{selectedShipping.cost.toFixed(2)}</p>
      <p>Totale Ordine: €{total.toFixed(2)}</p>
      <button className="btn btn-primary" onClick={handleSubmit}>
        Procedi al Pagamento
      </button>
    </div>
  );
};

export default ShippingMethod;
