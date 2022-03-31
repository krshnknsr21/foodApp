import React from "react";
import burger from "./HomepageMenuImages/burger.jpg";
import pizza from "./HomepageMenuImages/pizza.jpg";
import bevarage from "./HomepageMenuImages/beverage.jpg";
import dessert from "./HomepageMenuImages/dessert.jpg";
import chicken from "./HomepageMenuImages/chicken.jpg";
import sandwhich from "./HomepageMenuImages/sandwich.jpg";
import MenuCSS from "./HomepageMenu.module.css";

import { Link } from "react-router-dom";

const menu = [
  {
    src: burger,
    caption: "Burgers",
    goToLink: "/menu/burger",
    numm: 0,
  },
  {
    src: pizza,
    caption: "Pizza",
    goToLink: "/menu/pizza",
    numm: 1,
  },
  {
    src: chicken,
    caption: "Chicken",
    goToLink: "/menu/chicken",
    numm: 2,
  },
  {
    src: sandwhich,
    caption: "Sandwhich",
    goToLink: "/menu/sandwich",
    numm: 3,
  },
  { src: dessert, caption: "Desserts", goToLink: "/menu/desserts", numm: 4 },
  {
    src: bevarage,
    caption: "Beverages",
    goToLink: "/menu/beverage",
    numm: 5,
  },
];

const Menu = () => {
  return (
    <>
      <div className={MenuCSS.homepageMenu_container}>
        <h2 className={MenuCSS.homeheader_h2}>MENU</h2>
        <div className={MenuCSS.homecards_list}>
          {menu.map((item) => {
            return (
              <div className={MenuCSS.homecard}>
                <Link to={item.goToLink} exec={item.numm}>
                  <img
                    className={MenuCSS.homecard_image}
                    src={item.src}
                    alt={item.caption}
                  />
                </Link>
                <div className={MenuCSS.homecard_title}>
                  <p>{item.caption}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Menu;
