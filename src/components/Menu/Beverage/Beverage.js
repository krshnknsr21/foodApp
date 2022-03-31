/* eslint-disable jsx-a11y/anchor-is-valid */
import Card from "../Card.js";
import classes from "./Beverage.module.css";
import Pepsi from "./beverageImages/pepsi.jpg";
import Seven_Up from "./beverageImages/7up.jpg";
import Mirinda from "./beverageImages/mirinda.jpg";
import Mojito from "./beverageImages/mojito.jpg";
import Seven_Up_Krush_Lime from "./beverageImages/7upKrushLime.jpg";
import Iced_Tea from "./beverageImages/icedTea.jpg";

const beverages = [
  {
    id: "BE0",
    name: "Pepsi",
    img: Pepsi,
    desc: "500ml Cold-drink",
    price: 79,
  },

  {
    id: "BE1",
    name: "Seven Up",
    img: Seven_Up,
    desc: "500ml Cold-drink",
    price: 79,
  },

  {
    id: "BE2",
    name: "Mirinda",
    img: Mirinda,
    desc: "500ml Cold-drink",
    price: 79,
  },

  {
    id: "BE3",
    name: "Mojito",
    img: Mojito,
    desc: "A refreshing drink made of Lime juice, mint and sugar",
    price: 99,
  },

  {
    id: "BE4",
    name: "Seven Up Krush Lime",
    img: Seven_Up_Krush_Lime,
    desc: "A refreshing drink made of Lime juice,Seven up and sugar",
    price: 99,
  },

  {
    id: "BE5",
    name: "Iced Tea",
    img: Iced_Tea,
    desc: "Soft drink made with tea, sugar water and ice cubes",
    price: 129,
  },
];

const Beverage = () => {
  return (
    <>
      <div className={classes.menuCardContainer}>
        {beverages.map((item) => {
          return <Card key={item.id} itemInfo={item} />;
        })}
      </div>
    </>
  );
};

export default Beverage;
