import { CheckCircleFill } from "react-bootstrap-icons";

/* eslint-disable react/prop-types */
const ProgressBar = ({ currentStep }) => {
  const isActiveBar = (barStep) => currentStep > barStep;

  return (
    <div
      className="progress-container px-5 my-4"
      style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
    >
      <div className="step">
        {renderStepContent(1, currentStep)}
        <div className="label position-absolute fw-light">Dati</div>
      </div>
      <div className={`divider-line ${isActiveBar(1) ? "active" : ""}`}></div>

      {/* Step 2 */}
      <div className="step">
        {renderStepContent(2, currentStep)}
        <div className="label position-absolute fw-light" style={{ marginLeft: "-21px" }}>
          Spedizione
        </div>
      </div>

      {/* Divider 2 */}
      <div className={`divider-line ${isActiveBar(2) ? "active" : ""}`}></div>

      {/* Step 3 */}
      <div className="step">
        {renderStepContent(3, currentStep)}
        <div className="label position-absolute fw-light" style={{ marginLeft: "-25px" }}>
          Pagamento
        </div>
      </div>
    </div>
  );
};

const renderStepContent = (step, currentStep) => {
  return currentStep > step ? (
    <div className={`position-relative`}>
      <CheckCircleFill className="custom-check" />
    </div>
  ) : (
    <div className={`position-relative circle ${currentStep === step ? "active" : ""}`}>{step}</div>
  );
};

export default ProgressBar;
