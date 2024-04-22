import YGO from "../../assets/img/ygo1.png";
import OP from "../../assets/img/op1.png";
import DB from "../../assets/img/db1.png";
import PKM from "../../assets/img/pkm1.png";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, InputGroup } from "react-bootstrap";
import SearchOffcanvas from "./SearchOffcanvas";
import HoloCardComponent from "../products/HoloCardComponent";
import { useEffect, useState } from "react";
import Header from "../../assets/img/header.png";
import Instagram from "../../assets/img/instagram.png";
import TikTok from "../../assets/img/tiktok.png";
import Youtube from "../../assets/img/youtube.png";

const images = [
  {
    src: "https://c4.wallpaperflare.com/wallpaper/535/110/498/yu-gi-oh-5ds-wallpaper-preview.jpg",
    alt: "Immagine yu-gi-oh",
  },
  {
    src: "https://wallpapers.com/images/hd/one-piece-live-waterworld-oa1dbv6n1i4l5sij.jpg",
    alt: "Immagine one piece",
  },
  {
    src: "https://png.pngtree.com/thumb_back/fh260/background/20230610/pngtree-dragon-ball-z-image_2919758.jpg",
    alt: "Immagine dragonball",
  },
  { src: "https://www.desktophut.com/images/1708615688.webp", alt: "Immagine pokemon" },
  { src: "https://wallpapers.com/images/featured/yugioh-8a2a9p7gcudgea9f.jpg", alt: "Immagine yu-gi-oh" },
  {
    src: "https://images.squarespace-cdn.com/content/v1/5fe4caeadae61a2f19719512/0bce4da5-a8f8-4093-b6a3-7358904b2234/One+Piece+Anime",
    alt: "Immagine one piece",
  },
  { src: "https://images3.alphacoders.com/134/thumb-1920-1345241.png", alt: "Immagine dragonball" },
  { src: "https://wallpapercave.com/wp/DRd73IK.jpg", alt: "Immagine pokemon" },
];

const icons = [
  { src: YGO, alt: "YGO", link: "/categories/1" },
  { src: OP, alt: "OP", link: "/categories/2" },
  { src: DB, alt: "DB", link: "/categories/3" },
  { src: PKM, alt: "PKM", link: "/categories/4" },
];

const prodotto = {
  productId: 571,
  name: "Charizard Vmax",
  price: 1.45,
  availableQuantity: 6,
  imageUrl: "https://res.cloudinary.com/die4nbwfp/image/upload/v1713541893/cards/s7ph5984nxn8owvcrmrd.webp",
  serialNumber: "SV107/SV122",
  firstEdition: true,
  rarity: "Ultra Shiny",
  expansion: "Destino Splendente",
  type: "Pokémon",
  language: "English",
  condition: "Near Mint",
};

