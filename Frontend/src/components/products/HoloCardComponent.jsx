import { useEffect, useRef } from "react";

// eslint-disable-next-line react/prop-types
//imageUrl = require
const HoloCardComponent = () => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const handleMouseMove = (e) => {
      const boundingBox = card.getBoundingClientRect();
      const mouseX = e.clientX - boundingBox.left;
      const mouseY = e.clientY - boundingBox.top;
      const xPercent = (mouseX / boundingBox.width) * 100;
      const yPercent = (mouseY / boundingBox.height) * 100;
      const oppositeXPercent = 100 - xPercent;
      const oppositeYPercent = 100 - yPercent;
      card.style.setProperty("--x-percent", `${oppositeXPercent}%`);
      card.style.setProperty("--y-percent", `${oppositeYPercent}%`);
      const gradientSize = 150 + (mouseX / boundingBox.width + mouseY / boundingBox.height) * 50;
      card.style.setProperty("--gradient-size", `${gradientSize}%`);
      const dx = (mouseX - boundingBox.width / 2) / (boundingBox.width / 2);
      const dy = (mouseY - boundingBox.height / 2) / (boundingBox.height / 2);
      const rotateX = dy * 20;
      const rotateY = -dx * 20;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    const handleMouseLeave = () => {
      card.style.transform = "rotateX(0) rotateY(0)";
      card.style.setProperty("--x-percent", "50%");
      card.style.setProperty("--y-percent", "50%");
      card.style.setProperty("--gradient-size", "200%");
      card.style.transition = "transform 1s ease, box-shadow 1s ease, --x-percent 1s ease, --y-percent 1s ease";
    };
    const handleMouseEnter = () => {
      card.style.transition = "transform 0.05s ease";
    };
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    card.addEventListener("mouseenter", handleMouseEnter);
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      card.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  //   return <div ref={cardRef} className="holo-card" style={{ backgroundImage: `url(${imageUrl})` }}></div>;
  return (
    <div
      ref={cardRef}
      className="holo-card"
      style={{
        backgroundImage: `url("https://www.cardtrader.com/uploads/blueprints/image/260846/show_sanji-alternate-art-kingdoms-of-intrigue.jpg")`,
      }}
    ></div>
  );
};

export default HoloCardComponent;
