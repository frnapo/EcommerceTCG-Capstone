import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(logoutUser());
  };

  return <button onClick={handleLogoutClick}>Logout</button>;
};
export default Logout;
