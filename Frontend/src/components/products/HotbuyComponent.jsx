import { useRef } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";
import HoloCardComponent from "../products/HoloCardComponent";
import BG from "../../assets/img/hotbuy-bg.mp4";

// Installa i moduli necessari

const HotbuyComponent = () => {
  const { items } = useSelector((state) => state.product);
  const swiperRef = useRef(null);

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
        {items.map((prodotto, index) => (
          <SwiperSlide key={index} className="custom-swiper-slide ">
            <HoloCardComponent prodotto={prodotto} isHoloActive={true} isFocused={prodotto !== null} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HotbuyComponent;
