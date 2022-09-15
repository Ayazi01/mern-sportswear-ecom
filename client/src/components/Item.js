import React, { useState } from "react";
import styled from "styled-components";

const Item = ({ itemChild, pressedAdd, setPressedAdd }) => {
  const [cartAmount, setCartAmount] = useState(0);
  const [buttonPressed, setButtonPressed] = useState(false);

  //add items to cart database:
  const addToCart = async (e, item) => {
    e.preventDefault();
    setTimeout(() => {
      setButtonPressed(false);
    }, 3000);
    if (cartAmount > 0) {
      fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: item._id,
          amount: cartAmount,
        }),
      })
        .then((response) =>
          response.json().then((output) => {
            if (output.message === "Wrong-or-missing-amount") {
              window.alert("Please enter a number greater than 0");
            }
            setPressedAdd(pressedAdd + 1);
          })
        )
        .catch((err) => console.log(err));
    }
  };
  return (
    <Wrapper>
      <div>
        {itemChild.imageSrc ? (
          <img src={itemChild.imageSrc} alt={itemChild.name} />
        ) : (
          ""
        )}
        <div>Category: {itemChild.category}</div>

        <div>{itemChild.name}</div>
        <div>Price: {itemChild.price}</div>
        <div>Stock: {itemChild.numInStock}</div>
      </div>
      <form
        onSubmit={(e) => {
          setButtonPressed(true);
          addToCart(e, itemChild);
        }}
      >
        <input
          type="number"
          onChange={(e) => {
            setCartAmount(Number(e.target.value));
          }}
        />
        <input
          type="submit"
          value="Add To Cart"
          disabled={
            itemChild.numInStock < cartAmount ||
            cartAmount <= 0 ||
            buttonPressed
          }
        />
      </form>
    </Wrapper>
  );
};
export default Item;

const Wrapper = styled.div`
  margin-bottom: 10px;
`;
