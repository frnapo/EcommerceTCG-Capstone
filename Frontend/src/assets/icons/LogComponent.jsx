import { useRef } from "react";
import Lottie from "react-lottie-player";
import animationData from "./avatar-icon.json";

// eslint-disable-next-line react/prop-types
const LogIcon = ({ text }) => {
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
    <div className="d-flex align-items-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <h2 className="m-0 me-2 fs-2 text-decoration-none">{text}</h2>
      <Lottie
        ref={lottieRef}
        animationData={animationData}
        style={{ width: 50, height: 50 }}
        loop={false}
        autoPlay={false}
      />
    </div>
  );
};

export default LogIcon;
