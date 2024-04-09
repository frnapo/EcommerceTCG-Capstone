/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Collapse } from "react-bootstrap";
import ArrowDownIcon from "../../assets/icons/ArrowDownIcon";
import ArrowUpIcon from "../../assets/icons/ArrowUpIcon";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import { fetchExpansionsByType, fetchRaritiesByType } from "../../redux/slices/filterSlice";

const FilterComponent = ({ onFilter }) => {
  const [open, setOpen] = useState(window.innerWidth >= 768);
  const [openRarity, setOpenRarity] = useState(window.innerWidth < 768);
  const [openGrade, setOpenGrade] = useState(window.innerWidth < 768);
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const expansions = useSelector((state) => state.filters.expansions);
  const rarities = useSelector((state) => state.filters.rarities);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchExpansionsByType(categoryId));
      dispatch(fetchRaritiesByType(categoryId));
    }
  }, [categoryId, dispatch]);

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

  const [filters, setFilters] = useState({
    expansion: "",
    rarity: [],
    grade: [],
    language: [],
  });

  const handleExpansionChange = (e) => {
    setFilters({ ...filters, expansion: e.target.value });
  };

  const handleRarityChange = (e) => {
    const { checked, value } = e.target;
    setFilters({
      ...filters,
      rarity: checked ? [...filters.rarity, value] : filters.rarity.filter((r) => r !== value),
    });
  };
  const handleLanguageChange = (e) => {
    const { checked, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      language: checked ? [...prevFilters.language, value] : prevFilters.language.filter((lang) => lang !== value),
    }));
  };

  const handleGradeChange = (e) => {
    const { checked, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      grade: checked ? [...prevFilters.grade, value] : prevFilters.grade.filter((g) => g !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };
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
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <select className="form-select" aria-label="Espansione" onChange={handleExpansionChange}>
                <option value="">Seleziona Espansione</option>
                {expansions.map((expansion) => (
                  <option key={expansion.expansionId} value={expansion.name}>
                    {expansion.name}
                  </option>
                ))}
              </select>
            </div>
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
                <div className="form-checkbox-group" id="rarities">
                  {rarities.map((rarity) => (
                    <div key={rarity.rarityId}>
                      <input
                        type="checkbox"
                        id={`rarity-${rarity.rarityId}`}
                        name="rarity"
                        value={rarity.description}
                        onChange={handleRarityChange}
                      />
                      <label className="ms-2" htmlFor={`rarity-${rarity.rarityId}`}>
                        {rarity.description}
                      </label>
                    </div>
                  ))}
                </div>
              </Collapse>
            </div>
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
                  {["Near Mint", "Mint", "Excellent", "Good", "Fair", "Poor"].map((grade) => (
                    <div className="checkbox-option" key={grade}>
                      <input type="checkbox" value={grade} id={grade} onChange={handleGradeChange} />
                      <label className="ms-2" htmlFor={grade}>
                        {grade}
                      </label>
                    </div>
                  ))}
                </div>
              </Collapse>
            </div>
            <div className="mb-3">
              <label className="form-label fs-5">Lingua</label>
              <div className="form-checkbox-group" id="lingua">
                {["Italiano", "English", "Japanese"].map((language, index) => (
                  <div className="checkbox-option" key={index}>
                    <input type="checkbox" value={language} id={language} onChange={handleLanguageChange} />
                    <label className="ms-2" htmlFor={language}>
                      {language}
                    </label>
                  </div>
                ))}
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
