import React, { useState, useEffect } from "react";
import NavbarCSS from "./Navbar.module.css";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import { useAuth } from "../../contexts/AuthContext";
import styled from "styled-components";

const links = [
  { toURL: "/", text: "Home" },
  { toURL: "/menu/burger", text: "Menu" },
];

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

const StyledBurger = styled.button`
  top: 5%;
  right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  margin: 1rem;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ open }) => (open ? "#0D0C1D" : "#EFFFFA")};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

const Burger = ({ open, setOpen }) => {
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};
const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #effffa;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-350%)")};
  text-align: left;
  padding: 2rem;
  height: 100vh;
  position: absolute;
  top: 4rem;
  right: 0;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 576px) {
    width: 100%;
  }

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: #0d0c1d;
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: 576px) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: #343078;
    }
  }
`;

function Navbar() {
  // const { currentUser, userDetails, state } = useAuth();
  const [open, setOpen] = useState(false);
  const { width } = useWindowDimensions();

  const Menu = ({ open }) => {
    return (
      <StyledMenu open={open}>
        {links.map((linkItem) => {
          return (
            <Link
              key={linkItem.text}
              className={NavbarCSS.link_Top}
              to={linkItem.toURL}
              onClick={() => setOpen(!open)}
            >
              {linkItem.text}
              <span className={NavbarCSS.underStyle}></span>
            </Link>
          );
        })}
        <Link
          to="/branch"
          className={NavbarCSS.link_Top}
          onClick={() => setOpen(!open)}
        >
          "Dadar"
        </Link>
        <Link
          className={NavbarCSS.link_Top}
          to="/cart"
          onClick={() => setOpen(!open)}
        >
          <IconButton sx={{ padding: 0 }} aria-label="cart">
            <Badge badgeContent={5} color="primary" size="large">
              <ShoppingCartIcon
                className={NavbarCSS.navbarCartIcon}
                sx={{ fontSize: 30 }}
              />
            </Badge>
          </IconButton>
        </Link>
        <Link
          // to={currentUser ? "/profile" : "/login"}
          className={NavbarCSS.link_Top}
          onClick={() => setOpen(!open)}
        >
          User
        </Link>
      </StyledMenu>
    );
  };

  return (
    <header className={NavbarCSS.header}>
      <span className={NavbarCSS.logoName}>FOOD FRENZY</span>
      {width < 850 ? (
        <nav className={NavbarCSS.navbar_page_links}>
          <Burger
            className={NavbarCSS.navbar_burgerMenu}
            open={open}
            setOpen={setOpen}
          />
          <Menu
            className={NavbarCSS.navbar_burgerMenu}
            open={open}
            setOpen={setOpen}
          />
        </nav>
      ) : (
        <nav className={NavbarCSS.navbar_page_links}>
          {links.map((linkItem) => {
            return (
              <Link
                key={linkItem.text}
                className={NavbarCSS.linkTop}
                to={linkItem.toURL}
              >
                {linkItem.text}
                <span className={NavbarCSS.underStyle}></span>
              </Link>
            );
          })}
          <Link to="/branch" className={NavbarCSS.linkTop}>
            Dadar
          </Link>
          <Link className={NavbarCSS.linkTop} to="/cart">
            <IconButton sx={{ padding: 0 }} aria-label="cart">
              <Badge badgeContent={5} color="primary" size="large">
                <ShoppingCartIcon
                  className={NavbarCSS.navbarCartIcon}
                  sx={{ fontSize: 30 }}
                />
              </Badge>
            </IconButton>
          </Link>
          <Link className={NavbarCSS.linkTop}>User</Link>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
