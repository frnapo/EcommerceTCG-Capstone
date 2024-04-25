import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../BackButton";

const OrdersByDate = () => {
  const { date } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`https://localhost:7289/api/Admin/GetOrdersByDate/${date}`);
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchOrders();
  }, [date]);

  return (
    <div className="text-center container">
      <div className="d-flex my-3 align-items-center justify-content-center">
        <div className="me-2">
          <BackButton />
        </div>
        <div>
          <h1 className="m-0 p-0">
            Ordini effettuati <span className="secondary-color">in data {date}</span>
          </h1>
        </div>
      </div>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.orderId} className="bg-blue p-3 rounded-4 my-3">
            <div className="d-flex justify-content-between align-items-end">
              <div>
                <p className="m-0 p-0">
                  <span className="fw-light">Ordine No.</span>{" "}
                  <span className="secondary-color fs-3">{order.orderId}</span>
                </p>
                <p className="p-0 m-0">
                  <span className="fw-light">Consegna:</span> {order.shippingMethod}
                </p>
                <p className="p-0 m-0">
                  <span className="fw-light">Data ordine:</span> {new Date(order.orderDate).toLocaleDateString()}
                </p>
                <p className="p-0 m-0">
                  <span className="fw-light">Stato ordine:</span> {order.status}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Nessun ordine trovato in questa data.</p>
      )}
    </div>
  );
};

export default OrdersByDate;
