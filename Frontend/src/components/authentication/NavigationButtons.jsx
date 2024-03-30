import { useNavigate, useLocation } from "react-router-dom";

const NavigationButtons = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";

  return (
    <div className="text-center my-5">
      <button
        onClick={() => navigate("/login")}
        className={`m-0 rounded-pill rounded-end-0 py-2 px-5 ${isLogin ? "btn-custom" : "btn-blue"}`}
      >
        Login
      </button>
      <button
        onClick={() => navigate("/register")}
        className={`m-0 rounded-pill rounded-start-0 py-2 px-5 ${isRegister ? "btn-custom" : "btn-blue"}`}
      >
        Registrati
      </button>
    </div>
  );
};

export default NavigationButtons;
