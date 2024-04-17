import { useState } from "react";
import { ChevronUp, ChevronDown } from "react-bootstrap-icons";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Come posso tracciare il mio ordine?",
      answer:
        "Se la spedizione include un tracking code dopo aver effettuato un ordine, riceverai un'email di conferma con un link per tracciare il tuo pacco, altrimenti puoi anche tracciare il tuo ordine direttamente dal tuo account sul nostro sito.",
    },
    {
      question: "Quali metodi di pagamento sono accettati?",
      answer:
        "Attualmente accettiamo solo pagamenti sicuri tramite carta di credito appoggiandoci a Stripe, per tutte le informazioni puoi consultare la loro pagina di policy.",
    },
    {
      question: "È possibile effettuare resi o cambi?",
      answer:
        "Offriamo una politica di reso entro 14 giorni dalla ricezione dell'articolo. Garantiamo che ogni prodotto rispecchi sempre le condizioni descritte, perciò prima di avviare un reso è necessario contattarci per Email o Whatsapp.",
    },
    {
      question: "Come posso contattare il supporto clienti?",
      answer:
        "Puoi contattarci via email all'indirizzo packpeekershop@gmail.com, o, tramite il nostro numero di WhatsApp disponibile nella sezione contatti del sito.",
    },
    {
      question: "Cosa fare se un prodotto è esaurito?",
      answer:
        "Se un prodotto è esaurito, puoi iscriverti alla nostra notifica di disponibilità. Riceverai un'email non appena il prodotto sarà nuovamente disponibile.",
    },
    {
      question: "Offrite sconti per grandi ordini?",
      answer:
        "Sì, offriamo sconti per ordini all'ingrosso o per acquisti frequenti. Per maggiori informazioni, contatta il nostro supporto clienti.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="container mb-4">
      <h1 className="mt-4 mb-3">
        Domande <span className="secondary-color">Frequenti</span>
      </h1>
      <div className="my-5">
        <p>
          Puoi consultare le <span className="secondary-color">FAQ</span> per visualizzare le domande più frequenti. Se
          non trovi quello che cerchi, prova a scrivere al bot in basso a destra oppure puoi inviare un&apos;email a{" "}
          <a target="_blank" href="mailto:packpeekershop@gmail.com" className="secondary-color">
            packpeekershop@gmail.com
          </a>
        </p>
      </div>
      <div className="accordion " id="faqAccordion">
        {faqs.map((faq, index) => (
          <div className="accordion-item border-0" key={index}>
            <h2 className="accordion-header rounded-5" id={`heading${index}`}>
              <button
                className="accordion-button d-flex justify-content-between align-items-center w-100"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded="true"
                aria-controls={`collapse${index}`}
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                {activeIndex === index ? <ChevronUp /> : <ChevronDown />}
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              className={`p-3 bg-background-color text-white accordion-collapse  collapse ${
                activeIndex === index ? "show" : ""
              }`}
              aria-labelledby={`heading${index}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body ">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
