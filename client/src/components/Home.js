import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Item from "./Item";

const Home = () => {
  const [items, setItems] = useState("");

  const [pressedAdd, setPressedAdd] = useState(0);

  useEffect(() => {
    fetch("/api/items")
      .then((response) => response.json())
      .then((data) => {
        setItems(data.data);
      })
      .catch((err) => console.log(err));
  }, [pressedAdd]);

  return (
    <Wrapper>
      <Div>
        {items
          ? items.map((item, i) => {
              return (
                <Item
                  key={i}
                  itemChild={item}
                  pressedAdd={pressedAdd}
                  setPressedAdd={setPressedAdd}
                />
              );
            })
          : "give it a sec 😬"}
      </Div>
    </Wrapper>
  );
};
export default Home;

const Wrapper = styled.div``;

const Div = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 10px;
`;
