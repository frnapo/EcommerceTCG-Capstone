import { useSelector } from "react-redux";
import { BoxSeam, ListOl, Calendar3, BorderAll, X } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";

const ManagementComponent = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDateSubmit = () => {
    navigate(`/management/ordersbydate/${date}`);
    handleClose();
  };

  return (
    <div className="container ">
      <div className="text-center my-4">
        <h1>
          Benvenuto nel <span className="secondary-color">pannello di controllo</span> {user.firstName}
        </h1>
        <h6 className="fw-light">Cosa vuoi fare oggi?</h6>
      </div>

      <div className="row ">
        <div className="col-lg-4 col-md-12 d-flex flex-lg-column align-items-end flex-wrap flex-md-nowrap justify-content-center">
          <div
            className="rounded-3 my-2 mx-2 admin-control d-flex align-items-center justify-content-center"
            style={{ width: "200px", height: "100px" }}
          >
            <div className="d-flex align-items-center justify-content-center p-3">
              <div className="mx-2">
                <BoxSeam className="fs-1" />
              </div>
              <div>
                <p className="fs-5 p-0 m-0 text-center" onClick={() => navigate("/management/orderstoship")}>
                  Spedisci ordini
                </p>
              </div>
            </div>
          </div>
          <div
            className="rounded-3 my-2 mx-2 admin-control d-flex align-items-center justify-content-center"
            style={{ width: "200px", height: "100px" }}
          >
            <div
              className="d-flex align-items-center justify-content-center p-3"
              onClick={() => navigate("/management/todaysorders")}
            >
              <div className="mx-2">
                <ListOl className="fs-1" />
              </div>
              <div>
                <p className="fs-5 p-0 m-0 text-center">Ordini di oggi</p>
              </div>
            </div>
          </div>
          <div
            className="rounded-3 my-2 mx-2 admin-control d-flex align-items-center justify-content-center"
            style={{ width: "200px", height: "100px" }}
            onClick={handleShow}
          >
            <div className="d-flex align-items-center justify-content-center p-3">
              <div className="mx-2">
                <Calendar3 className="fs-1" />
              </div>
              <div>
                <p className="fs-5 p-0 m-0 text-center">Ordini in data</p>
              </div>
            </div>
          </div>
          <div
            className="rounded-3 my-2 mx-2 admin-control d-flex align-items-center justify-content-center"
            style={{ width: "200px", height: "100px" }}
          >
            <div
              className="d-flex align-items-center justify-content-center p-3"
              onClick={() => navigate("/management/totalorders")}
            >
              <div className="mx-2">
                <BorderAll className="fs-1" />
              </div>
              <div>
                <p className="fs-5 p-0 m-0 text-center">Ordini totali</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8 col-md-12 col-sm-12">
          <div className="row">
            <div className="col-md-6 col-sm-12 d-lg-flex flex-lg-column p-4 p-md-2 pt-0 mt-0 pb-0 mb-0">
              <div
                className="rounded-3 my-3 my-lg-2 my-2 admin-control d-flex flex-column justify-content-center align-items-center"
                style={{ height: "230px" }}
              >
                <div className="p-3 text-center w-100">
                  <div className="d-flex flex-column align-items-center" onClick={() => navigate("/management/tcg")}>
                    <p className="fs-1 p-0 m-0 d-flex align-items-center justify-content-center">TCG</p>
                    <p className="fw-light text-center">
                      Aggiungi/modifica le macro-categorie a cui puoi associare espansioni-rarità-prodotti
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="rounded-3 my-3 my-lg-2 my-2 admin-control d-flex flex-column justify-content-center align-items-center mb-0"
                style={{ height: "230px" }}
              >
                <div className="p-3 text-center w-100">
                  <div
                    className="d-flex flex-column align-items-center"
                    onClick={() => navigate("/management/rarities")}
                  >
                    <p className="fs-1 p-0 m-0 d-flex align-items-center justify-content-center">Rarità</p>
                    <p className="fw-light text-center">
                      Aggiungi/modifica rarità singole associate ai relativi prodotti
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12 d-lg-flex flex-lg-column p-4 p-md-2 pt-0 mt-0">
              <div
                className="rounded-3 my-3 my-lg-2 my-2 admin-control d-flex flex-column justify-content-center align-items-center"
                style={{ height: "230px" }}
              >
                <div className="p-3 text-center w-100">
                  <div
                    className="d-flex flex-column align-items-center"
                    onClick={() => navigate("/management/expansions")}
                  >
                    <p className="fs-1 p-0 m-0 d-flex align-items-center justify-content-center">Espansioni</p>
                    <p className="fw-light text-center">Aggiungi/modifica espansioni singole associate ad un TCG</p>
                  </div>
                </div>
              </div>
              <div
                className="rounded-3 my-3 my-lg-2 my-2 admin-control d-flex flex-column justify-content-center align-items-center"
                style={{ height: "230px" }}
              >
                <div className="p-3 text-center w-100">
                  <div
                    className="d-flex flex-column align-items-center"
                    onClick={() => navigate("/management/products")}
                  >
                    <p className="fs-1 p-0 m-0 d-flex align-items-center justify-content-center">Prodotti</p>
                    <p className="fw-light text-center">
                      Aggiungi/modifica prodotti singoli o in massa tramite Google Sheets
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="bg-blue border-0 d-flex justify-content-between">
          <Modal.Title>
            <h3>Inserisci una data</h3>
          </Modal.Title>
          <X className="fs-3 custom-icon cursor-pointer" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body className="bg-blue">
          <Form>
            <Form.Group>
              <Form.Label>Data</Form.Label>
              <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-blue border-0">
          <Button variant="dark" onClick={handleClose}>
            Chiudi
          </Button>
          <Button className="btn-custom" onClick={handleDateSubmit}>
            Conferma
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManagementComponent;
