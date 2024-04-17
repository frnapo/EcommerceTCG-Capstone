import { useState } from "react";
import { Offcanvas, Form, Button, Container, Row, Col, InputGroup, Spinner } from "react-bootstrap";
import SearchIcon from "../../assets/icons/SearchIcon";
import axios from "axios";
import { motion } from "framer-motion";
import { X, ArrowClockwise } from "react-bootstrap-icons";
import CartManager from "../cart/CartManager";
import toast from "react-hot-toast";

const SearchOffcanvas = () => {
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleClose = () => {
    setShow(false);
    setSearchQuery("");
    setProducts([]);
    setNotFound(false);
  };

  const handleAddToCart = (product) => {
    if (product) {
      const wasAdded = CartManager.addToCart(product, 1);

      if (wasAdded) {
        toast.success(`Aggiunto ${product.name}, Quantità: 1 al carrello.`);
      } else {
        toast.error(`Non puoi aggiungere più di ${product.availableQuantity} unità di ${product.name} al carrello.`);
      }
    } else {
      toast.error("Nessun prodotto selezionato.");
    }
  };

  const handleShow = () => setShow(true);

  const handleSearch = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.get(`https://localhost:7289/api/Products/search/${searchQuery}`);
      if (response.data.length > 0) {
        setProducts(response.data);
        console.log(response.data);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setNotFound(true);
    }
    setIsLoading(false);
  };

  const searchBarAnimation = {
    initial: { y: "50vh" },
    animate: products.length > 0 || notFound ? { y: "0%" } : { y: "40vh" },
  };

  return (
    <>
      <div className="cursor-pointer" onClick={handleShow}>
        <SearchIcon />
      </div>
      <Offcanvas show={show} onHide={handleClose} placement="top" className="bg-blue w-100 h-100">
        <Offcanvas.Header className=" mt-3 d-flex justify-content-between align-items-center">
          <div className="w-100">
            <Offcanvas.Title className="text-white text-center m-0">
              <h2 className="m-0 p-0">Ricerca nello Shop</h2>
            </Offcanvas.Title>
          </div>
          <div onClick={() => handleClose()} style={{ cursor: "pointer" }}>
            <X className="fs-1 cursor-pointer custom-icon text-white" />
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container>
            <Row className="justify-content-center">
              <Col md={8}>
                <motion.div
                  initial={searchBarAnimation.initial}
                  animate={searchBarAnimation.animate}
                  className="d-flex  align-items-center pt-5"
                >
                  <Form onSubmit={handleSearch} className="w-100 ">
                    <InputGroup className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Cerca tramite nome..."
                        autoFocus
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Button className="btn-custom me-3" type="submit" disabled={isLoading}>
                        {isLoading ? <Spinner /> : <SearchIcon />}
                      </Button>
                    </InputGroup>
                  </Form>

                  {products.length > 0 || notFound ? (
                    <Button
                      onClick={() => {
                        setProducts([]);
                        setNotFound(false);
                      }}
                      className="btn-dark p-2 mb-3"
                    >
                      <ArrowClockwise className="fs-2" />
                    </Button>
                  ) : null}
                </motion.div>
                {notFound && <div className="mt-5 text-center text-white lead fs-2">Nessun prodotto trovato.</div>}
                <div className="product-list mt-5">
                  <Row>
                    {products.map((product) => (
                      <Col xs={6} lg={4} xl={3} key={product.productId} className="mb-4">
                        <div className="product-item p-1 text-center position-relative">
                          <img src={product.imageUrl} alt={product.name} className="img-fluid" />
                        </div>

                        <Button
                          className={`mt-2 py-2 w-100 text-center ${
                            product.availableQuantity > 0 ? "btn-custom" : "btn-secondary"
                          }`}
                          disabled={product.availableQuantity < 1}
                          onClick={() => handleAddToCart(product)}
                        >
                          {product.availableQuantity > 0
                            ? `${product.condition} - €${product.price}`
                            : "Non disponibile"}
                        </Button>
                      </Col>
                    ))}
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SearchOffcanvas;
