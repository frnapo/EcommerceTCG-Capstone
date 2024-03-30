import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Collapse } from "react-bootstrap";
import ArrowDownIcon from "../../assets/icons/ArrowDownIcon";
import ArrowUpIcon from "../../assets/icons/ArrowUpIcon";

const FilterComponent = () => {
  const [open, setOpen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="rounded-4 p-4 bg-blue sticky-md-top" id="filter-container">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="m-0" style={{ minWidth: "250px" }}>
          Imposta Filtri
        </h4>

        <div className="d-block d-md-none">
          {!open ? (
            <div
              onClick={() => setOpen(!open)}
              className="cursor-pointer "
              aria-controls="collpase-filter"
              aria-expanded={open}
            >
              <ArrowDownIcon />
            </div>
          ) : (
            <div
              onClick={() => setOpen(!open)}
              className="cursor-pointer"
              aria-controls="collpase-filter"
              aria-expanded={open}
            >
              <ArrowUpIcon />
            </div>
          )}
        </div>
      </div>
      <Collapse in={open}>
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          exit={{ opacity: 0, scaleY: 0 }}
          transition={{ duration: 0.5 }}
          id="collpase-filter"
        >
          <form>
            <div className="mb-3">
              <label className="form-label">Espansione</label>
              <select className="form-select" id="espansione">
                <option value="seleziona">Seleziona espansione</option>
                <option value="1">Italiano</option>
                <option value="2">Inglese</option>
                <option value="3">Giapponese</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Rarità</label>
              <div className="form-checkbox-group" id="rarita">
                <div className="checkbox-option">
                  <input type="checkbox" value="1" id="comune" /> <label htmlFor="comune">Comune</label>
                </div>
                <div className="checkbox-option">
                  <input type="checkbox" value="2" id="rara" /> <label htmlFor="rara">Rara</label>
                </div>
                <div className="checkbox-option">
                  <input type="checkbox" value="3" id="ultraRara" /> <label htmlFor="ultraRara">Ultra Rara</label>
                </div>
                <div className="checkbox-option">
                  <input type="checkbox" value="4" id="segreta" /> <label htmlFor="segreta">Segreta</label>
                </div>
                <div className="checkbox-option">
                  <input type="checkbox" value="5" id="ultimate" /> <label htmlFor="ultimate">Ultimate</label>
                </div>
                <div className="checkbox-option">
                  <input type="checkbox" value="6" id="ghost" /> <label htmlFor="ghost">Ghost</label>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Gradiazione</label>
              <div className="form-checkbox-group" id="gradiazione">
                <div className="checkbox-option">
                  <input type="checkbox" value="nearMint" id="nearMint" /> <label htmlFor="nearMint">Near Mint</label>
                </div>
                <div className="checkbox-option">
                  <input type="checkbox" value="mint" id="mint" /> <label htmlFor="mint">Mint</label>
                </div>
                <div className="checkbox-option">
                  <input type="checkbox" value="excellent" id="excellent" />{" "}
                  <label htmlFor="excellent">Excellent</label>
                </div>
                <div className="checkbox-option">
                  <input type="checkbox" value="good" id="good" /> <label htmlFor="good">Good</label>
                </div>
                <div className="checkbox-option">
                  <input type="checkbox" value="fair" id="fair" /> <label htmlFor="fair">Fair</label>
                </div>
                <div className="checkbox-option">
                  <input type="checkbox" value="poor" id="poor" /> <label htmlFor="poor">Poor</label>
                </div>
              </div>
            </div>

            {/* Lingua come checkbox con scrollbar */}
            <div className="mb-3">
              <label className="form-label">Lingua</label>
              <div className="form-checkbox-group" id="lingua">
                <div className="checkbox-option">
                  <input type="checkbox" value="1" id="italiano" /> <label htmlFor="italiano">Italiano</label>
                </div>
                <div className="checkbox-option">
                  <input type="checkbox" value="2" id="inglese" /> <label htmlFor="inglese">Inglese</label>
                </div>
                <div className="checkbox-option">
                  <input type="checkbox" value="3" id="giapponese" /> <label htmlFor="giapponese">Giapponese</label>
                </div>
              </div>
            </div>
            <button type="submit" className="btn-custom w-100 rounded-pill py-2 px-4">
              Applica Filtri
            </button>
          </form>
        </motion.div>
      </Collapse>
    </div>
  );
};

export default FilterComponent;
