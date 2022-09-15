import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <HeaderStyled className="header">
      <h1 className="logo">MVPShop</h1>
      <Styledhome>
        <ItemStyled
          to="/"
          style={(isActive) => ({
            color: isActive ? "green" : "blue",
          })}
        >
          Home
        </ItemStyled>
        <ItemStyled
          to="/cart"
          style={(isActive) => ({
            color: isActive ? "green" : "blue",
          })}
        >
          Cart
        </ItemStyled>
      </Styledhome>
    </HeaderStyled>
  );
};

export default NavBar;

const HeaderStyled = styled.div`
  overflow: hidden;
`;

const Styledhome = styled.div`
  float: right;
  margin-right: 150px;
  margin-top: -30px;
`;

const ItemStyled = styled(NavLink)`
  text-decoration: none;
  margin-left: 10px;
  color: darkblue;
  &:active {
    background-color: red;

    text-decoration: underline;
  }
`;
