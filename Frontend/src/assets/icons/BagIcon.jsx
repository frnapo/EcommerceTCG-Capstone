import { useState, useRef } from "react";
import Lottie from "react-lottie-player";
import animationData from "./bag-icon.json";

const BagIcon = () => {
  const lottieRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    if (!isHovering) {
      lottieRef.current.setDirection(1);
      lottieRef.current.goToAndPlay(0, true);
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    if (isHovering) {
      lottieRef.current.setDirection(-1);
      lottieRef.current.play();
      setIsHovering(false);
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

export default BagIcon;
