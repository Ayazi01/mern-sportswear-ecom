import { useState } from "react";



const CartItem = ({ pressedDelete, setPressedDelete, cartItem }) => {
const [deleteAmount, setDeleteAmount] = useState(0);

const handleDelete = (e, id, amount) => {
    e.preventDefault();
    // The amount that we get from the form is a string so we typecast it to a number
    amount = Number(amount);

    fetch("/api/cart", {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        itemId: id,
        amount,
    }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.message === "Wrong-Amount-Type") {
        window.alert("Please enter a number greater than 0");
        }
        setPressedDelete(pressedDelete + 1);
    })
    .catch((err) => console.log(err));
};
return (
    <div>
    <p>Name of product: {cartItem.name}</p>
    <p>Body Location: {cartItem.body_location}</p>
    <p>Category: {cartItem.category}</p>
    <p>Price: {cartItem.price}</p>
    <img src={cartItem.imageSrc} alt={cartItem.name} />
    <p>Amount in cart: {cartItem.amount}</p>
    <form onSubmit={(e) => handleDelete(e, cartItem.itemId, deleteAmount)}>
        <label>
        <input
            type="number"
            onChange={(e) => {
            setDeleteAmount(e.target.value);
            }}
        />
        </label>
        <input type="submit" value="Remove from Cart" />
    </form>
    </div>
);
};

export default CartItem;