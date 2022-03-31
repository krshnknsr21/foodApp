/* eslint-disable jsx-a11y/anchor-is-valid */

import classes from "./Dessert.module.css";
import Choco_Mud_Pie from "./dessertImages/chocoMudPie.jpg";
import Coffee_Mousse_Cake from "./dessertImages/coffeeMousseCake.jpg";
import Hot_Caramel_Sundae from "./dessertImages/hotCaramelSundae.jpg";
import Hot_Fudge_Sundae from "./dessertImages/hotFudgeSundae.jpg";
import Oreo_Flurry from "./dessertImages/oreoFlurry.jpg";
import Vanilla_IceCream_Cone from "./dessertImages/vanillaIceCreamCone.jpg";

import Card from "../Card.js";

const dessert = [
  {
    id: "DE0",
    name: "Choco Mud Pie",
    img: Choco_Mud_Pie,
    desc: "Crust of chocolate cookie crumbs surrounding dark chocolate pudding topped off with whipped cream",
    price: 149,
  },

  {
    id: "DE1",
    name: "Coffee Mousse Cake",
    img: Coffee_Mousse_Cake,
    desc: "Chilled dessert made with sweetened and flavored whipped cream and gelatin chocolate mousse.",
    price: 169,
  },

  {
    id: "DE2",
    name: "Hot Caramel Sundae",
    img: Hot_Caramel_Sundae,
    desc: "Two big dips of vanilla ice cream covered in hot Caramel, sprinkled almonds and topped with  cream",
    price: 179,
  },

  {
    id: "DE3",
    name: "Hot Fudge Sundae",
    img: Hot_Fudge_Sundae,
    desc: "Vanilla ice cream, sprinkles, hot chocolate sauce, whipped cream, and nuts.",
    price: 189,
  },

  {
    id: "DE4",
    name: "Oreo Flurry",
    img: Oreo_Flurry,
    desc: "Creamy vanilla soft serve swirled together with crunchy Oreo cookies.",
    price: 189,
  },

  {
    id: "DE5",
    name: "Vanilla Cone",
    img: Vanilla_IceCream_Cone,
    desc: "Creamy vanilla soft serve With a Crispy Cone",
    price: 149,
  },
];

const Dessert = () => {
  return (
    <>
      <div className={classes.menuCardContainer}>
        {dessert.map((item) => {
          return <Card key={item.id} itemInfo={item} />;
        })}
      </div>
    </>
  );
};

export default Dessert;
