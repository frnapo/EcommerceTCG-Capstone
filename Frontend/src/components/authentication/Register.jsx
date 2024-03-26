import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";
import NavigationButtons from "./NavigationButtons";

const Register = () => {
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
    console.log(userData);
    dispatch(registerUser(userData));
  };
  return (
    <>
      <NavigationButtons />
      <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
        <div className="w-100 mb-3" style={{ maxWidth: "320px" }}>
          <input
            type="text"
            className="form-control"
            value={user.FirstName}
            onChange={(e) => setUser({ ...user, FirstName: e.target.value })}
            placeholder="Nome"
            required
          />
        </div>
        <div className="w-100 mb-3" style={{ maxWidth: "320px" }}>
          <input
            type="text"
            className="form-control"
            value={user.LastName}
            onChange={(e) => setUser({ ...user, LastName: e.target.value })}
            placeholder="Cognome"
            required
          />
        </div>
        <div className="w-100 mb-3" style={{ maxWidth: "320px" }}>
          <input
            type="email"
            className="form-control"
            value={user.Email}
            onChange={(e) => setUser({ ...user, Email: e.target.value })}
            placeholder="Email"
            required
          />
        </div>
        <div className="w-100 mb-3" style={{ maxWidth: "320px" }}>
          <input
            type="password"
            className="form-control"
            value={user.Password}
            onChange={(e) => setUser({ ...user, Password: e.target.value })}
            placeholder="Password"
            required
          />
        </div>
        <div className="w-100 mb-3" style={{ maxWidth: "320px" }}>
          <input
            type="password"
            className="form-control"
            value={user.ConfirmPassword}
            onChange={(e) => setUser({ ...user, ConfirmPassword: e.target.value })}
            placeholder="Conferma password"
            required
          />
        </div>
        <div className="d-grid w-100 mb-3" style={{ maxWidth: "320px" }}>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            Registrati
          </button>
        </div>
        {isError && <p className="text-danger">{message}</p>}
      </form>
    </>
  );
};

export default Register;
