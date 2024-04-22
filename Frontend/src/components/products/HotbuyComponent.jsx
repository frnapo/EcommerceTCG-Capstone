import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";
import HoloCardComponent from "../products/HoloCardComponent";
import BG from "../../assets/img/hotbuy-bg.mp4";

const HotbuyComponent = () => {
  const swiperRef = useRef(null);

  const [hotbuy, setHotbuy] = useState([]);

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
    } catch (error) {
      console.error("Failed to fetch hotbuy products:", error);
    }
  };
  return (
    <div className="swiper-container position-relative">
      <div className="hotbuy-video-container">
        <video autoPlay loop muted className="hotbuy-video">
          <source src={BG} type="video/mp4" />
        </video>
      </div>
      <Swiper
        modules={[Navigation, EffectCoverflow]}
        ref={swiperRef}
        navigation
        effect="coverflow"
        centeredSlides={true}
        // loop={true}
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
  );
};

export default HotbuyComponent;
