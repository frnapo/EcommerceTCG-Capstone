import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";
import HoloCardComponent from "../products/HoloCardComponent";
import BG from "../../assets/img/Comp_8.mp4";
import { Button } from "react-bootstrap";
import CartManager from "../cart/CartManager";
import toast from "react-hot-toast";
import ITflag from "../../assets/img/ITflag.png";
import ENGflag from "../../assets/img/ENGflag.png";
import JPflag from "../../assets/img/JPflag.png";

const HotbuyComponent = () => {
  const swiperRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [hotbuy, setHotbuy] = useState([]);

  const handleAddToCart = (product) => {
    if (product) {
      const wasAdded = CartManager.addToCart(product, 1);

      if (wasAdded) {
        toast.success(`Aggiunto ${product.name}, Quantità: 1 al carrello.`);
      } else {
        toast.error(`Non puoi aggiungere più di ${product.availableQuantity} unità di ${product.name} al carrello.`);
      }
    } else {
      toast.error("Nessun prodotto selezionato.");
    }
  };

  function getFlag(language) {
    switch (language) {
      case "Italiano":
        return ITflag;
      case "English":
        return ENGflag;
      case "Japanese":
        return JPflag;
      default:
        return "";
    }
  }

  useEffect(() => {
    fetchHotbuy();
  }, []);

  const fetchHotbuy = async () => {
    try {
      const response = await fetch(`https://localhost:7289/api/Products/hotbuy`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setHotbuy(data);
      if (data.length > 0) {
        setSelectedProduct(data[0]);
      }
    } catch (error) {
      console.error("Failed to fetch hotbuy products:", error);
    }
  };

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.update();
    }
  }, [hotbuy]);

  const handleSlideChange = (swiper) => {
    const index = swiper.activeIndex;
    setSelectedProduct(hotbuy[index]);
  };
  return (
    <>
      <div className="swiper-container  position-relative shadow">
        <div className="hotbuy-video-container">
          <video autoPlay loop muted className="hotbuy-video">
            <source src={BG} type="video/mp4" />
          </video>
        </div>
        <Swiper
          onSlideChange={handleSlideChange}
          modules={[Navigation, EffectCoverflow]}
          ref={swiperRef}
          navigation
          effect="coverflow"
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: false,
          }}
          spaceBetween={-200}
          slideActiveClass="swiper-slide-active-custom"
        >
          {hotbuy.map((prodotto, index) => (
            <SwiperSlide key={index} className="custom-swiper-slide ">
              <HoloCardComponent prodotto={prodotto} isHoloActive={false} isFocused={prodotto !== null} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="container px-4">
        {selectedProduct && (
          <div className="row mt-3 mb-4 text-center bg-blue p-4 rounded-4">
            <div className="col-12 ">
              <h3 className="mb-0 pb-0 fs-1">{selectedProduct.name}</h3>
              <p className="m-0 p-0 text-secondary fw-light ms-1">{selectedProduct.expansion}</p>
              <h3 className="mb-0 pb-0 fs-2">{selectedProduct.type}</h3>
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="rounded-1"
                  src={getFlag(selectedProduct.language)}
                  alt={`${selectedProduct.language} flag`}
                  style={{ width: "30px", height: "20px", marginRight: "5px" }}
                />
                <p className="my-1 fw-light">{selectedProduct.condition}</p>
              </div>
              <span className="badge badge-rarity">
                {selectedProduct.rarity} - {selectedProduct.serialNumber}
              </span>
              <p className="fw-light mb-0">
                Quantità disponibile{" "}
                <span className="fs-4 fw-bold secondary-color">{selectedProduct.availableQuantity}</span>
              </p>
              <p className="m-0 p-0">
                <span className="fs-3 secondary-color">€{selectedProduct.price.toFixed(2)}</span>
              </p>
              <Button
                className={`px-5 py-2  ${selectedProduct.availableQuantity > 0 ? "btn-custom" : "btn-secondary"}`}
                disabled={selectedProduct.availableQuantity < 1}
                onClick={() => handleAddToCart(selectedProduct)}
              >
                {selectedProduct.availableQuantity > 0 ? "Carrello" : "Non disponibile"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HotbuyComponent;
