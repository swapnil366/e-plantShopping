import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";

/**
 * CartItem component displays all items currently added to the shopping cart,
 * calculates subtotals and total costs, and provides controls to update quantities
 * or remove items.
 */
function CartItem({ onContinueShopping }) {
  // Retrieve cart items from the Redux store state
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  /**
   * Calculates the total cost of all items currently in the shopping cart.
   * Iterates through the cart array using reduce and sums (price * quantity) for each item.
   */
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const price = Number(item.cost) || 0;
      const quantity = Number(item.quantity) || 0;
      return total + price * quantity;
    }, 0);
  };

  /**
   * Handles increasing the quantity of a specific cart item.
   * Dispatches the updateQuantity action with the incremented count.
   */
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: Number(item.quantity) + 1,
      })
    );
  };

  /**
   * Handles decreasing the quantity of a specific cart item.
   * Ensures the quantity does not drop below 1 before dispatching the action.
   */
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

  /**
   * Handles removing an item completely from the cart state.
   * Dispatches the removeItem action using the item's name as the identifier.
   */
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  /**
   * Triggers the navigation callback to return the user back to the product catalog view.
   */
  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  /**
   * Handles the checkout button click event by showing a standard placeholder alert.
   */
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
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                  disabled={Number(item.quantity) <= 1}
                >
                  -
                </button>

                <span className="cart-item-quantity-value"> {item.quantity} </span>

                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>

                <p>
                  Subtotal: $
                  {(
                    Number(item.cost) *
                    Number(item.quantity)
                  ).toFixed(2)}
                </p>

                <button
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h2>
            Total Amount: ${calculateTotalAmount().toFixed(2)}
          </h2>

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
