import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchExpansionsByType } from "../../redux/slices/filterSlice";
import BackButton from "../BackButton";

const ExpansionsTypeComponent = () => {
  const { typeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const expansions = useSelector((state) => state.filters.expansions);

  useEffect(() => {
    dispatch(fetchExpansionsByType(typeId));
  }, [dispatch, typeId]);

  const handleExpansionClick = (expansionName) => {
    navigate(`/categories/${typeId}`, { state: { expansion: expansionName } });
  };
  const typeTitles = {
    1: "Yu-Gi-Oh!",
    2: "One Piece",
    3: "Dragonball",
    4: "Pokémon",
  };

  const title = typeTitles[typeId] || "Espansioni";

  return (
    <div className="container">
      <h1 className="mt-5 fw-bold mb-5">
        <BackButton /> Espansioni <span className="secondary-color">{title}</span>
      </h1>
      <div className="row">
        {expansions.map((expansion) => (
          <div key={expansion.expansionId} className="col-sm-12 col-md-6 col-lg-4 mb-4">
            <div
              className="card h-100 rounded card-custom cursor-pointer"
              onClick={() => handleExpansionClick(expansion.name)}
            >
              <div className="img-container">
                <img src={expansion.imageUrl} className="card-img-top" alt={expansion.name} />
              </div>
              <div className="card-body">
                <h5 className="card-title  custom-card-title">{expansion.name}</h5>
                <p className="fw-light m-0 p-0 text-secondary custom-release-date">{expansion.releaseDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h6 className="mt-5 lead text-center fs-6 mb-4 text-secondary">Espansioni in continuo aggiornamento...</h6>
    </div>
  );
};

export default ExpansionsTypeComponent;
