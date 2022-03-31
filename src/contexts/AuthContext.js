import React, {
  useContext,
  useState,
  useEffect,
  useReducer,
  useRef,
  useCallback,
} from "react";
import { auth } from "../firebase";
import { db } from "../firebase";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { MenuData } from "./MenuData";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "Login",
    num: 0,
    address: "",
    cartItems: [],
    cartCount: 0,
    totalPrice: 0,
    taxPrice: 0,
  });
  const [orderDetails, setOrderDetails] = useState({});
  const [pizzaMenu, setPizzaMenu] = useState({});
  const [burgerMenu, setBurgerMenu] = useState({});
  const [beverageMenu, setBeverageMenu] = useState({});
  const [dessertMenu, setDessertMenu] = useState({});
  const [sandwichMenu, setSandwichMenu] = useState({});
  const [chickenMenu, setChickenMenu] = useState({});
  const [totalBillPrice, setTotalBillPrice] = useState(0);
  const tax = 0.18;
  const ACTIONS = {
    INCREASE_ITEM_QUANTITY: "increaseItemQuantitybyOne",
    DECREASE_ITEM_QUANTITY: "decreaseItemQuantitybyOne",
    DELETE_ITEM: "deleteItem",
    RESET_CART: "resetCart",
    SET_CART_ITEMS: "setCartItems",
  };

  const useEnhancedReducer = (reducer, initState, initializer) => {
    const lastState = useRef(initState);
    const getState = useCallback(() => lastState.current, []);
    return [
      ...useReducer(
        (state, action) => (lastState.current = reducer(state, action)),
        initState,
        initializer
      ),
      getState,
    ];
  };

  useEffect(() => {
    const getPreviousOrder = async () => {
      try {
        const getData = await getDoc(
          doc(db, "order", userDetails.previousOrderID)
        );
        if (getData.exists()) {
          setOrderDetails(getData.data());
          console.log("Order Details:", getData.data());
        } else {
          setOrderDetails({
            orderID: "Error while fetching previous order details",
          });
        }
      } catch {
        setOrderDetails({ orderID: "No previous order !!" });
      }
    };
    return getPreviousOrder;
  }, [userDetails.previousOrderID, toggle]);

  const [state, dispatch, getState] = useEnhancedReducer(reducer, {
    cartItems: [],
    cartCount: 0,
    totalPrice: 0,
    taxPrice: 0,
  });

  // const [state, dispatch, getState] = useEnhancedReducer(reducer, {
  //   cartItems: userDetails.cartItems,
  //   cartCount: userDetails.cartCount,
  //   totalPrice: userDetails.totalPrice,
  //   taxPrice: userDetails.taxPrice,
  // });

  // const updateCartItems = async () => {
  //   if (currentUser) {
  //     const userDoc = doc(db, "users", currentUser.uid);

  //     try {
  //       const updatedFields = {
  //         cartItems: getState().cartItems,
  //         cartCount: Number(getState().cartCount),
  //         totalPrice: Number(getState().totalPrice),
  //         taxPrice: Number(getState().taxPrice.toFixed(2)),
  //       };
  //       await updateDoc(userDoc, updatedFields);
  //       console.log("Updated Cart");
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  // };

  const switchToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const updateCartItems = async () => {
      if (currentUser) {
        const userDoc = doc(db, "users", currentUser.uid);

        try {
          const updatedFields = {
            cartItems: getState().cartItems,
            cartCount: Number(getState().cartCount),
            totalPrice: Number(getState().totalPrice),
            taxPrice: Number(getState().taxPrice.toFixed(2)),
          };
          await updateDoc(userDoc, updatedFields);
          console.log("Updated Cart");
        } catch (e) {
          console.error(e);
        }
      }
    };
    return updateCartItems;
  }, [state.cartItems, state.cartCount, currentUser, getState]);

  function reducer(state, action) {
    switch (action.type) {
      case ACTIONS.INCREASE_ITEM_QUANTITY: {
        let item;
        item = state.cartItems.find(
          (cartItem) => cartItem.id === action.payload.id
        );
        let updatedCart;
        if (item) {
          //Check whther item exits or not
          updatedCart = state.cartItems.map((cartItem) => {
            if (item.id === cartItem.id) {
              return {
                ...item,
                quantity: item.quantity + 1,
                billPrice: item.billPrice + item.price,
              }; //Increase the quntity by 1
            } else {
              return cartItem;
            }
          });
        } else {
          //Add the item to the cart
          item = MenuData.find((cartItem) => cartItem.id === action.payload.id);
          updatedCart = [
            ...state.cartItems,
            { ...item, quantity: 1, billPrice: item.price },
          ];
        }
        return {
          cartItems: updatedCart,
          cartCount: state.cartCount + 1,
          totalPrice: state.totalPrice + item.price,
          taxPrice: state.taxPrice + item.price * tax,
        };
      }

      case ACTIONS.DECREASE_ITEM_QUANTITY: {
        let item = state.cartItems.find(
          (cartItem) => cartItem.id === action.payload.id
        );
        if (item.quantity > 1) {
          // If there is more than 1 item in the cart
          return {
            cartItems: state.cartItems.map((cartItem) => {
              if (item.id === cartItem.id && item.quantity > 1) {
                return {
                  ...item,
                  quantity: item.quantity - 1,
                  billPrice: item.billPrice - item.price,
                }; //Decrease the quntity by 1
              } else {
                return cartItem;
              }
            }),
            cartCount: state.cartCount - 1,
            totalPrice: state.totalPrice - item.price,
            taxPrice: state.taxPrice - item.price * tax,
          };
        } else {
          // If there is only 1 item in the cart
          return state;
        }
      }

      case ACTIONS.DELETE_ITEM: {
        let item = state.cartItems.find(
          (cartItem) => cartItem.id === action.payload.id
        );
        return {
          cartItems: state.cartItems.filter(
            (cartItem) => cartItem.id !== action.payload.id
          ),
          cartCount: state.cartCount - item.quantity,
          totalPrice: state.totalPrice - item.billPrice,
          taxPrice: state.taxPrice - item.billPrice * tax,
        };
      }

      // case ACTIONS.SET_CART_ITEMS: {
      //   return {
      //     cartItems: userDetails.cartItems,
      //     cartCount: userDetails.cartCount,
      //     totalPrice: userDetails.totalPrice,
      //     taxPrice: userDetails.taxPrice,
      //   };
      // }

      case ACTIONS.RESET_CART: {
        console.log("Reset Cart");
        return { cartItems: [], cartCount: 0, totalPrice: 0, taxPrice: 0 };
      }

      default:
        return state;
    }
  }

  function setBillPrice(price) {
    setTotalBillPrice(price);
  }

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    setUserDetails({});
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  async function getUserDetails() {
    if (currentUser) {
      const getData = await getDoc(doc(db, "users", currentUser.uid));
      if (getData.exists()) {
        setUserDetails(getData.data());
        // if (userDetails.cartItems === undefined) {
        //   setUserDetails((userDetails.cartItems = []));
        // }
        console.log("Document data:", getData.data());
      }
    } else {
      console.log("No such document!");
    }
  }

  // useEffect(() => {
  //   const getUserDetails = async () => {
  //     if (currentUser) {
  //       const getData = await getDoc(doc(db, "users", currentUser.uid));
  //       if (getData.exists()) {
  //         setUserDetails(getData.data());
  //         console.log("Document data:", getData.data());
  //       }
  //     } else {
  //       console.log("No such document!");
  //     }
  //   };
  //   return getUserDetails();
  // }, [currentUser]);

  async function getMenuItems() {
    const getPizzaMenu = await getDoc(doc(db, "menu", "Pizza"));
    const getBurgerMenu = await getDoc(doc(db, "menu", "Burger"));
    const getSandwichMenu = await getDoc(doc(db, "menu", "Sandwich"));
    const getChickenMenu = await getDoc(doc(db, "menu", "Chicken"));
    const getDessertMenu = await getDoc(doc(db, "menu", "Dessert"));
    const getBeverageMenu = await getDoc(doc(db, "menu", "Beverage"));

    setPizzaMenu(getPizzaMenu.data());
    console.log(pizzaMenu);

    setBurgerMenu(getBurgerMenu.data());
    console.log(burgerMenu);

    setSandwichMenu(getSandwichMenu.data());
    console.log(sandwichMenu);

    setChickenMenu(getChickenMenu.data());
    console.log(chickenMenu);

    setDessertMenu(getDessertMenu.data());
    console.log(dessertMenu);

    setBeverageMenu(getBeverageMenu.data());
    console.log(beverageMenu);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("User Changed");
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userDetails,
    pizzaMenu,
    burgerMenu,
    beverageMenu,
    dessertMenu,
    sandwichMenu,
    chickenMenu,
    state,
    totalBillPrice,
    ACTIONS,
    dispatch,
    orderDetails,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    getUserDetails,
    getMenuItems,
    setBillPrice,
    switchToggle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
