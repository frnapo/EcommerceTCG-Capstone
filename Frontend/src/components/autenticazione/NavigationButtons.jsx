import { Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const NavigationButtons = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";

  return (
    <div className="text-center my-5">
      <Button
        variant={isLogin ? "light" : "dark"}
        onClick={() => navigate("/login")}
        className="m-0 rounded-pill rounded-end-0 px-5"
      >
        Login
      </Button>
      <Button
        variant={isRegister ? "light" : "dark"}
        onClick={() => navigate("/register")}
        className="m-0 rounded-pill rounded-start-0 px-5"
      >
        Registrati
      </Button>
    </div>
  );
};

export default NavigationButtons;
