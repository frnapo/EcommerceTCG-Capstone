import { useNavigate } from "react-router-dom";
import { CaretLeftFill } from "react-bootstrap-icons";

function BackButton() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return <CaretLeftFill onClick={goBack} className="fs-4 cursor-pointer back-icon" aria-label="Torna indietro" />;
}

export default BackButton;
