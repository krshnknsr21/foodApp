import { useState } from "react";
import { Route, Link, BrowserRouter } from "react-router-dom";
import { Tab, Tabs } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import { useAuth } from "../../contexts/AuthContext";

import React from "react";
import Burger from "./Burger/Burger.js";
import Pizza from "./Pizza/Pizza.js";
import Chicken from "./Chicken/Chicken.js";
import Sandwich from "./Sandwiches/Sandwich.js";
import Desserts from "./Dessert/Dessert.js";
import Beverage from "./Beverage/Beverage.js";
import MenuCSS from "./Menu.module.css";

const links = [
  { index: 0, toURL: "/menu/burger", text: "Burgers", components: Burger },
  { index: 1, toURL: "/menu/pizza", text: "Pizza", component: Pizza },
  { index: 2, toURL: "/menu/chicken", text: "Chicken", component: Chicken },
  { index: 3, toURL: "/menu/sandwich", text: "Sandwhich", component: Sandwich },
  { index: 4, toURL: "/menu/desserts", text: "Desserts", component: Desserts },
  { index: 5, toURL: "/menu/beverage", text: "Beverages", component: Beverage },
];

const Menu = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { page } = params;

  const tabNameToIndex = {
    0: "burger",
    1: "pizza",
    2: "chicken",
    3: "sandwich",
    4: "desserts",
    5: "beverage",
  };

  const indexToTabName = {
    burger: 0,
    pizza: 1,
    chicken: 2,
    sandwich: 3,
    desserts: 4,
    beverage: 5,
  };

  const [index, onChangeIndex] = useState(indexToTabName[page]);

  const handleChange = (event, value) => {
    history.push(`/menu/${tabNameToIndex[value]}`);
    onChangeIndex(value);
  };

  const handleChangeIndex = (index) => {
    onChangeIndex(index);
  };

  return (
    <div className={MenuCSS.menuContainer}>
      <BrowserRouter>
        <Tabs
          className={MenuCSS.menuNavbar}
          value={index}
          onChange={handleChange}
          centered
        >
          {links.map((tab) => {
            return (
              <Tab
                className={
                  index === tab.index ? MenuCSS.selectedTab : MenuCSS.menuTab
                }
                label={tab.text}
                component={Link}
                to={tab.toURL}
              />
            );
          })}
        </Tabs>

        <SwipeableViews
          className={MenuCSS.menuItemView}
          index={index}
          onChangeIndex={handleChangeIndex}
        >
          <Route exact path="/menu/burger" component={Burger} />
          <Route exact path="/menu/pizza" component={Pizza} />
          <Route exact path="/menu/chicken" component={Chicken} />
          <Route exact path="/menu/sandwich" component={Sandwich} />
          <Route exact path="/menu/desserts" component={Desserts} />
          <Route exact path="/menu/beverage" component={Beverage} />
        </SwipeableViews>
      </BrowserRouter>
    </div>
  );
};

export default Menu;
