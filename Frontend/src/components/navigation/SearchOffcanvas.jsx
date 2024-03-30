import { useState } from "react";
import { Offcanvas, Form, Button } from "react-bootstrap";
import SearchIcon from "../../assets/icons/SearchIcon";

const SearchOffcanvas = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="cursor-pointer" onClick={handleShow}>
        <SearchIcon />
      </div>
      <Offcanvas show={show} onHide={handleClose} placement="top" className="w-100 h-100">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Ricerca</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex align-items-center justify-content-center">
          <Form className="d-flex flex-column justify-content-center align-items-center">
            <Form.Group className="mb-3" controlId="searchQuery">
              <Form.Control type="text" placeholder="Cerca..." autoFocus />
            </Form.Group>
            <Button variant="primary" type="submit">
              Cerca
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SearchOffcanvas;
