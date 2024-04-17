import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, toggleWishlistItem } from "../../redux/slices/wishSlice";
import { useNavigate } from "react-router-dom";
import ITflag from "../../assets/img/ITflag.png";
import ENGflag from "../../assets/img/ENGflag.png";
import JPflag from "../../assets/img/JPflag.png";
import HeartAddIcon from "../../assets/icons/HeartAddIcon";
import { createSelector } from "reselect";
import { Button } from "react-bootstrap";
import CartManager from "../cart/CartManager";
import toast from "react-hot-toast";

const baseWishlistItemsSelector = (state) => state.wishlist.items;
const wishlistProductIdsSelector = createSelector([baseWishlistItemsSelector], (items) =>
  items.map((item) => item.productId)
);

const WishlistComponent = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.wishlist);
  const userId = useSelector((state) => state.auth.user?.id);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const wishlistProductIds = useSelector(wishlistProductIdsSelector);
  const [wishlistAnimationTrigger, setWishlistAnimationTrigger] = useState(0);

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

  useEffect(() => {
    if (userId && token) {
      dispatch(fetchWishlist({ userId, token }));
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userId, token]);

  const handleToggleWishlistItem = (productId) => {
    dispatch(toggleWishlistItem({ userId, productId, token }));
    setWishlistAnimationTrigger((prev) => prev + 1);
  };

  function getFlag(language) {
    switch (language) {
      case "Italiano":
        return ITflag;
      case "English":
        return ENGflag;
      case "Japanese":
        return JPflag;
      default:
        return "";
    }
  }

  if (status === "loading") return <div>Loading...</div>;

  if (Array.isArray(items)) {
    return (
      <div className="container">
        <h1 className="my-4">
          La tua <span className="secondary-color">Watchlist</span>
        </h1>

        <p>
          La <span className="secondary-color">watchlist</span> è lo spazio in cui puoi{" "}
          <span className="secondary-color">aggiungere i prodotti</span> che desideri monitorare. Qui puoi tenere
          d&apos;occhio gli <span className="secondary-color">aggiornamenti</span> di prezzo e la{" "}
          <span className="secondary-color">variazione</span> delle disponibilità.
        </p>

        <ul className="mb-4 p-0">
          {items.map((item) =>
            item.product ? (
              <li key={item.wishlistId} className="list-group-item my-3 rounded-3 bg-blue p-3 text-white">
                <div className="d-flex align-items-center">
                  <img
                    className="me-3"
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    style={{ height: "170px" }}
                  />
                  <div>
                    <div className="d-flex">
                      <div>
                        <h4 className="mb-1">{item.product.name}</h4>
                      </div>
                      {userId ? (
                        <div
                          className="cursor-pointer ms-3 mb-1"
                          onClick={() => handleToggleWishlistItem(item.product.productId)}
                        >
                          <HeartAddIcon
                            isWishlistItem={wishlistProductIds.includes(item.product.productId)}
                            triggerAnimation={wishlistAnimationTrigger}
                          />
                        </div>
                      ) : null}
                    </div>
                    <p className="fw-light m-0 mb-1 p-0">
                      <span className="badge badge-rarity">{item.product.description}</span> -{" "}
                      <span className="text-secondary">{item.product.serialNumber}</span>
                    </p>
                    <div className="d-flex align-items-center">
                      <img
                        className="rounded-1"
                        src={getFlag(item.product.language)}
                        alt={`${item.product.language} flag`}
                        style={{ width: "30px", height: "20px", marginRight: "5px" }}
                      />
                      <p className="my-1 fw-light">{item.product.condition}</p>
                    </div>
                    <p className="my-1 fw-light">Disponibile: {item.product.availableQuantity}</p>
                    <p className="lead fs-6 mb-1 p-0">Prezzo attuale €{parseFloat(item.product.price).toFixed(2)}</p>

                    <Button
                      className={`px-5  ${item.product.availableQuantity > 0 ? "btn-custom" : "btn-secondary"}`}
                      disabled={item.product.availableQuantity < 1}
                      onClick={() => handleAddToCart(item.product)}
                    >
                      {item.product.availableQuantity > 0 ? "Disponibile" : "Non disponibile"}
                    </Button>
                  </div>
                </div>
              </li>
            ) : null
          )}
        </ul>
      </div>
    );
  }
};

export default WishlistComponent;
