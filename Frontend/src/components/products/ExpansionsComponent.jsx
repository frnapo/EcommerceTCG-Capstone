import { Link } from "react-router-dom"; // Importazione corretta di Link
import YGOfirst from "../../assets/img/YGOfirst.png";
import YGOsecond from "../../assets/img/YGOsecond.png";
import YGOwrite from "../../assets/img/YGOwrite.png";
import OPfirst from "../../assets/img/OPfirst.png";
import OPsecond from "../../assets/img/OPsecond.png";
import OPwrite from "../../assets/img/OPwrite.png";
import DBfirst from "../../assets/img/DBfirst.png";
import DBsecond from "../../assets/img/DBsecond.png";
import DBwrite from "../../assets/img/DBwrite.png";
import PKMfirst from "../../assets/img/PKMfirst.png";
import PKMsecond from "../../assets/img/PKMsecond.png";
import PKMwrite from "../../assets/img/PKMwrite.png";
import BackButton from "../BackButton";

const ExpansionsComponent = () => {
  const expansionsCategory = [
    {
      id: 1,
      name: "Yu-Gi-Oh",
      firstImage: YGOfirst,
      secondImage: YGOsecond,
      write: YGOwrite,
      link: "/expansions/type/1",
    },
    {
      id: 2,
      name: "One Piece",
      firstImage: OPfirst,
      secondImage: OPsecond,
      write: OPwrite,
      link: "/expansions/type/2",
    },
    {
      id: 3,
      name: "Dragonball",
      firstImage: DBfirst,
      secondImage: DBsecond,
      write: DBwrite,
      link: "/expansions/type/3",
    },
    {
      id: 4,
      name: "Pokemon",
      firstImage: PKMfirst,
      secondImage: PKMsecond,
      write: PKMwrite,
      link: "/expansions/type/4",
    },
  ];

  return (
    <div className="container mt-5">
      <h1 className="mt-5 fw-bold text-center mb-4">
        <BackButton /> Seleziona un
        <span className="secondary-color"> TCG </span>
        per accedere alle relative
        <span className="secondary-color"> espansioni </span>
      </h1>
      <div className="row">
        {expansionsCategory.map((category) => (
          <div className="col-12 p-4 col-md-6 col-xl-4" key={category.id}>
            <Link to={category.link} className="expansion-link">
              <div className="card bg-transparent ">
                <div className="wrapper rounded-0">
                  <img src={category.firstImage} className="cover-image rounded-4" />
                </div>
                <img src={category.write} className="title" />
                <img src={category.secondImage} className="character " />
              </div>
            </Link>
          </div>
        ))}
      </div>
      <h6 className="mt-5 lead text-center fs-6 mb-4 text-secondary">
        Lista in aggiornamento a seconda dei prodotti trattati...
      </h6>
    </div>
  );
};
export default ExpansionsComponent;
