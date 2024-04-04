/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Card from "./Card";
import { motion } from "framer-motion";

const radius = 200; // Regola questo per il raggio del tuo carosello
const cardSize = { width: 200, height: 300 }; // Le dimensioni delle tue carte

const calculatePosition = (index, total, rotationOffset) => {
  const angle = (index / total) * 2 * Math.PI + rotationOffset; // Angolo circolare per la carta
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
};

const CardCarousel = ({ cards }) => {
  const [rotationOffset, setRotationOffset] = useState(0);

  useEffect(() => {
    const animateRotation = () => {
      setRotationOffset((prevOffset) => prevOffset + 0.001); // Velocità di rotazione
    };

    const id = setInterval(animateRotation, 16); // Circa 60 FPS
    return () => clearInterval(id);
  }, []);

  // Calcola gli indici delle carte frontali in base all'offset di rotazione
  const getFrontCards = (rotationOffset, total) => {
    const rotationFraction = rotationOffset / (2 * Math.PI);
    const cardsPerRotation = total / 1; // Numero di passi per completare una "fase" di rotazione
    const step = Math.floor(rotationFraction * cardsPerRotation) % total;
    return [(step + total) % total, (step + 1 + total) % total]; // Gestisce il wrapping
  };

  const frontCardIndices = getFrontCards(rotationOffset, cards.length);

  return (
    <div style={{ position: "relative", width: 2 * radius, height: 2 * radius, margin: "100px auto" }}>
      {cards.map((card, index) => {
        const position = calculatePosition(index, cards.length, rotationOffset);
        const isSelected = frontCardIndices.includes(index);

        return (
          <motion.div
            key={card.id}
            animate={{
              x: position.x,
              y: position.y,
              scale: isSelected ? 1 : 0.8,
              filter: isSelected ? "blur(0px)" : "blur(2px)", // Aumenta l'effetto di blur per le carte non selezionate
              opacity: isSelected ? 1 : 0.9, // Riduci l'opacità per le carte non selezionate
              zIndex: isSelected ? 1040 : 1000, // Mantiene lo z-index ma enfatizza la carta selezionata tramite altri mezzi
            }}
            transition={{
              duration: 0.5,
              scale: {
                duration: 1, // Durata più lunga per la transizione di scale per enfatizzare la fluidità
                ease: "easeOut",
              },
              filter: {
                duration: 1, // Transizione di blur fluida
                ease: "easeOut",
              },
              opacity: {
                duration: 2, // Transizione di opacità fluida
                ease: "easeOut",
              },
            }}
            style={{
              position: "absolute",
              width: cardSize.width,
              height: cardSize.height,
              top: "50%",
              left: "50%",
              marginRight: "-50%",
              transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`,
              willChange: "filter, transform, opacity",
            }}
          >
            <Card imageUrl={card.imageUrl} isSelected={isSelected} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default CardCarousel;
