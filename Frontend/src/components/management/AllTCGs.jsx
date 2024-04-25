import BackButton from "../BackButton";

const AllTCGs = () => {
  return (
    <div className="container my-3">
      <h1 className="text-center">
        <BackButton /> <span className="secondary-color"> TCG</span>
      </h1>
      <div className="rounded-3 bg-blue p-3 mx-auto text-center my-3 admin-control">
        <p className="m-0 p-0 fs-3">Lista dei TCG</p>
        <p className="m-0 p-0 fw-light">Visualizza e/o modifica le macrocategorie esistenti</p>
      </div>
      <div className="rounded-3 bg-blue p-3 mx-auto text-center my-3 admin-control">
        <p className="m-0 p-0 fs-3">Aggiungi un TCG</p>
        <p className="m-0 p-0 fw-light">Compilando un form</p>
      </div>
    </div>
  );
};
export default AllTCGs;
