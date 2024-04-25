import { useSelector } from "react-redux";
import BackButton from "../BackButton";
import fetchWithToken from "../../redux/wrapper";
import { useEffect, useState } from "react";
import { Box2Fill, ChevronDown, ChevronUp, X } from "react-bootstrap-icons";
import { motion } from "framer-motion";
import ITflag from "../../assets/img/ITflag.png";
import ENGflag from "../../assets/img/ENGflag.png";
import JPflag from "../../assets/img/JPflag.png";
import { Button, Modal } from "react-bootstrap";
import toast from "react-hot-toast";

const OrdersToShip = () => {
  const [ordersToShip, setOrdersToShip] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [refreshCount, setRefreshCount] = useState(0);

  const handleOpenModal = (orderId) => {
    setSelectedOrderId(orderId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmShipping = async () => {
    if (selectedOrderId) {
      const response = await fetch(`https://localhost:7289/api/Admin/ShipOrder/${selectedOrderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        toast.success("Ordine spedito con successo!");
        setRefreshCount((count) => count + 1);
      } else {
        toast.error("Errore durante la spedizione dell'ordine.");
      }
      setShowModal(false);
    }
  };

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    async function fetchTotalOrders() {
      try {
        const url = `https://localhost:7289/api/Admin/GetOrdersPaid`;
        const response = await fetchWithToken(url, token);
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error(data.message || `HTTP error! Status: ${response.status}`);
        }
        setOrdersToShip(data);
      } catch (error) {
        console.error("Failed to fetch total orders:", error.message || error);
      }
    }
    fetchTotalOrders();
  }, [token, refreshCount]);

  const fetchOrderDetails = async (orderId) => {
    try {
      if (expandedId === orderId) {
        setExpandedId(null);
        return;
      }
      const response = await fetch(`https://localhost:7289/api/Orders/byorder/${orderId}`);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      console.log(data);
      setOrderDetails({ ...orderDetails, [orderId]: data.orderProducts });
      setExpandedId(orderId);
    } catch (error) {
      console.error("Failed to fetch order details:", error);
    }
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
    <div className="container">
      <div className="d-flex my-3 align-items-center justify-content-center">
        <div className="me-2">
          <BackButton />
        </div>
        <div>
          <h1 className="m-0 p-0">
            Ordini da <span className="secondary-color">spedire</span>
          </h1>
        </div>
      </div>

      {ordersToShip.map((order) => (
        <div key={order.orderId} className="bg-blue p-3 rounded-4 my-3">
          <div className="d-flex justify-content-between align-items-end">
            <div>
              <p className="p-0 m-0">
                <span className="fw-light">Da spedire a</span> {order.recipientFirstName} {order.recipientLastName}
              </p>
              <p className="p-0 m-0">
                <span className="fw-light">in</span> {order.address}, {order.buildingNumber}
              </p>
              <p className="p-0 m-0">
                <span className="fw-light">a</span> {order.city}, {order.province}, {order.zipcode}
              </p>
              <p className="p-0 m-0">
                <span className="fw-light">Cellulare</span> {order.phone}
              </p>
              <p className="p-0 m-0">
                <span className="fw-light">Costo sped.</span> €{parseFloat(order.shippingCost).toFixed(2)}
              </p>
              <p className="p-0 m-0">
                <span className="fw-light">Totale</span> €{parseFloat(order.total).toFixed(2)}
              </p>
              <div className="mt-1">
                <button className="px-3 btn btn-custom" onClick={() => handleOpenModal(order.orderId)}>
                  Spedisci
                  <Box2Fill className="ms-2 mb-1" />{" "}
                </button>
                <button
                  className="m-0 btn btn-dark mx-2"
                  style={{ paddingTop: "4.2px" }}
                  onClick={() => fetchOrderDetails(order.orderId)}
                >
                  {expandedId ? (
                    <ChevronDown className="fs-4 cursor-pointer custom-expand-icon text-white" />
                  ) : (
                    <ChevronUp className="fs-4 cursor-pointer custom-expand-icon text-white" />
                  )}
                </button>
              </div>
            </div>
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
          {expandedId === order.orderId && (
            <motion.div
              className="order-details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <ul className="p-0">
                {orderDetails[order.orderId] &&
                  orderDetails[order.orderId].map((product) => (
                    <motion.li
                      key={product.productId}
                      className="list-group-item mt-4 text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
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
                    </motion.li>
                  ))}
              </ul>
            </motion.div>
          )}
        </div>
      ))}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header className="bg-blue border-0">
          <Modal.Title className="bg-blue border-0 w-100">
            <div className="d-flex justify-content-between align-items-center">
              <div>Conferma Spedizione</div>
              <div>
                <X className="fs-4 cursor-pointer custom-icon" onClick={handleCloseModal} />
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="bg-blue">
          Spedire l&apos;ordine <span className="secondary-color fs-4">n{selectedOrderId}</span> ?
        </Modal.Body>
        <Modal.Footer className="bg-blue border-0">
          <Button className="btn-dark" onClick={handleCloseModal}>
            Annulla
          </Button>
          <Button className="btn-custom" onClick={handleConfirmShipping}>
            Conferma
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrdersToShip;
