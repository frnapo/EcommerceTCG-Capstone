const FilterComponent = () => {
  return (
    <div className="bg-white rounded-3 p-4">
      <h4>Imposta Filtri</h4>
      <form>
        <div className="mb-3">
          <label htmlFor="rarita" className="form-label">
            Rarità
          </label>
          <select className="form-select" id="rarita">
            <option selected>Scegli...</option>
            <option value="1">Comune</option>
            <option value="2">Rara</option>
            <option value="3">Ultra Rara</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="lingua" className="form-label">
            Lingua
          </label>
          <select className="form-select" id="lingua">
            <option selected>Scegli...</option>
            <option value="1">Italiano</option>
            <option value="2">Inglese</option>
            <option value="3">Giapponese</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Applica Filtri
        </button>
      </form>
    </div>
  );
};

export default FilterComponent;
