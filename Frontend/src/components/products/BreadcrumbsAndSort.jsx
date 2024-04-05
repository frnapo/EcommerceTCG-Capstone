/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

const BreadcrumbsAndSort = ({ categoryId, onSortChange }) => {
  const categorieMapping = {
    1: "Yu-Gi-Oh",
    2: "One Piece",
    3: "Dragonball",
    4: "Pokémon",
  };

  const [sortValue, setSortValue] = useState("");

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortValue(value);
    onSortChange(value);
  };

  const currentCategory = categorieMapping[categoryId];

  return (
    <div className="d-lg-flex justify-content-between align-items-center">
      <div className="fw-light mb-2 mb-lg-0">
        <Link to="/" className="text-white text-decoration-none">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/categorie" className="text-white text-decoration-none">
          Categorie
        </Link>{" "}
        / {currentCategory}
      </div>
      <div>
        <select className="form-select" value={sortValue} onChange={handleSortChange}>
          <option value="">Ordina Per</option>
          <option value="nome-az">Nome A-Z</option>
          <option value="nome-za">Nome Z-A</option>
          <option value="prezzo-alto-basso">Prezzo alto-basso</option>
          <option value="prezzo-basso-alto">Prezzo basso-alto</option>
          <option value="serialNumber-basso-alto">Serial number basso-alto</option>
          <option value="serialNumber-alto-basso">Serial number alto-basso</option>
          <option value="disponibile">Disponibile</option>
        </select>
      </div>
    </div>
  );
};

export default BreadcrumbsAndSort;
