import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProdByCategory } from "../../redux/slices/productSlice";
import { toggleWishlistItem } from "../../redux/slices/wishSlice";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import FilterComponent from "./FilterComponent";
import HeaderComponent from "./HeaderComponent";
import HoloCardComponent from "./HoloCardComponent";
import { motion, AnimatePresence } from "framer-motion";
import HeartAddIcon from "../../assets/icons/HeartAddIcon";
import CloseIcon from "../../assets/icons/CloseIcon";

const ProductComponent = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const { items, isLoading, isError, errorMessage } = useSelector((state) => state.product);
  const [holoActiveProductId, setHoloActiveProductId] = useState(null);
  const wishlistProductIds = useSelector((state) => state.wishlist.items.map((item) => item.productId));
  const userId = useSelector((state) => state.auth.user.id);
  const token = useSelector((state) => state.auth.token);
  const [wishlistAnimationTrigger, setWishlistAnimationTrigger] = useState(0);

  //to do icone wishlist in base a database
  // to do utente puo vedere prodotti senza essere logato / controlli su wishlist

  useEffect(() => {
    dispatch(fetchProdByCategory(categoryId));
  }, [dispatch, categoryId]);

  const handleToggleWishlistItem = (productId) => {
    dispatch(toggleWishlistItem({ userId, productId, token }));
    setWishlistAnimationTrigger((prev) => prev + 1);
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
        <div className="col-12 col-md-5 col-lg-4 d-md-flex align-items-start justify-content-md-end">
          <FilterComponent />
        </div>
        <div className="col-12 col-md-7 col-lg-8">
          <div className="row p-4">
            {items.map((prodotto) => (
              <div className="col-6 col-lg-4 col-xxl-3 py-3" key={prodotto.productId}>
                <motion.div
                  className="cursor-pointer"
                  layoutId={prodotto.productId}
                  onClick={() => setSelectedProduct(prodotto)}
                >
                  <HoloCardComponent isHoloActive={holoActiveProductId === prodotto.productId} prodotto={prodotto} />
                </motion.div>

                <div className="mt-3 d-flex justify-content-between">
                  <Button
                    className={`w-100  ${prodotto.availableQuantity > 0 ? "btn-custom" : "btn-secondary"}`}
                    disabled={prodotto.availableQuantity < 1}
                  >
                    {prodotto.availableQuantity > 0 ? "Disponibile" : "Non disponibile"}
                  </Button>
                </div>
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
                    <motion.button onClick={() => setSelectedProduct(null)} className="btn p-0 m-0">
                      <CloseIcon />
                    </motion.button>
                    <h1 className="text-white">{selectedProduct.name}</h1>
                    <HoloCardComponent
                      prodotto={selectedProduct}
                      isHoloActive={holoActiveProductId === selectedProduct.productId}
                      isFocused={selectedProduct !== null}
                    />
                    <Button onClick={() => handleToggleHoloEffect(selectedProduct.productId)}>
                      {holoActiveProductId === selectedProduct.productId
                        ? "Visualizzazione normale"
                        : "Visualizazzione holografica"}
                    </Button>

                    {selectedProduct && (
                      <div
                        className="cursor-pointer"
                        onClick={() => handleToggleWishlistItem(selectedProduct.productId)}
                      >
                        <HeartAddIcon
                          isWishlistItem={wishlistProductIds.includes(selectedProduct.productId)}
                          triggerAnimation={wishlistAnimationTrigger}
                        />
                      </div>
                    )}
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
