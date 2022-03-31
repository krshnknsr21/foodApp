import MenuCardCSS from "./Card.module.css";
import AddIcon from "@mui/icons-material/Add";

const CardUI = ({ itemInfo }) => {
  return (
    <div className={MenuCardCSS.menuCard}>
      <div className={MenuCardCSS.menuCardImgBody}>
        <img
          className={MenuCardCSS.menuCardImg}
          src={itemInfo.img}
          alt="tripple decker"
        />
      </div>
      <div className={MenuCardCSS.menuCardBody}>
        <h3 className={MenuCardCSS.menuCardTitle}>{itemInfo.name}</h3>
        <p className={MenuCardCSS.menuCardDescription}>{itemInfo.desc}</p>
        <p className={MenuCardCSS.menuCardPrice}>Price: ₹{itemInfo.price}</p>
        <button
          className={MenuCardCSS.menuAddToCartBtn}
          onClick={() => {
            // updateCartItems();
          }}
        >
          Add <AddIcon sx={{ fontSize: 20 }} />
        </button>
      </div>
    </div>
  );
};

export default CardUI;
