import { useEffect, useState } from "react";
import BackButton from "../BackButton";
import fetchWithToken from "../../redux/wrapper";
import { useSelector } from "react-redux";

const TodaysOrders = () => {
  const [todaysOrders, setTodaysOrders] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    async function fetchTotalOrders() {
      try {
        const url = `https://localhost:7289/api/Admin/GetTodayOrders`;
        const response = await fetchWithToken(url, token);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || `HTTP error! Status: ${response.status}`);
        }
        setTodaysOrders(data);
      } catch (error) {
        console.error("Failed to fetch total orders:", error.message || error);
      }
    }
    fetchTotalOrders();
  }, [token]);

  return (
    <div className="container">
      <div className="d-flex my-3 align-items-center justify-content-center">
        <div className="me-2">
          <BackButton />
        </div>
        <div>
          <h1 className="m-0 p-0">
            Ordini effettuati <span className="secondary-color">oggi</span>
          </h1>
        </div>
      </div>
      <div>
        {todaysOrders.map((order) => (
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
        ))}
      </div>
    </div>
  );
};

export default TodaysOrders;
