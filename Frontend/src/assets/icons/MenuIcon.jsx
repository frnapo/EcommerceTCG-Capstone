import { useRef } from "react";
import Lottie from "react-lottie-player";
import animationData from "./menu-icon.json";

// eslint-disable-next-line react/prop-types
const MenuIcon = () => {
  const lottieRef = useRef(null);
  const animationPlayed = useRef(false);

  const handleMouseEnter = () => {
    if (!animationPlayed.current) {
      lottieRef.current.play();
      animationPlayed.current = true;
    }
  };

  const handleMouseLeave = () => {
    if (animationPlayed.current) {
      setTimeout(() => {
        if (lottieRef.current) {
          lottieRef.current.stop();
          lottieRef.current.goToAndStop(0, true);
          animationPlayed.current = false;
        }
      }, 900);
    }
  };

  return (
    <div className="d-flex" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Lottie
        ref={lottieRef}
        animationData={animationData}
        style={{ width: 45, height: 45 }}
        loop={false}
        autoplay={false}
      />
    </div>
  );
};

export default MenuIcon;
