import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <Button className="mt-4 px-5  rounded-pill btn-dark fs-4" onClick={handleLogoutClick}>
      Logout
    </Button>
  );
};
export default Logout;
