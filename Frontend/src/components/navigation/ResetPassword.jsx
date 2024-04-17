import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { EyeSlash, Eye } from "react-bootstrap-icons";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const validatePassword = (password) => {
    const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{8,}$");
    return regex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validatePassword(password)) {
      toast.error(
        "La password deve essere di almeno 8 caratteri e includere almeno un numero, una lettera maiuscola, una lettera minuscola e un carattere speciale."
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Le password devono corrispondere");
      return;
    }

    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const email = params.get("email");

    try {
      await axios.post("https://localhost:7289/api/Auth/resetpassword", {
        token,
        email,
        newPassword: password,
      });
      toast.success("Password resettata con successo");
      navigate("/login");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Errore durante il reset della password";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="container text-center mt-4">
      <div>
        <h2 className="m-0 p-0">
          Reset <span className="secondary-color">password</span>{" "}
        </h2>
      </div>

      <p className="px-4 my-3">
        Sei quasi pronto per accedere nuovamente. Inserisci la tua nuova password nel campo sottostante e confermala.
        Assicurati che la tua nuova password sia <span className="secondary-color">sicura e facile da ricordare</span>{" "}
        per te.
      </p>

      <ul className="px-4 list-unstyled bg-blue p-3 rounded-3">
        <li>
          La password deve essere di almeno <span className="secondary-color">8 caratteri</span>.
        </li>
        <li>
          Deve includere almeno <span className="secondary-color">un numero</span>.
        </li>
        <li>
          Deve includere almeno <span className="secondary-color">una lettera maiuscola</span>.
        </li>
        <li>
          Deve includere almeno <span className="secondary-color">una lettera minuscola</span>.
        </li>
        <li>
          Deve includere almeno <span className="secondary-color">un carattere speciale</span> (es. @, #, $, ecc.).
        </li>
      </ul>

      <form onSubmit={handleSubmit}>
        <div className="input-group my-2 mx-auto" style={{ maxWidth: "320px" }}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nuova Password"
            required
            className="form-control"
          />
          <button type="button" className="btn btn-dark" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <Eye className="fs-4" /> : <EyeSlash className="fs-4" />}
          </button>
        </div>

        <div className="input-group mx-auto" style={{ maxWidth: "320px" }}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Conferma Password"
            required
            className="form-control"
          />
          <button type="button" className="btn btn-dark" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <Eye className="fs-4" /> : <EyeSlash className="fs-4" />}
          </button>
        </div>
        <button type="submit" className="btn btn-custom rounded-pill py-2 mt-3 px-5">
          Resetta Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
