import { useRef } from "react";
import Lottie from "react-lottie-player";
import animationData from "./chat-icon.json";

// eslint-disable-next-line react/prop-types
const ChatIcon = () => {
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
    <div
      className="cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "fixed",
        bottom: "15px",
        right: "15px",
        zIndex: 1000,
      }}
    >
      <Lottie
        ref={lottieRef}
        animationData={animationData}
        style={{ width: 60, height: 60, transform: "scale(-1, -1)" }}
        loop={false}
        autoPlay={false}
      />
    </div>
  );
};

export default ChatIcon;
