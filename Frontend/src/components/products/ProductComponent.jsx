import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProdottiByCategoria } from "../../redux/slices/productSlice";
import { useParams } from "react-router-dom";
import FilterComponent from "./FilterComponent";
import HeaderComponent from "./HeaderComponent";
import HoloCardComponent from "./HoloCardComponent";

const ProductComponent = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const { items, isLoading, isError, errorMessage } = useSelector((state) => state.prodotti);

  useEffect(() => {
    dispatch(fetchProdottiByCategoria(categoryId));
  }, [dispatch, categoryId]);

  if (isLoading) return <div>Caricamento...</div>;
  if (isError) return <div>Errore: {errorMessage}</div>;

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-8 offset-md-4">
          <HeaderComponent />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-4 d-md-flex align-items-start justify-content-md-end">
          <FilterComponent />
        </div>
        <div className="col-12 col-md-8">
          <div className="row d-flex">
            {items.map((prodotto, index) => (
              <>
                <div className="col-6 col-lg-4 col-xl-3 py-3">
                  <HoloCardComponent key={index} imageUrl={prodotto.imageURL} />
                </div>
              </>
            ))}
            <div className="col-6 col-lg-4 col-xl-3 py-3">
              <HoloCardComponent />
            </div>
            <div className="col-6 col-lg-4 col-xl-3 py-3">
              <HoloCardComponent />
            </div>
            <div className="col-6 col-lg-4 col-xl-3 py-3">
              <HoloCardComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
