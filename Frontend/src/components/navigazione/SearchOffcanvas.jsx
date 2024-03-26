import { useState } from "react";
import { Offcanvas, Form, Button } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const SearchOffcanvas = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Search className="text-white fs-2 cursor-pointer" onClick={handleShow} />
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
