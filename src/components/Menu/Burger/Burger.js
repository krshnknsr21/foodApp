/* eslint-disable jsx-a11y/anchor-is-valid */
import classes from "./Burger.module.css";
import Card from "../Card.js";

export const burger = [
  {
    id: "B0",
    name: "Veg Junior",
    img: "https://burgerking-image.s3.amazonaws.com/products/PLP/web/2x_web_20201117120140472324_482x264jpg",
    desc: "veg patty burger,our best seller.",
    price: 109,
  },

  {
    id: "B1",
    name: "Classic Veg with Cheese",
    img: "https://burgerking-image.s3.amazonaws.com/products/PLP/web/2x_web_20210506145043080727_482x264jpg",
    desc: "Classic American cheese,Most loved one",
    price: 199,
  },

  {
    id: "B2",
    name: "Cheese Meltdown burger",
    img: "https://burgerking-image.s3.amazonaws.com/products/PLP/web/2x_web_20210623061414838081_482x264jpg",
    desc: "Cheesy with crispy patty",
    price: 399,
  },

  {
    id: "B3",
    name: "Veg Peri Peri",
    img: "https://burgerking-image.s3.amazonaws.com/products/PLP/web/2x_web_20210820040218595885_482x264jpg",
    desc: " Our limited time Burger with xxl buns,crunchy nachos,extra crunchy patty...",
    price: 309,
  },

  {
    id: "B4",
    name: "Paneer Overloaded Burger",
    img: "https://burgerking-image.s3.amazonaws.com/products/PLP/web/2x_web_20210414100434303733_482x264jpg",
    desc: "Crispy high in protein paneer Overloaded.",
    price: 299,
  },

  {
    id: "B5",
    name: "Veg Double Decker",
    img: "https://burgerking-image.s3.amazonaws.com/products/PLP/web/2x_web_20210104142326932850_482x264jpg",
    desc: "Our signature double veg patty..",
    price: 209,
  },
];

const Burger = () => {
  return (
    <>
      <div className={classes.menuCardContainer}>
        {burger.map((item) => {
          return <Card key={item.id} itemInfo={item} />;
        })}
      </div>
    </>
  );
};

export default Burger;
