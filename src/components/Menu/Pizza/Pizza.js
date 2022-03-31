/* eslint-disable jsx-a11y/anchor-is-valid */
import Card from "../Card.js";

import classes from "./Pizza.module.css";
import Margherita_Pizza from "./pizzaImages/margherita.jpg";
import Veggie_Pizza from "./pizzaImages/veggie.jpg";
import Paneer_Pizza from "./pizzaImages/paneer.jpg";
import Mexican_Pizza from "./pizzaImages/mexican.jpg";
import BBQ_Chicken_Pizza from "./pizzaImages/bbqchicken.jpg";
import Tandoori_Chicken_Pizza from "./pizzaImages/tandoori.jpg";

const pizza = [
  {
    id: "P0",
    name: "Margherita Pizza",
    img: Margherita_Pizza,
    desc: "Flavorful Pizza made with tomato sauce, melty mozzarella cheese and fresh basil.",
    price: 199,
  },

  {
    id: "P1",
    name: "Veggie Pizza",
    img: Veggie_Pizza,
    desc: "Whole Wheat Veggie Pizza with classic American cheese",
    price: 199,
  },

  {
    id: "P2",
    name: "Paneer Pizza",
    img: Paneer_Pizza,
    desc: "Pizza loaded with Chunky Paneer, Crisp Capsicum and Spicy Red Pepper.",
    price: 249,
  },

  {
    id: "P3",
    name: "Mexican Pizza",
    img: Mexican_Pizza,
    desc: "Pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes and jalapenos and Mexican herbs.",
    price: 229,
  },

  {
    id: "P4",
    name: "BBQ Chicken Pizza",
    img: BBQ_Chicken_Pizza,
    desc: "Topped with Pepper Barbecue Chicken and goodness of gooey cheese.",
    price: 249,
  },

  {
    id: "P5",
    name: "Tandoori Chicken Pizza",
    img: Tandoori_Chicken_Pizza,
    desc: "Tandoori chicken pizza topped with onions, bell peppers, jalapenos, cilantro and mozzarella cheese.",
    price: 279,
  },
];

const Pizza = () => {
  return (
    <>
      <div className={classes.menuCardContainer}>
        {pizza.map((item) => {
          return <Card key={item.id} itemInfo={item} />;
        })}
      </div>
    </>
  );
};

export default Pizza;
