/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProdByCategory } from "../../redux/slices/productSlice";
import { toggleWishlistItem } from "../../redux/slices/wishSlice";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import FilterComponent from "./FilterComponent";
import HeaderComponent from "./HeaderComponent";
import HoloCardComponent from "./HoloCardComponent";
import { motion } from "framer-motion";
import ProductDetailModal from "./ProductDetailModal";
import BreadcrumbsAndSort from "./BreadcrumbsAndSort";
import { createSelector } from "reselect";

const baseWishlistItemsSelector = (state) => state.wishlist.items;
const wishlistProductIdsSelector = createSelector([baseWishlistItemsSelector], (items) =>
  items.map((item) => item.productId)
);

const ProductComponent = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const { items, isLoading, isError, errorMessage } = useSelector((state) => state.product);
  const [holoActiveProductId, setHoloActiveProductId] = useState(null);
  const wishlistProductIds = useSelector(wishlistProductIdsSelector);
  const userId = useSelector((state) => state.auth.user?.id);
  const token = useSelector((state) => state.auth.token);
  const [wishlistAnimationTrigger, setWishlistAnimationTrigger] = useState(0);

  const [sortedItems, setSortedItems] = useState([]);

  const [filters, setFilters] = useState({
    expansion: "",
    rarity: [],
    grade: [],
    language: [],
  });

  const applyFilters = () => {
    const filtered = items.filter((item) => {
      const matchesExpansion = filters.expansion === "" || item.expansion === filters.expansion;
      const matchesRarity = filters.rarity.length === 0 || filters.rarity.includes(item.rarity);
      const matchesGrade = filters.grade.length === 0 || filters.grade.includes(item.condition);
      const matchesLanguage = filters.language.length === 0 || filters.language.includes(item.language);
      return matchesExpansion && matchesRarity && matchesGrade && matchesLanguage;
    });
    setSortedItems(filtered);
  };

  useEffect(() => {
    setSortedItems([...items]);
  }, [items]);

  const sortItems = (sortValue) => {
    const sorted = [...sortedItems].sort((a, b) => {
      if (a.availableQuantity === 0 && b.availableQuantity > 0) return 1;
      if (b.availableQuantity === 0 && a.availableQuantity > 0) return -1;

      switch (sortValue) {
        case "nome-az":
          return a.name.localeCompare(b.name);
        case "nome-za":
          return b.name.localeCompare(a.name);
        case "prezzo-alto-basso":
          return b.price - a.price;
        case "prezzo-basso-alto":
          return a.price - b.price;
        case "serialNumber-basso-alto":
          return a.serialNumber.localeCompare(b.serialNumber);
        case "serialNumber-alto-basso":
          return b.serialNumber.localeCompare(a.serialNumber);
        case "disponibile":
          return b.availableQuantity - a.availableQuantity;
        default:
          return 0;
      }
    });
    setSortedItems(sorted);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    applyFilters(newFilters);
  };

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

  useEffect(() => {
    applyFilters(filters);
  }, [items, filters]);

  if (isLoading) {
    return (
      <div
        className="d-flex bg-blue justify-content-center align-items-center"
        style={{
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: "0",
          left: "0",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Caricamento...</span>
        </div>
      </div>
    );
  }
  if (isError) return <div>Errore: {errorMessage}</div>;
  return (
    <>
      <HeaderComponent />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5  pb-5 col-lg-4 d-md-flex align-items-start justify-content-md-end">
            <FilterComponent onFilter={handleFilterChange} />
          </div>
          <div className="col-12 col-md-7 col-lg-8">
            <div>
              <BreadcrumbsAndSort categoryId={categoryId} onSortChange={sortItems} />
            </div>

            <div className="row pb-4">
              {sortedItems.length > 0 ? (
                sortedItems.map((prodotto) => (
                  <div className="col-6 col-lg-4 col-xxl-3 py-3" key={prodotto.productId}>
                    <motion.div
                      className="cursor-pointer"
                      layoutId={prodotto.productId}
                      onClick={() => setSelectedProduct(prodotto)}
                    >
                      <HoloCardComponent
                        isHoloActive={holoActiveProductId === prodotto.productId}
                        prodotto={prodotto}
                      />
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
                ))
              ) : (
                <div className="col-12 mt-5 text-center lead py-3 fs-2">
                  <p>Nessun risultato</p>
                </div>
              )}

              <ProductDetailModal
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                handleToggleHoloEffect={handleToggleHoloEffect}
                handleToggleWishlistItem={handleToggleWishlistItem}
                wishlistProductIds={wishlistProductIds}
                holoActiveProductId={holoActiveProductId}
                wishlistAnimationTrigger={wishlistAnimationTrigger}
                userId={userId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductComponent;
