/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import Lottie from "react-lottie-player";
import animationData from "./heart-icon.json";

const HeartAddIcon = ({ isWishlistItem, triggerAnimation }) => {
  const lottieRef = useRef(null);

  useEffect(() => {
    const handleAnimation = () => {
      if (isWishlistItem && lottieRef.current.currentFrame !== lottieRef.current.totalFrames) {
        lottieRef.current.setDirection(1);
        lottieRef.current.play();
      } else if (!isWishlistItem && lottieRef.current.currentFrame !== 0) {
        lottieRef.current.setDirection(-1);
        lottieRef.current.play();
      }
    };

    if (lottieRef.current) {
      handleAnimation();
    }
  }, [isWishlistItem, triggerAnimation]);

  return (
    <Lottie
      ref={lottieRef}
      animationData={animationData}
      style={{ width: 45, height: 45 }}
      loop={false}
      autoplay={false}
    />
  );
};

export default HeartAddIcon;
