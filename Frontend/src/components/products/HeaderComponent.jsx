import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import YGO from "../../assets/img/ygo.png";
import OP from "../../assets/img/op.png";
import DB from "../../assets/img/db.png";
import PKM from "../../assets/img/pkm.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeaderComponent = () => {
  const [selectedImage, setSelectedImage] = useState();
  const location = useLocation();

  const products = [
    { id: 1, mainImage: YGO, link: "/categories/1" },
    { id: 2, mainImage: OP, link: "/categories/2" },
    { id: 3, mainImage: DB, link: "/categories/3" },
    { id: 4, mainImage: PKM, link: "/categories/4" },
  ];

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const categoryId = pathSegments[pathSegments.length - 1];

    switch (categoryId) {
      case "1":
        setSelectedImage(YGO);
        break;
      case "2":
        setSelectedImage(OP);
        break;
      case "3":
        setSelectedImage(DB);
        break;
      case "4":
        setSelectedImage(PKM);
        break;
      default:
        setSelectedImage(YGO);
    }
  }, [location]);

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="my-2 mb-4 text-center position-relative">
      <motion.div
        key={selectedImage}
        className="position-relative"
        initial="hidden"
        animate="visible"
        variants={imageVariants}
      >
        <img src={selectedImage} className="img-fluid" alt="Selected" />
      </motion.div>
      <div className="d-flex justify-content-center position-absolute bottom-0 start-0 end-0">
        {products.map((product, index) => (
          <div
            className={`image-box ${index === 0 ? "rounded-start-3" : ""} ${
              index === products.length - 1 ? "rounded-end-3" : ""
            }`}
            key={product.id}
          >
            <Link to={product.link}>
              <img src={product.mainImage} className="hover-image" alt="Category" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeaderComponent;
