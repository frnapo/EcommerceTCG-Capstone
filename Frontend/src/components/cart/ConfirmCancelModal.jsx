/* eslint-disable react/prop-types */
import { Modal, Button } from "react-bootstrap";
import { X } from "react-bootstrap-icons";

const ConfirmCancelModal = ({ show, handleClose, handleConfirm }) => {
  return (
    <Modal show={show} onHide={handleClose} centered className="no-border">
      <Modal.Header className="border-0">
        <Modal.Title className="border-0 w-100">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              Annulla <span className="secondary-color">Ordine</span>
            </div>
            <div>
              <X className="fs-4 cursor-pointer custom-icon" onClick={handleClose} />
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="fs-5">Sei sicuro di voler annullare l&apos;ordine?</Modal.Body>
      <Modal.Footer className="border-0">
        <Button variant="dark" className="fw-bold" onClick={handleClose}>
          Chiudi
        </Button>
        <Button className="btn-custom" onClick={handleConfirm}>
          Annulla Ordine
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmCancelModal;
