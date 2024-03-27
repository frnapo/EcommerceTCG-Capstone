import YGO from "../../assets/img/ygo.png";
import OP from "../../assets/img/op.png";
import DB from "../../assets/img/db.png";
import PKM from "../../assets/img/pkm.png";

const HeaderComponent = () => {
  return (
    <div className="my-2 mb-4">
      <h1 className="text-white display-1 fw-bold ">Yu-Gi-Oh!</h1>
      <div className="image-wrapper">
        <div className="image-box rounded-start-pill">
          <img src={YGO} className="hover-image" alt="Yu-Gi-Oh!" />
        </div>
        <div className="image-box">
          <img src={OP} className="hover-image" alt="One Piece" />
        </div>
        <div className="image-box">
          <img src={PKM} className="hover-image" alt="Pokémon" />
        </div>
        <div className="image-box rounded-end-pill">
          <img src={DB} className="hover-image" alt="DragonBall" />
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
