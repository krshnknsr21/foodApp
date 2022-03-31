import { useState } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import HomepageCarouselCSS from "./HomepageCarousel.module.css";
import Pizza1 from "./HomepageCarouselImages/carousel_pizza1.jpg";
import Pizza2 from "./HomepageCarouselImages/carousel_pizza2.jpg";
import Burger from "./HomepageCarouselImages/carousel_burger.jpg";
import Desserts from "./HomepageCarouselImages/carousel__dessert.jpg";
import Drinks from "./HomepageCarouselImages/carousel_drinks.jpg";

const CarouselObject = [
  { image: Burger, caption: "Burger" },
  { image: Pizza1, caption: "Pizza" },
  { image: Pizza2, caption: "Pizza" },
  { image: Desserts, caption: "Desserts" },
  { image: Drinks, caption: "Drinks" },
];

function HomepageCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className={HomepageCarouselCSS.carousel}>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        className="carouselMain"
      >
        {CarouselObject.map((images) => {
          return (
            <Carousel.Item>
              <img
                className={HomepageCarouselCSS.carouselImage}
                src={images.image}
                alt={images.caption}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}

export default HomepageCarousel;
