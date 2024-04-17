import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { Cart, PersonCircle, BoxArrowLeft } from "react-bootstrap-icons";

const UserComponent = () => {
  const [activeSection, setActiveSection] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [editableData, setEditableData] = useState({
    firstName: "",
    lastName: "",
  });
  const userData = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  useEffect(() => {
    setEditableData({
      firstName: userData.firstName,
      lastName: userData.lastName,
    });
  }, [userData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditableData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateInput = (data) => {
    let isValid = true;
    const errors = {};

    if (data.firstName.length < 3 || data.firstName.length > 50 || /\d/.test(data.firstName)) {
      errors.firstName = "Il nome deve essere tra 3 e 50 caratteri e non contenere numeri.";
      isValid = false;
    }

    if (data.lastName.length < 3 || data.lastName.length > 50 || /\d/.test(data.lastName)) {
      errors.lastName = "il cognome deve essere tra 3 e 50 caratteri e non contenere numeri.";
      isValid = false;
    }

    if (!isValid) {
      toast.error(Object.values(errors).join(" "));
    }

    return isValid;
  };

  useEffect(() => {
    if (activeSection === "orders") {
      fetchOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection]);

  const fetchOrders = async () => {
    const response = await fetch(`https://localhost:7289/api/Orders/orderbyuser/${userData.id}`);
    const data = await response.json();
    console.log(data);
    setOrders(data);
  };

  const updateUser = async () => {
    if (!validateInput(editableData)) {
      return;
    }
    const response = await fetch(`https://localhost:7289/api/Auth/updateuser/${userData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: editableData.firstName,
        lastName: editableData.lastName,
      }),
    });

    if (response.ok) {
      toast.success("Dati aggiornati con successo!");
    } else {
      toast.error("Errore durante l'aggiornamento dei dati.");
    }
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd/MM/yyyy, HH:mm:ss", { locale: it });
  };

  const renderContent = () => {
    switch (activeSection) {
      case "orders":
        return (
          <div className="bg-blue p-3 rounded-4 mt-3 mb-4">
            <h5 className="text-center mb-3 secondary-color">I tuoi ordini</h5>
            {orders.map((order) => (
              <div key={order.orderId} className="bg-background-color p-3 rounded-4 my-3">
                <p className="m-0 p-0">
                  <span className="fw-light">Ordine No.</span>{" "}
                  <span className="secondary-color fs-3">{order.orderId}</span>
                </p>
                <p className="p-0 m-0">
                  <span className="fw-light">Consegna:</span> {order.shippingMethod}
                </p>
                <p className="p-0 m-0">
                  <span className="fw-light">Data ordine:</span> {formatDate(order.orderDate)}
                </p>
                <p className="p-0 m-0">
                  <span className="fw-light">Stato ordine:</span> {order.status}
                </p>
              </div>
            ))}
          </div>
        );
      case "account":
        return (
          <div className="bg-blue p-3 rounded-4 mt-3 mb-4">
            <h5 className="text-center mb-3 secondary-color">I tuoi dati</h5>
            <div className="form-group row my-2">
              <label className="col-sm-3 col-form-label text-start text-md-end">Nome:</label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  value={editableData.firstName}
                  onChange={handleInputChange}
                  name="firstName"
                />
              </div>
            </div>
            <div className="form-group row my-2">
              <label className="col-sm-3 col-form-label text-start text-md-end">Cognome:</label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  value={editableData.lastName}
                  onChange={handleInputChange}
                  name="lastName"
                />
              </div>
            </div>
            <div className="form-group row my-2">
              <label className="col-sm-3 col-form-label text-start text-md-end">Email:</label>
              <div className="col-sm-7">
                <input type="text" className="form-control" value={userData.email} disabled name="email" />
              </div>
            </div>
            <div className="form-group row my-2">
              <label className="col-sm-3 col-form-label text-start text-md-end">Password:</label>
              <div className="col-sm-7">
                <input type="text" className="form-control" value="••••••••••••••" disabled />
              </div>
            </div>
            <div className="form-group row my-2">
              <label className="col-sm-3 col-form-label text-start text-md-end">Paese:</label>
              <div className="col-sm-7">
                <input type="text" className="form-control" value="Italia" disabled />
              </div>
            </div>
            <button className="btn btn-custom mt-3 d-flex rounded-pill mx-auto px-5" onClick={updateUser}>
              Salva
            </button>
          </div>
        );
      default:
        return <div>Seleziona una sezione</div>;
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mt-3">
        Il tuo <span className="secondary-color">profilo</span>
      </h1>
      <div className="row">
        <div className="col-12 col-md-4 mt-3">
          <div className="bg-blue p-4 rounded-4">
            <p className="fs-5 cursor-pointer" onClick={() => setActiveSection("orders")}>
              <Cart className="mb-1 me-2" />I tuoi ordini
            </p>
            <p className="fs-5 cursor-pointer" onClick={() => setActiveSection("account")}>
              <PersonCircle className="mb-1 me-2" />
              Il tuo account
            </p>
            <p className="fs-5 cursor-pointer m-0 p-0" onClick={handleLogoutClick}>
              <BoxArrowLeft className="mb-1 me-2" />
              Logout
            </p>
          </div>
        </div>
        <div className="col-12 col-md-8">{renderContent()}</div>
      </div>
    </div>
  );
};

export default UserComponent;
