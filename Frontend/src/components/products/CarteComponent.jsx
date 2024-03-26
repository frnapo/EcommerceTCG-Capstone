import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProdottiByCategoria } from "../../redux/slices/productSlice";

// eslint-disable-next-line react/prop-types
const CarteComponent = ({ idCategoria }) => {
  const dispatch = useDispatch();
  const { items, isLoading, isError, errorMessage } = useSelector((state) => state.prodotti);

  useEffect(() => {
    dispatch(fetchProdottiByCategoria(idCategoria));
  }, [dispatch, idCategoria]);

  if (isLoading) return <div>Caricamento...</div>;
  if (isError) return <div>Errore: {errorMessage}</div>;

  return (
    <section className="cards">
      {items.map((prodotto, index) => (
        <div
          key={`${prodotto.IDProdotto}-${index}`}
          className="card effect animated"
          style={{ backgroundImage: `url(${prodotto.URLImmagine})` }}
        >
          aaa
        </div>
      ))}
    </section>
  );
};

export default CarteComponent;
