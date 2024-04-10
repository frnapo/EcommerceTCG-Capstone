/* eslint-disable react/prop-types */
import React from "react";
import { Spinner } from "react-bootstrap";
import { CheckCircleFill } from "react-bootstrap-icons";

const ProgressBar = ({ currentStep }) => {
  const circleClass = (step) => {
    if (currentStep > step) return "completed";
    if (currentStep === step) return "active";
    return "";
  };

  return (
    <div
      className="my-custom-progress"
      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "20px 0" }}
    >
      {["Dati", "Spedizione", "Pagamento"].map((label, index) => (
        <React.Fragment key={label}>
          {index > 0 && (
            <div className="divider-line" style={{ flex: 1, height: "2px", backgroundColor: "#ccc" }}></div>
          )}
          <div className="step">
            <div className={`circle ${circleClass(index + 1)}`}>
              {currentStep === index + 1 ? (
                <Spinner as="span" animation="border" size="md" role="status" aria-hidden="true" />
              ) : currentStep > index + 1 ? (
                <CheckCircleFill className="step-icon fs-3" />
              ) : (
                index + 1
              )}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressBar;
