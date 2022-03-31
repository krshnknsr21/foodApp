/* eslint-disable jsx-a11y/anchor-is-valid */
import Card from "../Card.js";

import classes from "./Sandwich.module.css";
import Veggie_Cheese_Sandwich from "./sandwichImages/veggieCheese.jpg";
import Loaded_Veggie_Sandwich from "./sandwichImages/loadedVeggie.jpg";
import Veg_Club_Sandwich from "./sandwichImages/clubVeg.jpg";
import Grilled_Paneer_Sandwich from "./sandwichImages/grilledPaneer.jpg";
import Chicken_Cheese_Sandwich from "./sandwichImages/chickenAndCheese.jpg";
import Chicken_Club_Sandwich from "./sandwichImages/clubChicken.jpg";

const sandwich = [
  {
    id: "S0",
    name: "Veggie Cheese Sandwich",
    img: Veggie_Cheese_Sandwich,
    desc: "The Cheese and Vegetable Sandwich is a snack with a timeless appeal. ",
    price: 149,
  },

  {
    id: "S1",
    name: "Loaded Veggie Sandwich",
    img: Loaded_Veggie_Sandwich,
    desc: "Fluffy whole grain bread stuffed with layers of thinly sliced fresh vegetables and jalapeno-cilantro hummus",
    price: 179,
  },

  {
    id: "S2",
    name: "Veg Club Sandwich",
    img: Veg_Club_Sandwich,
    desc: "Made in 3 layered of bread, various veggies, boiled potato slice, cheese slice, tomatoes, onions and chutney.",
    price: 199,
  },

  {
    id: "S3",
    name: "Grilled Paneer Sandwich",
    img: Grilled_Paneer_Sandwich,
    desc: "One of the most popular types of veg sandwiches because they need no fancy ingredients.",
    price: 199,
  },

  {
    id: "S4",
    name: "Chicken Cheese Sandwich",
    img: Chicken_Cheese_Sandwich,
    desc: "A cheesy melt in mouth sandwich with a delicious filling of shredded chicken",
    price: 189,
  },

  {
    id: "S5",
    name: "Chicken Club Sandwich",
    img: Chicken_Club_Sandwich,
    desc: "Scrumptious sandwiches with a generous helping of chicken slices, spreads, egg and veggies.",
    price: 249,
  },
];

const Pizza = () => {
  return (
    <>
      <div className={classes.menuCardContainer}>
        {sandwich.map((item) => {
          return <Card key={item.id} itemInfo={item} />;
        })}
      </div>
    </>
  );
};

export default Pizza;
