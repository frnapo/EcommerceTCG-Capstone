import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import BackButton from "../BackButton";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://localhost:7289/api/Auth/forgotpassword", { email });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data.message || "Errore durante l'invio della richiesta");
    }
  };

  return (
    <div className="container text-center mt-4">
      <div className="d-flex align-items-center justify-content-center mt-3 mb-2">
        <div className="me-3">
          <BackButton />
        </div>
        <div>
          <h2 className="m-0 p-0">
            Password <span className="secondary-color">dimenticata?</span>{" "}
          </h2>
        </div>
      </div>
      <p className="px-4 my-3">
        Nessun problema, se hai <span className="secondary-color">già un account</span>, inserisci la tua email nel
        campo sottostante. Se l&apos;indirizzo email è{" "}
        <span className="secondary-color">associato a un account esistente</span>, riceverai un&apos;email con un link
        per impostare una <span className="secondary-color">nuova password</span>.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="input-group mx-auto" style={{ maxWidth: "320px" }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Inserisci la tua email"
            className="py-1 form-control"
            style={{ maxWidth: "500px" }}
          />
        </div>
        <div>
          <button type="submit" className="btn-custom mt-3 px-5 py-2 rounded-pill">
            Conferma
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
