import { useEffect, useRef } from "react";

// eslint-disable-next-line react/prop-types
//imageUrl = require

// eslint-disable-next-line react/prop-types
const HoloCardComponent = ({ isHoloActive }) => {
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
      const rotateX = dy * 22;
      const rotateY = -dx * 22;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    const handleMouseLeave = () => {
      card.style.transform = "rotateX(0) rotateY(0)";
      card.style.setProperty("--x-percent", "50%");
      card.style.setProperty("--y-percent", "50%");
      card.style.setProperty("--gradient-size", "200%");
      card.style.setProperty("scale", "1");
      card.style.transition =
        "scale 0.2s ease, transform 0.4s ease, box-shadow 0.4s ease, --x-percent 0.4s ease, --y-percent 0.4s ease";
    };
    const handleMouseEnter = () => {
      card.style.setProperty("scale", "1.06");
      card.style.transition = "transform 0.08s ease, scale 0.2s ease";
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
      className={` ${isHoloActive ? "holo-active holo-card" : "basic-card basic-active"}`}
      style={{
        backgroundImage: `url("https://www.cardtrader.com/uploads/blueprints/image/153134/show_charizard-vmax-rare-shiny-sv107-shining-fates.png")`,
      }}
    ></div>
  );
};

export default HoloCardComponent;