const ContinuousCarousel = () => {
  const [isHoloActive, setIsHoloActive] = useState(false);

  const toggleHoloEffect = () => {
    setIsHoloActive((prevState) => !prevState);
  };

  const [latestExp, setLatestExp] = useState([]);

  const fetchLatestExp = async () => {
    const response = await fetch(`https://localhost:7289/api/Products/getlatestexpansions`);
    const data = await response.json();
    console.log(data);
    setLatestExp(data);
  };

  useEffect(() => {
    fetchLatestExp();
  }, []);

  const navigate = useNavigate();

  const handleNavigate = (typeId, expansionName) => {
    navigate(`/categories/${typeId}`, { state: { expansion: expansionName } });
  };

  return (
    <div>
      <div className="continuous-carousel">
        <div className="carousel-track">
          {images.map((image, index) => (
            <img key={index} className="shadow" src={image.src} alt={image.alt} />
          ))}
        </div>
        <img src={Header} alt="" className="position-absolute-custom" />
      </div>
      <div>
        <h4 className="text-center my-4">
          Per iniziare <span className="secondary-color">cerca un prodotto</span> o{" "}
          <span className="secondary-color">seleziona una categoria</span>
        </h4>
      </div>

      <div className="container">
        <div className="row d-flex align-items-center justify-content-center" data-aos="zoom-in">
          <div className="col-12 px-5 px-md-0 col-md-7 nav-item">
            <InputGroup>
              <Form.Control
                disabled
                className="rounded-start-5"
                type="text"
                placeholder="Clicca sull'icona per ricercare..."
                autoFocus
              />
              <Button className="btn-custom rounded-end-5 me-3" type="submit">
                <SearchOffcanvas />
              </Button>
            </InputGroup>
          </div>

          <div className="col-auto mt-4 my-lg-0">
            {icons.map((icon, index) => (
              <Link key={index} to={icon.link} className="cursor-pointer">
                <div className="homepage-img mx-2 mx-md-1">
                  <img src={icon.src} alt={icon.alt} className="img-fluid" />
                  <span className="text-center homepage-img-text">{icon.alt}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="my-5">
          <div className="row d-flex">
            <div
              className="col-7 col-md-5 col-lg-4  col-xl-3 my-2 my-md-0  mx-auto me-md-0 ms-md-auto order-2 order-md-1"
              data-aos="fade-right"
            >
              <HoloCardComponent isFocused={true} isHoloActive={isHoloActive} prodotto={prodotto} />
            </div>

            <div
              className="col-12 col-md-7 col-lg-6 my-4 my-md-0 col-xl-5 me-auto order-1 order-md-2 text-center text-md-start"
              data-aos="fade-left"
            >
              <h4 className="px-3">
                Per tutti gli <span className="secondary-color">appassionati di TCG</span>
              </h4>
              <p className="p-3  fw-light">
                Scopri una nuova dimensione di shopping con le nostre esclusive HoloCards! Grazie alla tecnologia 3D
                interattiva, ogni card segue il movimento del tuo mouse, offrendo un&apos;esperienza visiva dinamica che
                porta in vita i tuoi prodotti preferiti. Con un semplice click, attiva l&apos;effetto olografico e
                immergiti in un display vibrante che esalta i dettagli e le texture. Le nostre HoloCards sono progettate
                per rendere il tuo viaggio nell&apos;e-commerce non solo più intuitivo ma straordinariamente immersivo.
                Non perdere l&apos;occasione di esplorare i prodotti come mai prima d&apos;ora: tocca, senti e vedi la
                differenza con un&apos;esperienza di shopping che va oltre il semplice acquisto.
              </p>

              <Button
                onClick={toggleHoloEffect}
                className={`mb-3 px-5 rounded-pill py-2 d-flex mx-auto btn-toggle ${
                  isHoloActive ? "btn-dark" : "btn-custom"
                }`}
              >
                {isHoloActive ? "Disattiva holo" : "Attiva holo"}
              </Button>
            </div>
          </div>
        </div>

        <div>
          <div className="row d-flex align-items-center">
            <div className="col-12 col-md-7 col-lg-6 col-xl-5 ms-auto text-center text-md-start" data-aos="fade-right">
              <h4 className="px-3">
                Un&apos;esperienza <span className="secondary-color">unica</span> nel suo genere
              </h4>
              <p className="p-3 fw-light">
                Il nostro e-commerce ridefinisce lo shopping online trasformandolo in un&apos;avventura visivamente
                stimolante e interattiva. Ogni elemento è pensato per coinvolgerti attivamente: dai caroselli animati
                che rispondono al più lieve movimento del mouse, agli articoli che puoi trascinare per una
                visualizzazione personalizzata. Immagina di poter esplorare le nostre collezioni non solo con un clic,
                ma attraverso un&apos;esperienza che ti permette di interagire con i prodotti in modi sorprendentemente
                vividi e dinamici. Le animazioni fluide guidano il tuo viaggio attraverso le pagine, rendendo ogni
                visita un&apos;esperienza nuova e appagante. Che tu stia scorrendo tra le novità o configurando il tuo
                acquisto ideale, la nostra piattaforma è progettata per essere intuitiva, coinvolgente e incredibilmente
                interattiva.
              </p>
            </div>
            <div
              className="col-7 col-md-5 col-lg-4 col-xl-3 my-2 my-md-0  mx-auto me-md-0 me-md-auto"
              data-aos="fade-left"
            >
              <HoloCardComponent isFocused={true} isHoloActive={isHoloActive} prodotto={prodotto} />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-center my-4">
            Le ultime <span className="secondary-color">uscite</span>
          </h3>

          <div className="row" data-aos="flip-right">
            {latestExp.map((exp, index) => (
              <div
                key={index}
                className="col-12 col-md-6 col-xl-3 cursor-pointer custom-exp"
                onClick={() => handleNavigate(exp.typeId, exp.name)}
              >
                <div className="mb-3 border-0 position-relative">
                  <img src={exp.imageUrl} className="card-img-top border-0 rounded-3" alt={exp.name} />
                  <div className="custom-overlay"></div>
                  <Button
                    className="position-absolute  btn-custom px-5 py-2 shadow rounded-pill"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    Scopri
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="my-4  mb-5" data-aos="fade-up">
          <h4 className="text-center mb-4">
            Seguici sui <span className="secondary-color">social</span> per{" "}
            <span className="secondary-color">rimanere aggiornato</span>
          </h4>
          <div className="text-center">
            <a href="https://www.instagram.com/packpeekers/" target="_blank">
              <img src={Instagram} alt="Instagram" className="img-fluid custom-social-icon" />
            </a>
            <a href="https://www.tiktok.com/@packpeekers?lang=it-IT" target="_blank">
              <img src={TikTok} alt="TikTok" className="img-fluid custom-social-icon" />
            </a>
            <a href="https://www.youtube.com/channel/UCXFr_AGdoD5tHsDB8Fzok_w" target="_blank">
              <img src={Youtube} alt="Youtube" className="img-fluid custom-social-icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContinuousCarousel;
