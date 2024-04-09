/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";
import { Form } from "react-bootstrap";
import HoloCardComponent from "./HoloCardComponent";
import HeartAddIcon from "../../assets/icons/HeartAddIcon";
import { InfoCircle } from "react-bootstrap-icons";
import { OverlayTrigger, Tooltip, Badge } from "react-bootstrap";
import { X } from "react-bootstrap-icons";
import CartManager from "../cart/CartManager";
import toast from "react-hot-toast";

const ProductDetailModal = ({
  selectedProduct,
  setSelectedProduct,
  handleToggleHoloEffect,
  handleToggleWishlistItem,
  wishlistProductIds,
  holoActiveProductId,
  wishlistAnimationTrigger,
  userId,
}) => {
  if (!selectedProduct) return null;

  const isHoloActive = holoActiveProductId === selectedProduct.productId;

  const handleSubmit = (event) => {
    event.preventDefault();
    const quantity = parseInt(event.target[0].value, 10);

    if (selectedProduct) {
      const wasAdded = CartManager.addToCart(selectedProduct, quantity);

      if (wasAdded) {
        toast.success(`Aggiunto ${selectedProduct.name}, Quantità: ${quantity} al carrello.`);
        setTimeout(() => setSelectedProduct(null), 70);
      } else {
        toast.error(
          `Non puoi aggiungere più di ${selectedProduct.availableQuantity} unità di ${selectedProduct.name} al carrello.`
        );
      }
    } else {
      toast.error("Nessun prodotto selezionato.");
    }
  };

  return (
    <AnimatePresence>
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ background: "rgba(0, 0, 0, 0.8)", zIndex: 1050 }}
          onClick={() => setSelectedProduct(null)}
        />

        <motion.div
          layoutId={selectedProduct.productId}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 0.9 }}
          exit={{ opacity: 1, scale: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="position-fixed top-50 start-50 translate-middle p-3 p-md-5 bg-blue bg-opacity-50 rounded-5"
          style={{ zIndex: 1051, maxWidth: "800px", width: "95%" }}
        >
          <div className="position-absolute top-0 end-0 me-3 mt-2">
            <motion.button onClick={() => setSelectedProduct(null)} className="btn p-0 m-0">
              <X className="fs-2 text-white" />
            </motion.button>
          </div>

          <div className="row mx-2 mt-3">
            <div className="col-5 mx-auto d-none d-md-block" style={{ minWidth: "200px" }}>
              <HoloCardComponent
                prodotto={selectedProduct}
                isHoloActive={holoActiveProductId === selectedProduct.productId}
                isFocused={true}
              />
            </div>

            <div className="col-12 col-md-7 mt-0 m-md-0 p-0">
              <h1 className="text-white m-0 p-0 ms-0 ms-md-3">{selectedProduct.name}</h1>
              <p className="lead fs-6 text-secondary ms-0 ms-md-3">{selectedProduct.expansion}</p>

              <div className="d-flex justify-content-center justify-content-md-start ms-0 ms-md-3 bg-dark p-3 rounded-3">
                <div className="d-block d-md-none">
                  <img
                    src={selectedProduct.imageUrl}
                    className="img-fluid"
                    style={{ width: "120px" }}
                    alt={selectedProduct.imageUrl}
                  />
                </div>

                <div className="ms-4">
                  <p className="m-0 p-0 lead fs-3">{selectedProduct.condition}</p>
                  <p className="m-0 p-0 fw-light">
                    <Badge bg="warning">{selectedProduct.rarity}</Badge> - {selectedProduct.serialNumber}
                  </p>
                  <p className="m-0 p-0 lead fs-6">{selectedProduct.firstEdition ? "1st Edition" : "Unlimited"}</p>
                  <p className="m-0 p-0 lead fs-6">{selectedProduct.language}</p>

                  <div className="d-flex d-none d-md-flex">
                    <p className="m-0 p-0 me-2 fw-light">
                      Holo
                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id="tooltip-bottom">
                            Simula l&apos;effetto olografico delle carte.
                            <br />
                            <br />
                            NB - La riproduzione digitale può variare dall&apos;originale, verifica con fonti ufficiali
                            per una rappresentazione precisa.
                          </Tooltip>
                        }
                      >
                        <span className="ms-1">
                          <InfoCircle className="mb-1" />
                        </span>
                      </OverlayTrigger>
                    </p>
                    <Form.Switch
                      id="custom-switch"
                      checked={isHoloActive}
                      onChange={() => handleToggleHoloEffect(selectedProduct.productId)}
                    />
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="mt-3 mt-md-4">
                <div className="d-flex align-items-center justify-content-center">
                  <input
                    type="number"
                    min="1"
                    max={selectedProduct.availableQuantity}
                    defaultValue="1"
                    className="form-control rounded-3 rounded-end-0 py-2 w-25 border-0 fw-bold"
                  />
                  <button type="submit" className="btn btn-custom rounded-3 rounded-start-0 px-4 px-md-5 py-2">
                    Carrello
                  </button>
                  {userId ? (
                    <div
                      className="cursor-pointer ms-3 mb-1"
                      onClick={() => handleToggleWishlistItem(selectedProduct.productId)}
                    >
                      <HeartAddIcon
                        isWishlistItem={wishlistProductIds.includes(selectedProduct.productId)}
                        triggerAnimation={wishlistAnimationTrigger}
                      />
                    </div>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
};

export default ProductDetailModal;
