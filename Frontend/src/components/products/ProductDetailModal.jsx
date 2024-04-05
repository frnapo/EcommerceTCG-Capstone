/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";
import { Form } from "react-bootstrap";
import HoloCardComponent from "./HoloCardComponent";
import HeartAddIcon from "../../assets/icons/HeartAddIcon";
import { InfoCircle } from "react-bootstrap-icons";
import { OverlayTrigger, Tooltip, Badge } from "react-bootstrap";
import { X } from "react-bootstrap-icons";

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
    const quantity = event.target[0].value;
    console.log(`Aggiunto ${selectedProduct.name}, Quantità: ${quantity} al carrello.`);
  };

  return (
    <AnimatePresence>
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ background: "rgba(0, 0, 0, 0.8)", zIndex: 1050 }}
          onClick={() => setSelectedProduct(null)}
        />

        <motion.div
          layoutId={selectedProduct.productId}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="position-fixed top-50 start-50 translate-middle p-3 p-md-5 bg-blue rounded-5"
          style={{ zIndex: 1051, maxWidth: "800px" }}
        >
          <div className="position-absolute top-0 end-0 me-3 mt-2">
            <motion.button onClick={() => setSelectedProduct(null)} className="btn p-0 m-0">
              <X className="fs-2 text-white" />
            </motion.button>
          </div>

          <div className="row mx-2">
            <div className="col-5 mx-auto" style={{ minWidth: "200px" }}>
              <HoloCardComponent
                prodotto={selectedProduct}
                isHoloActive={holoActiveProductId === selectedProduct.productId}
                isFocused={true}
              />

              <div className="d-flex mt-3 mt-md-4 mb-3 mb-md-0">
                <p className="m-0 p-0 me-2 fw-light">
                  Holo
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id="tooltip-bottom">
                        Simula l&apos;effetto olografico delle carte.
                        <br />
                        <br />
                        NB - La riproduzione digitale può variare dall&apos;originale, verifica con fonti ufficiali per
                        una rappresentazione precisa.
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

            <div className="col-12 col-md-7 m-4 mt-0 m-md-0">
              <h1 className="text-white m-0 p-0">{selectedProduct.name}</h1>
              <p className="lead fs-6 text-secondary">{selectedProduct.expansion}</p>

              <p className="m-0 p-0 lead fs-3">{selectedProduct.condition}</p>
              <p className="m-0 p-0 fw-light">
                <Badge bg="danger">{selectedProduct.rarity}</Badge> - {selectedProduct.serialNumber}
              </p>
              <p className="m-0 p-0 lead fs-6">{selectedProduct.firstEdition ? "1st Edition" : "Unlimited"}</p>
              <p className="m-0 p-0 lead fs-6">{selectedProduct.language}</p>

              <form onSubmit={handleSubmit} className="mt-3 mt-md-5">
                <p className="m-0 p-0 lead ms-1">
                  {selectedProduct.availableQuantity == 1
                    ? `${selectedProduct.availableQuantity} disponibile`
                    : `${selectedProduct.availableQuantity} disponibili`}
                </p>
                <div className="d-flex align-items-center">
                  <input
                    type="number"
                    min="1"
                    max={selectedProduct.availableQuantity}
                    defaultValue="1"
                    className="form-control rounded-3 rounded-end-0 py-2 border-0 fw-bold"
                    style={{ width: "auto" }}
                  />
                  <button type="submit" className="btn btn-custom rounded-3 rounded-start-0 px-5 py-2">
                    Carrello
                  </button>
                  {userId ? ( // o token, se stai passando quello
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
