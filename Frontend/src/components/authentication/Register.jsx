import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";
import NavigationButtons from "./NavigationButtons";
import { Eye, EyeSlash } from "react-bootstrap-icons";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      firstName: user.FirstName,
      lastName: user.LastName,
      email: user.Email,
      password: user.Password,
      confirmPassword: user.ConfirmPassword,
    };
    dispatch(registerUser(userData));
  };
  return (
    <>
      <NavigationButtons />
      <div className="d-flex align-items-center justify-content-center">
        <form onSubmit={handleSubmit} className="pb-5 w-100" style={{ maxWidth: "360px" }}>
          <div className="bg-blue p-3 rounded-3">
            <div className="w-100 mb-3">
              <input
                type="text"
                className="form-control"
                value={user.FirstName}
                onChange={(e) => setUser({ ...user, FirstName: e.target.value })}
                placeholder="Nome"
                required
              />
            </div>
            <div className="w-100 mb-3">
              <input
                type="text"
                className="form-control"
                value={user.LastName}
                onChange={(e) => setUser({ ...user, LastName: e.target.value })}
                placeholder="Cognome"
                required
              />
            </div>
            <div className="w-100 mb-3">
              <input
                type="email"
                className="form-control"
                value={user.Email}
                onChange={(e) => setUser({ ...user, Email: e.target.value })}
                placeholder="Email"
                required
              />
            </div>
            <div className="input-group mb-3 mx-auto">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={user.Password}
                onChange={(e) => setUser({ ...user, Password: e.target.value })}
                placeholder="Password"
                required
              />
              <button type="button" className="btn btn-dark" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Eye className="fs-4" /> : <EyeSlash className="fs-4" />}
              </button>
            </div>
            <div className="input-group mx-auto">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                value={user.ConfirmPassword}
                onChange={(e) => setUser({ ...user, ConfirmPassword: e.target.value })}
                placeholder="Conferma password"
                required
              />
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <Eye className="fs-4" /> : <EyeSlash className="fs-4" />}
              </button>
            </div>
          </div>
          <div className="d-grid w-100 my-3">
            <button type="submit" className="cursor-pointer btn-custom py-2 rounded-pill" disabled={isLoading}>
              Registrati
            </button>
          </div>
          {isError && <p className="text-danger">{message}</p>}
        </form>
      </div>

      <div className="text-center mx-auto pb-5" style={{ maxWidth: "620px" }}>
        <ul className="px-4 list-unstyled bg-blue p-3 rounded-3">
          <li className="mb-3">
            Assicurati che la password sia di almeno <span className="secondary-color">8 caratteri </span>e deve:
          </li>
          <li>
            Includere almeno <span className="secondary-color">un numero</span>.
          </li>
          <li>
            Includere almeno <span className="secondary-color">una lettera maiuscola</span>.
          </li>
          <li>
            Includere almeno <span className="secondary-color">una lettera minuscola</span>.
          </li>
          <li>
            Includere almeno <span className="secondary-color">un carattere speciale</span> (es. @, #, $, ecc.).
          </li>
        </ul>
      </div>
    </>
  );
};

export default Register;
