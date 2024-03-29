import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist } from "../../redux/slices/wishSlice";

const WishlistComponent = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.wishlist);
  const userId = useSelector((state) => state.auth.user.id);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (userId && token) {
      dispatch(fetchWishlist({ userId, token }));
    }
  }, [dispatch, userId, token]);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div>
      <h1>Wishlist</h1>
      <ul>
        {items.map((item) => (
          <li key={item.wishlistId}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default WishlistComponent;
