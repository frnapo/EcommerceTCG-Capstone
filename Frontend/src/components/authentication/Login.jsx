import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import NavigationButtons from "./NavigationButtons";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeSlash } from "react-bootstrap-icons";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <>
      <NavigationButtons />

      <div className="d-flex align-items-center justify-content-center pb-5">
        <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: "360px" }}>
          <div className="bg-blue p-3 rounded-3">
            <label className="form-label">Email</label>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <label className="form-label">Password</label>
            <div className="input-group mb-3 mx-auto">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" className="btn btn-dark" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Eye className="fs-4" /> : <EyeSlash className="fs-4" />}
              </button>
            </div>
            <div className="text-center">
              <Link to="/forgotpassword" className="secondary-color">
                Password dimenticata?
              </Link>
            </div>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn-custom mt-3 py-2 rounded-pill">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
