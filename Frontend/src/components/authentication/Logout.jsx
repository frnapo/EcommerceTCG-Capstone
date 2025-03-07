import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Logout = ({ onLoggedOut }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    dispatch(logoutUser());
    navigate("/");
    if (onLoggedOut) onLoggedOut();
  };

  return (
    <button className="py-1 rounded-pill fs-3 btn-custom" style={{ paddingInline: "55px" }} onClick={handleLogoutClick}>
      Logout
    </button>
  );
};
export default Logout;
