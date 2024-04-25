import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import fetchWithToken from "../../redux/wrapper";
import BackButton from "../BackButton";
import toast from "react-hot-toast";

const TotalOrders = () => {
  const [totalOrders, setTotalOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [searchId, setSearchId] = useState("");
  const [totalShippingCosts, setTotalShippingCosts] = useState(0);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    async function fetchTotalOrders() {
      try {
        const url = `https://localhost:7289/api/Admin/GetOrdersRecent`;
        const response = await fetchWithToken(url, token);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || `HTTP error! Status: ${response.status}`);
        }
        setTotalOrders(data);
        setFilteredOrders(data);
        calculateFinances(data);
      } catch (error) {
        console.error("Failed to fetch total orders:", error.message || error);
      }
    }
    fetchTotalOrders();
  }, [token]);

  const filterOrders = (status) => {
    if (status === "all") {
      setFilteredOrders(totalOrders);
    } else {
      const filtered = totalOrders.filter((order) => order.status === status);
      setFilteredOrders(filtered);
    }
  };

  const handleSearchChange = (e) => {
    setSearchId(e.target.value);
  };

  const searchOrder = () => {
    const foundOrder = totalOrders.find((order) => order.orderId.toString() === searchId);
    if (foundOrder) {
      setFilteredOrders([foundOrder]);
    } else {
      toast.error("Nessun ordine con questo ID");
      setFilteredOrders([]);
    }
  };

  const calculateFinances = (orders) => {
    const paidOrders = orders.filter((order) => order.status === "Pagato");
    const revenue = paidOrders.reduce((total, order) => total + order.total, 0);
    const shippingCosts = paidOrders.reduce((total, order) => total + order.shippingCost, 0);
    setTotalRevenue(revenue);
    setTotalShippingCosts(shippingCosts);
  };

  return (
    <div className="container">
      <div className="d-flex my-3 align-items-center justify-content-center">
        <div className="me-2">
          <BackButton />
        </div>
        <div>
          <h1 className="m-0 p-0">
            Tutti gli <span className="secondary-color">ordini</span>
          </h1>
        </div>
      </div>
      <div className="d-flex justify-content-center my-4">
        <div className="search-bar d-flex" style={{ width: "auto", maxWidth: "80%" }}>
          <input
            type="text"
            placeholder="Cerca un numero ordine"
            value={searchId}
            onChange={handleSearchChange}
            className="form-control rounded-end-0"
          />
          <button className="btn btn-primary rounded-start-0 btn-custom" onClick={searchOrder}>
            Cerca
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="button-group">
          <button className="btn mx-1 rounded-2 px-4 btn-custom" onClick={() => filterOrders("all")}>
            Tutti
          </button>
          <button className="btn mx-1 rounded-2 px-4 btn-custom" onClick={() => filterOrders("Spedito")}>
            Spediti
          </button>
          <button className="btn mx-1 rounded-2 px-4 btn-custom" onClick={() => filterOrders("Pagato")}>
            Pagati
          </button>
          <button className="btn mx-1 rounded-2 px-4 btn-custom" onClick={() => filterOrders("Non Pagato")}>
            Non Pagati
          </button>
          <button className="btn mx-1 rounded-2 px-4 btn-custom" onClick={() => filterOrders("Annullato")}>
            Annullato
          </button>
        </div>
      </div>

      <div className="my-4">
        <div className="p-3 rounded-3  bg-dark">
          <p className="p-0 m-0">
            Guadagni: <span className="fs-3">€{totalRevenue.toFixed(2)}</span> - Spese&Tasse:
            <span className="fs-3">€{totalShippingCosts.toFixed(2)}</span> = Totale:{" "}
            <span className="fs-2">€{(totalRevenue - totalShippingCosts).toFixed(2)}</span>
          </p>
        </div>
      </div>

      {filteredOrders.map((order) => (
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
  );
};

export default TotalOrders;
