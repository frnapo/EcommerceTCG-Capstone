import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProdByCategory } from "../../redux/slices/productSlice";
import { addToWishlist } from "../../redux/slices/wishSlice";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import FilterComponent from "./FilterComponent";
import HeaderComponent from "./HeaderComponent";
import HoloCardComponent from "./HoloCardComponent";
import { motion, AnimatePresence } from "framer-motion";

const ProductComponent = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const { items, isLoading, isError, errorMessage } = useSelector((state) => state.product);
  const [holoActiveProductId, setHoloActiveProductId] = useState(null);

  useEffect(() => {
    dispatch(fetchProdByCategory(categoryId));
  }, [dispatch, categoryId]);

  const userId = useSelector((state) => state.auth.user.id);
  const token = useSelector((state) => state.auth.token);

  const handleAddToWishlist = (productId) => {
    dispatch(addToWishlist({ userId, productId, token }));
  };

  const handleToggleHoloEffect = (productId) => {
    setHoloActiveProductId((currentId) => (currentId === productId ? null : productId));
  };

  if (isLoading) return <div>Caricamento...</div>;
  if (isError) return <div>Errore: {errorMessage}</div>;

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <HeaderComponent />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-4 d-md-flex align-items-start justify-content-md-end">
          <FilterComponent />
        </div>
        <div className="col-12 col-md-8">
          <div className="row d-flex p-4">
            {items.map((prodotto) => (
              <div className="col-6 col-lg-4 col-xl-3 py-3" key={prodotto.productId}>
                <motion.div
                  className="cursor-pointer"
                  layoutId={prodotto.productId}
                  onClick={() => setSelectedProduct(prodotto)}
                >
                  <HoloCardComponent
                    imageUrl={prodotto.imageURL}
                    isHoloActive={holoActiveProductId === prodotto.productId}
                  />
                </motion.div>

                <div className="mt-3 d-flex justify-content-between">
                  <Button
                    className={`shadow ${prodotto.availableQuantity > 0 ? "btn-danger" : "btn-secondary"}`}
                    disabled={prodotto.availableQuantity < 1}
                  >
                    {prodotto.availableQuantity > 0 ? "Disponibile" : "Non disponibile"}
                  </Button>
                </div>
                <Button variant="outline-primary" onClick={() => handleAddToWishlist(prodotto.productId)}>
                  Aggiungi ai Preferiti
                </Button>
              </div>
            ))}

            <AnimatePresence>
              {selectedProduct && (
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
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="position-fixed top-50 start-50 translate-middle p-5 bg-dark rounded-5"
                    style={{ zIndex: 1051, maxWidth: "90%", width: "auto" }}
                  >
                    <motion.button onClick={() => setSelectedProduct(null)} className="btn btn-secondary">
                      Chiudi
                    </motion.button>
                    <h1 className="text-white">{selectedProduct.name}</h1>
                    <HoloCardComponent
                      imageUrl={selectedProduct.imageURL}
                      isHoloActive={holoActiveProductId === selectedProduct.productId}
                    />
                    <Button onClick={() => handleToggleHoloEffect(selectedProduct.productId)}>
                      {holoActiveProductId === selectedProduct.productId
                        ? "Visualizzazione normale"
                        : "Visualizazzione holografica"}
                    </Button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
