const TermsAndConditions = () => {
  return (
    <div className="container my-4 pb-5">
      <div className="text-center">
        <h1 className="mt-3 mb-0 secondary-color">Termini e Condizioni</h1>
        <p className="fw-light">Ultimo aggiornamento: 15/04/2024</p>
      </div>

      <div className="my-4 bg-blue p-3 rounded-3">
        <h2 className="secondary-color">Introduzione</h2>
        <p>
          Benvenuti su <span className="secondary-color">PackPeekershop</span>, il vostro negozio di fiducia per tutte
          le esigenze di Trading Card Games. Questi Termini e Condizioni governano l&apos;uso del nostro sito web e dei
          servizi correlati.
        </p>
      </div>

      <div className="my-4 bg-blue p-3 rounded-3">
        <h2 className="secondary-color">Utilizzo del Sito</h2>
        <p>
          Accedendo al nostro sito, l&apos;utente accetta di rispettare i presenti{" "}
          <span className="secondary-color">Termini e Condizioni</span>. Se non si è d&apos;accordo con parte di questi
          termini, l&apos;accesso al servizio è da considerarsi non autorizzato.
        </p>
      </div>

      <div className="my-4 bg-blue p-3 rounded-3">
        <h2 className="secondary-color">Condizioni di Vendita</h2>
        <p>Quando acquistate prodotti dal nostro sito, siete tenuti a comprendere che:</p>
        <ul>
          <li>I prezzi e la disponibilità dei prodotti possono variare senza preavviso.</li>
          <li>Gli acquisti sono finali e non rimborsabili salvo specificate condizioni.</li>
          <li>Le spedizioni possono essere soggette a ritardi non previsti.</li>
        </ul>
      </div>

      <div className="my-4 bg-blue p-3 rounded-3">
        <h2 className="secondary-color">Proprietà Intellettuale</h2>
        <p>
          Tutti i contenuti pubblicati e messi a disposizione su questo sito, inclusi testi, grafica, loghi, immagini,
          dati compilativi e software sono di proprietà di <span className="secondary-color">PackPeekerShop</span> o dei
          nostri fornitori e sono protetti dalle leggi internazionali sul diritto d&apos;autore.
        </p>
      </div>

      <div className="my-4 bg-blue p-3 rounded-3">
        <h2 className="secondary-color">Limitazione di Responsabilità</h2>
        <p>
          <span className="secondary-color">PackPeekerShop</span> non sarà responsabile per qualsiasi danno indiretto,
          conseguente o speciale risultante dall&apos;uso o dall&apos;incapacità di utilizzare i servizi offerti sul
          sito.
        </p>
      </div>

      <div className="my-4 bg-blue p-3 rounded-3">
        <h2 className="secondary-color">Modifiche ai Termini</h2>
        <p>
          Riserviamo il diritto di modificare questi termini in qualsiasi momento. È responsabilità dell&apos;utente
          verificare eventuali modifiche.
        </p>
      </div>

      <div className="my-4 bg-blue p-3 rounded-3">
        <h2 className="secondary-color">Contatti</h2>
        <p>Per ogni domanda o dubbio relativo a questi termini, si prega di contattarci a:</p>
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

export default TermsAndConditions;
