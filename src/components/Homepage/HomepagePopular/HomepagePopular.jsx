import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PopularCards from "./PopularCards.jsx";
import HomepagePopularCSS from "./HomepagePopular.module.css";

import Choco_Mud_Pie from "../../Menu/Dessert/dessertImages/chocoMudPie.jpg";
import Coffee_Mousse_Cake from "../../Menu/Dessert/dessertImages/coffeeMousseCake.jpg";
import Hot_Caramel_Sundae from "../../Menu/Dessert/dessertImages/hotCaramelSundae.jpg";
import Hot_Fudge_Sundae from "../../Menu/Dessert/dessertImages/hotFudgeSundae.jpg";
import Oreo_Flurry from "../../Menu/Dessert/dessertImages/oreoFlurry.jpg";
import Vanilla_IceCream_Cone from "../../Menu/Dessert/dessertImages/vanillaIceCreamCone.jpg";

const dessert = [
  {
    name: "Choco Mud Pie",
    img: Choco_Mud_Pie,
    desc: "veg patty burger,our best seller.",
    price: "₹199/-",
  },

  {
    name: "Coffee Mousse Cake",
    img: Coffee_Mousse_Cake,
    desc: "Classic American cheese,Most loved one",
    price: "₹269/-",
  },

  {
    name: "Hot Caramel Sundae",
    img: Hot_Caramel_Sundae,
    desc: "Cheesy with crispy patty",
    price: "₹349/-",
  },

  {
    name: "Hot Fudge Sundae",
    img: Hot_Fudge_Sundae,
    desc: " Our limited time Burger with xxl buns,crunchy nachos,extra crunchy patty...",
    price: "₹399/-",
  },

  {
    name: "Oreo Flurry",
    img: Oreo_Flurry,
    desc: "Crispy high in protein paneer Overloaded.",
    price: "₹559/-",
  },

  {
    name: "Vanilla IceCream Cone",
    img: Vanilla_IceCream_Cone,
    desc: "Our signature double veg patty..",
    price: "₹599/-",
  },
];

export default function PopularItems() {
  return (
    <div className={HomepagePopularCSS.popularItems}>
      <h2 className={HomepagePopularCSS.popularItemsTitle}>Popular Items</h2>
      <div className={HomepagePopularCSS.popularCardsList}>
        {dessert.map((item) => {
          return (
            <PopularCards
              img={item.img}
              name={item.name}
              desc={item.desc}
              price={item.price}
            />
          );
        })}
      </div>
    </div>
  );
}
