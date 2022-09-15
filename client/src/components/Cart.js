import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CartItem from "./CartItem";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [pressedDelete, setPressedDelete] = useState(0);
  const [pressedPurchase, setPressedPurchase] = useState(0);
  const [loading, setLoading] = useState(true);

  const purchaseHandler = () => {
    fetch("/api/purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) =>
        response.json().then((output) => {
          setPressedPurchase(pressedPurchase + 1);
        })
      )
      .catch((err) => console.log(err));
  };
  //UseEffect to get all the cart items on load
  useEffect(() => {
    fetch("/api/cart")
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setCartItems(data.data);
      })
      .catch((err) => console.log(err));
  }, [pressedDelete, pressedPurchase]);

  return (
    <StyledHeader>
      <Wrapper /* this shows all the items in your cart> */>
        {loading ? (
          <div>"give it a sec 😬"</div>
        ) : cartItems.length > 0 ? (
          <div>
            <Div>Items in your cart!</Div>
            {cartItems.map((cartItem) => {
              return (
                <CartItem
                  pressedDelete={pressedDelete}
                  setPressedDelete={setPressedDelete}
                  cartItem={cartItem}
                  key={cartItem._id}
                />
              );
            })}
            <button
              onClick={() => {
                purchaseHandler();
                window.alert("Thank you for your purchase!");
              }}
            >
              Purchase
            </button>
          </div>
        ) : (
          <div>No items in the cart</div>
        )}
      </Wrapper>
    </StyledHeader>
  );
};

export default Cart;

const StyledHeader = styled.div``;
const Div = styled.div``;
const Wrapper = styled.div`
  margin-right: 15px;
`;
