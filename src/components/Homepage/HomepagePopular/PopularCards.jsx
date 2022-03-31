import { Link } from "react-router-dom";
import PopularCardsCSS from "./PopularCards.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "bootstrap";

function PopularCards(props) {
  return (
    <div className={PopularCardsCSS.popular_card}>
      <div className={PopularCardsCSS.popular_card_img}>
        <img src={props.img} alt="Burger" />
      </div>
      <Link to="/menu/desserts">
        <button href="#" className={PopularCardsCSS.popular_card_btn}>
          <ShoppingCartIcon sx={{ fontSize: 30 }} />
        </button>
      </Link>
      <div className={PopularCardsCSS.popular_card_body}>
        <div className={PopularCardsCSS.food_detail}>
          <h4>{props.name}</h4>
          <p>{props.desc}</p>
        </div>
        <div className={PopularCardsCSS.food_price}>{props.price}</div>
      </div>
    </div>
  );
}

export default PopularCards;
