import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Collapse } from "react-bootstrap";
import ArrowDownIcon from "../../assets/icons/ArrowDownIcon";
import ArrowUpIcon from "../../assets/icons/ArrowUpIcon";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";

const FilterComponent = () => {
  const [open, setOpen] = useState(window.innerWidth >= 768);
  const [openRarity, setOpenRarity] = useState(window.innerWidth < 768);
  const [openGrade, setOpenGrade] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 768;
      setOpen(isDesktop);
      setOpenRarity(!isDesktop);
      setOpenGrade(!isDesktop);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="rounded-4 p-4 bg-blue sticky-md-top" id="filter-container">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="m-0 fs-3" style={{ minWidth: "250px" }}>
          Imposta Filtri
        </h4>

        <div className="d-block d-md-none">
          {!open ? (
            <div
              onClick={() => setOpen(!open)}
              className="cursor-pointer"
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
            <div className="my-3">
              <select className="form-select" id="espansione">
                <option value="seleziona">Espansione</option>
                <option value="1">Italiano</option>
                <option value="2">Inglese</option>
                <option value="3">Giapponese</option>
              </select>
            </div>

            {/* Sezione "Rarità" */}
            <div className="mb-3">
              <div
                className="d-flex justify-content-between align-items-center"
                onClick={() => window.innerWidth >= 768 && setOpenRarity(!openRarity)}
              >
                <label className="form-label fs-5">Rarità</label>
                {window.innerWidth >= 768 &&
                  (!openRarity ? (
                    <ChevronUp className="fs-4 cursor-pointer" />
                  ) : (
                    <ChevronDown className="fs-4 cursor-pointer" />
                  ))}
              </div>
              <Collapse in={openRarity}>
                <div className="form-checkbox-group" id="rarita"></div>
              </Collapse>
            </div>

            {/* Sezione "Gradiazione" */}
            <div className="mb-3">
              <div
                className="d-flex justify-content-between align-items-center"
                onClick={() => window.innerWidth >= 768 && setOpenGrade(!openGrade)}
              >
                <label className="form-label fs-5">Gradiazione</label>
                {window.innerWidth >= 768 &&
                  (!openGrade ? (
                    <ChevronUp className="fs-4 cursor-pointer" />
                  ) : (
                    <ChevronDown className="fs-4 cursor-pointer" />
                  ))}
              </div>
              <Collapse in={openGrade}>
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
              </Collapse>
            </div>

            {/* Lingua come checkbox con scrollbar */}
            <div className="mb-3">
              <label className="form-label fs-5">Lingua</label>
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
