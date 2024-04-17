const ShippingPolicy = () => {
  return (
    <div className="container my-4 pb-4">
      <div className="text-center">
        <h1 className="secondary-color mb-0">Politica di Spedizione</h1>
        <p className="fw-light">
          Qui di seguito troverai informazioni dettagliate sulla nostra politica di spedizione e consegna.
        </p>
      </div>

      <div className="my-4 bg-blue p-3 rounded-3">
        <h2 className="secondary-color">Metodi di Spedizione</h2>
        <p>
          Attualmente ci affidiamo solo ai tipi di spedizione offerti da{" "}
          <span className="secondary-color">PosteItaliane</span>
        </p>
        <ul>
          <li>
            <span className="secondary-color">Spedizione nazionale:</span> consegna entro 4-7 giorni lavorativi.
          </li>
          <li>
            <span className="secondary-color">Spedizione internazionale:</span> può aumentare di qualche giorno rispetto
            alla nazionale.
          </li>
        </ul>
      </div>

      <div className="my-4 bg-blue p-3 rounded-3">
        <h2 className="secondary-color">Costi di Spedizione</h2>
        <p>I costi di spedizione variano in base al tipo di spedizione selezionata al momento del checkout:</p>
        <ul>
          <li>
            <span className="secondary-color">Posta 4</span> - standard, nazionale, non tracciata, €2.90
          </li>
          <li>
            <span className="secondary-color">Posta 1</span> - standard, nazionale, tracciata, €3.60
          </li>
          <li>
            <span className="secondary-color">Posta International</span> - standard, internazionale, tracciata, €4.90
          </li>
        </ul>
      </div>

      <div className="my-4 bg-blue p-3 rounded-3">
        <h2 className="secondary-color">Tracking della Spedizione</h2>
        <p>
          Se hai selezionato la spedizione che prevede un codice tracking al momento del checkout, una volta che il tuo
          ordine è stato spedito, riceverai un codice via email che ti permetterà di seguire il percorso del tuo pacco
          fino alla consegna.
        </p>
      </div>

      <div className="my-4 bg-blue p-3 rounded-3">
        <h2 className="secondary-color">Area di Spedizione</h2>
        <p>
          Spediamo in tutto il territorio nazionale e in selezionati paesi internazionali. Per spedizioni
          internazionali, i costi e i tempi possono variare.
        </p>
      </div>

      <div className="my-4 bg-blue p-3 rounded-3">
        <h2 className="secondary-color">Problemi di Spedizione</h2>
        <p>
          In caso di ritardi, pacchi danneggiati o smarriti, si prega di contattare il nostro servizio clienti il prima
          possibile. Faremo tutto il possibile per risolvere il problema e garantire la soddisfazione del cliente.
        </p>
      </div>

      <div className="my-4 bg-blue p-3 rounded-3">
        <h2 className="secondary-color">Resi e Rimborsi</h2>
        <p>
          Se desideri restituire un prodotto, consulta le nostre <span className="secondary-color">FAQ</span> e
          contattaci per <span className="secondary-color">Email</span> o{" "}
          <span className="secondary-color">Whatsapp</span>. I rimborsi vengono processati entro 14 giorni dalla
          ricezione del prodotto restituito.
        </p>
      </div>

      <div className="my-4 bg-blue p-3 rounded-3">
        <h2 className="secondary-color">Contatti</h2>
        <p>Per domande o chiarimenti sulla nostra politica di spedizione, puoi contattarci a:</p>
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

export default ShippingPolicy;
