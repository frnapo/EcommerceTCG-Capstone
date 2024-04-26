import BackButton from "../BackButton";

const AllProducts = () => {
  return (
    <div className="container my-3">
      <h1 className="text-center">
        <BackButton /> <span className="secondary-color"> Prodotti</span>
      </h1>
      <div className="rounded-3 bg-blue p-3 mx-auto text-center my-3 admin-control">
        <p className="m-0 p-0 fs-3">Lista prodotti</p>
        <p className="m-0 p-0 fw-light">Visualizza e/o modifica prodotti</p>
      </div>
      <div className="rounded-3 bg-blue p-3 mx-auto text-center my-3 admin-control">
        <p className="m-0 p-0 fs-3">Aggiungi prodotto singolo</p>
        <p className="m-0 p-0 fw-light">Compilando un form</p>
      </div>

      <div className="rounded-3 bg-blue p-3 mx-auto my-3 text-center admin-control">
        <a
          href="https://docs.google.com/spreadsheets/d/1KtLkZSFhlxg5CfDfRm4QIOhW79DKjKLYlyfWTkhmx8k/edit#gid=1573818770"
          className="m-0 p-0 text-white text-decoration-none"
          target="_blank"
        >
          <p className="m-0 p-0 fs-3">Aggiungi prodotti in massa</p>
          <p className="m-0 p-0 fw-light">Tramite Google Sheets</p>
        </a>
      </div>

      <div className="rounded-3 bg-blue p-3 mx-auto text-center admin-control">
        <a
          href="https://drive.google.com/drive/u/1/folders/1sK5TFEwsKaYVhdTXTCDeWs1UDmTWzJPB"
          className="m-0 p-0 text-white text-decoration-none"
          target="_blank"
        >
          <p className="m-0 p-0 fs-3">Aggiungi in massa foto ai prodotti</p>
          <p className="m-0 p-0 fw-light">Tramite Google Drive</p>
        </a>
      </div>
    </div>
  );
};
export default AllProducts;
