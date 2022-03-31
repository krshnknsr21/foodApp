// import { useEffect } from "react";
import HomePageCSS from "./Homepage.module.css";
import HomepageMenu from "./HomepageMenu/HomepageMenu.jsx";
import Carousel from "./HomepageCarousel/HomepageCarousel.jsx";
import Popular from "./HomepagePopular/HomepagePopular.jsx";
import Safety from "../Safety/Safety.js";

function Homepage() {
  return (
    <div className={HomePageCSS.homePage}>
      <Carousel />
      <Popular className={HomePageCSS.popularItems} />
      <HomepageMenu className={HomePageCSS.menuItems} />
      <Safety />
    </div>
  );
}

export default Homepage;
