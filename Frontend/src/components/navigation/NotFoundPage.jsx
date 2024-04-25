const NotFoundPage = () => {
  return (
    <div className="container my-3 d-flex flex-column justify-content-center align-items-center mt-5">
      <h1 className="mb-3">
        404 <span className="secondary-color">Not Found</span>
      </h1>
      <p className="fs-4 p-4 bg-blue rounded-3 text-center">
        Whoopsie Opsie, il contenuto a cui stai tentando di accedere potrebbe essere stato rimosso o probabilmente non è
        mai esistito. Puoi comunque ricominciare da{" "}
        <a href="/" className="fs-3 text-decoration-none secondary-color">
          QUI 👈
        </a>
      </p>
    </div>
  );
};

export default NotFoundPage;
