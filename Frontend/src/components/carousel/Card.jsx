/* eslint-disable no-constant-condition */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const Card = ({ imageUrl }) => {
  const controls = useAnimation();
  const constraintsRef = useRef(null);

  useEffect(() => {
    const animate3D = async () => {
      while (true) {
        const rotateYStart = Math.random() * 20 - 10;
        const rotateXStart = Math.random() * 20 - 10;
        const rotateZStart = Math.random() * 10 - 5;

        const rotateYEnd = Math.random() * 20 - 10;
        const rotateXEnd = Math.random() * 20 - 10;
        const rotateZEnd = Math.random() * 10 - 5;

        const scaleStart = 1.02;
        const scaleEnd = 0.98;
        const duration = Math.random() * 4 + 2;

        await controls.start({
          rotateY: [0, rotateYStart, rotateYEnd, 0],
          rotateX: [0, rotateXStart, rotateXEnd, 0],
          rotateZ: [0, rotateZStart, rotateZEnd, 0],
          scale: [1, scaleStart, scaleEnd, 1],
          transition: { duration, ease: "easeInOut" },
        });
      }
    };

    animate3D();

    return () => controls.stop();
  }, [controls]);

  return (
    <motion.div ref={constraintsRef}>
      <motion.div
        drag
        dragElastic={0.35}
        dragConstraints={constraintsRef}
        dragTransition={{ bounceDamping: 14 }}
        animate={controls}
        style={{
          width: "100%",
          height: "300px",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${imageUrl})`,
          transformStyle: "preserve-3d",
          perspective: "1500px",
          filter: "drop-shadow(0px 10px 10px rgba(0,0,0,0.5))",
        }}
      />
    </motion.div>
  );
};

export default Card;
