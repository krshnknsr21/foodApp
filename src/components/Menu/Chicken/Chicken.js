/* eslint-disable jsx-a11y/anchor-is-valid */
import Card from "../Card.js";

import classes from "./Chicken.module.css";
import Chicken_Drumstick from "./chickenImages/Chicken_Drumstick.jpg";
import Fried_Chicken from "./chickenImages/Fried_Chicken.jpg";
import Chicken_Nuggets from "./chickenImages/Chicken_Nuggets.jpg";
import Chicken_Wings from "./chickenImages/Chicken_Wings.jpg";
import Chicken_Popcorn from "./chickenImages/Chicken_Popcorn.jpg";
import Chicken_Stripes from "./chickenImages/Chicken_Stripes.jpg";

const chicken = [
  {
    id: "C0",
    name: "Chicken Nuggets",
    img: Chicken_Nuggets,
    desc: "Small pieces of deboned chicken meat that is breaded and battered, then deep-fried",
    price: 129,
  },

  {
    id: "C1",
    name: "Fried Chicken",
    img: Fried_Chicken,
    desc: "chicken pieces coated with seasoned batter and deep fried to get a crisp coating.",
    price: 149,
  },

  {
    id: "C2",
    name: "Chicken Drumstick",
    img: Chicken_Drumstick,
    desc: "Hot and spicy chicken drumsticks with homemade slaw on the side.",
    price: 179,
  },

  {
    id: "C3",
    name: "Chicken Wings",
    img: Chicken_Wings,
    desc: "Deep-fried chicken wings coated with a vinegar-and-cayenne-pepper hot sauce mixed with butter.",
    price: 199,
  },

  {
    id: "C4",
    name: "Chicken Popcorn",
    img: Chicken_Popcorn,
    desc: "Small, bite-sized pieces of chicken that have been breaded and fried.",
    price: 189,
  },

  {
    id: "C5",
    name: "Chicken Stripes",
    img: Chicken_Stripes,
    desc: "Chicken Stripes with Honey Mustard dipping sauce",
    price: 199,
  },
];

const Chicken = () => {
  return (
    <>
      <div className={classes.menuCardContainer}>
        {chicken.map((item) => {
          return <Card key={item.id} itemInfo={item} />;
        })}
      </div>
    </>
  );
};

export default Chicken;
