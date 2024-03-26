import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { useSelector } from "react-redux";
import NavbarComponent from "./components/navigazione/NavbarComponent";
import HomeComponent from "./components/navigazione/HomeComponent";
import Login from "./components/autenticazione/Login";
import Logout from "./components/autenticazione/Logout";
import Register from "./components/autenticazione/Register";
import UtenteComponent from "./components/navigazione/UtenteComponent";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const token = useSelector((state) => state.auth.token);
  console.log(token);
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  return (
    <Router>
      <div>
        <NavbarComponent />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              marginTop: "70px",
            },
          }}
        />
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profilo" element={<UtenteComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// {token ? <h2>Benvenuto {user.Nome}</h2> : ""}
// <div className="d-flex">
//   {!token && (
//     <>
//       <Register />
//       <Login />
//     </>
//   )}
// </div>
// {token && <Logout />}
{
  /* <div className="container">
<CarteComponent idCategoria={1} />
</div> */
}
