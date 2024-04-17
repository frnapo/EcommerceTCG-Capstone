const PrivacyPolicy = () => {
  return (
    <div className="container my-4 pb-4">
      <div className="text-center">
        <h1 className="secondary-color mb-0">Politica sulla Privacy</h1>
        <p className="fw-light">Regolamento 2016/679 in vigore dal 25 maggio 2018</p>
      </div>

      <div className="my-4 bg-blue p-3 rounded-3">
        <h2 className="secondary-color">Informazioni che Raccogliamo</h2>
        <p>Quando visitate il nostro sito, raccogliamo le seguenti informazioni:</p>
        <ul>
          <li>Dati di contatto come nome, indirizzo email e numero di telefono.</li>
          <li>Informazioni di transazione e pagamento.</li>
          <li>Dati di navigazione e preferenze sul sito.</li>
        </ul>
      </div>

      <div className="my-4 bg-blue p-3 rounded-3">
        <h2 className="secondary-color">Come Utilizziamo le Vostre Informazioni</h2>
        <p>Utilizziamo le informazioni raccolte per:</p>
        <ul>
          <li>Processare i vostri ordini.</li>
          <li>Migliorare il nostro sito e offrire un&apos;esperienza personalizzata.</li>
          <li>Inviare comunicazioni di marketing, previo vostro consenso.</li>
        </ul>
      </div>

      <div className="my-4 bg-blue p-3 rounded-3">
        <h2 className="secondary-color">Condivisione delle Informazioni</h2>
        <p>
          Non vendiamo o condividiamo le vostre informazioni con terze parti, tranne nei casi in cui ciò sia necessario
          per fornirvi i nostri servizi, come la consegna di prodotti.
        </p>
      </div>

      <div className="my-4 bg-blue p-3 rounded-3">
        <h2 className="secondary-color">Sicurezza delle Informazioni</h2>
        <p>
          Adottiamo misure di sicurezza per proteggere le vostre informazioni personali contro accessi non autorizzati,
          alterazione, divulgazione o distruzione.
        </p>
      </div>

      <div className="my-4 bg-blue p-3 rounded-3">
        <h2 className="secondary-color">Diritti degli Utenti</h2>
        <p>
          Avete il diritto di accedere, correggere, cancellare o limitare l&apos;uso delle vostre informazioni
          personali. Contattateci per esercitare questi diritti.
        </p>
      </div>

      <div className="my-4 bg-blue p-3 rounded-3">
        <h2 className="secondary-color">Modifiche alla Politica sulla Privacy</h2>
        <p>
          Possiamo aggiornare la nostra Politica sulla Privacy di tanto in tanto. Vi consigliamo di rivedere questa
          pagina periodicamente per qualsiasi cambiamento.
        </p>
      </div>

      <div className="my-4 bg-blue p-3 rounded-3">
        <h2 className="secondary-color">Contatti</h2>
        <p>Per qualsiasi domanda o dubbio relativo alla nostra Politica sulla Privacy, potete contattarci a:</p>
        <p className="m-0 p-0">
          Email: <span className="secondary-color">packpeekershop@gmail.com</span>
        </p>
        <p>
          Telefono: <span className="secondary-color">+39 37034010</span>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
