import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";

function CartItem({ onContinueShopping }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Calculate the total cost of all cart items.
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const price = Number(item.cost) || 0;
      const quantity = Number(item.quantity) || 0;
      return total + price * quantity;
    }, 0);
  };

  // Handle incrementing item quantity in the cart
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: Number(item.quantity) + 1,
      })
    );
  };

  // Handle decrementing item quantity (ensures it doesn't go below 1)
  const handleDecrement = (item) => {
    if (Number(item.quantity) > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: Number(item.quantity) - 1,
        })
      );
    }
  };

  // Handle removing an item completely from the cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Handle click event for continuing shopping
  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  // Handle click event for checkout button
  const handleCheckoutShopping = () => {
    alert("Functionality to be added for future reference");
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.name}>
              <img
                src={item.image}
                alt={item.name}
                width="100"
              />

              <div>
                <h3>{item.name}</h3>

                <p>
                  Price: ${Number(item.cost).toFixed(2)}
                </p>

                <button
                  onClick={() => handleDecrement(item)}
                  disabled={Number(item.quantity) <= 1}
                >
                  -
                </button>

                <span> {item.quantity} </span>

                <button onClick={() => handleIncrement(item)}>
                  +
                </button>

                <p>
                  Subtotal: $
                  {(
                    Number(item.cost) *
                    Number(item.quantity)
                  ).toFixed(2)}
                </p>

                <button onClick={() => handleRemove(item)}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h2>
            Total Amount: ${calculateTotalAmount().toFixed(2)}
          </h2>

          {/* Required Action Buttons */}
          <div className="cart-action-buttons" style={{ marginTop: "20px" }}>
            <button
              className="get-started-btn"
              onClick={(e) => handleContinueShopping(e)}
              style={{ marginRight: "10px" }}
            >
              Continue Shopping
            </button>
            <button
              className="get-started-btn"
              onClick={handleCheckoutShopping}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartItem;
