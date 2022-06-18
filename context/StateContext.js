import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

/** Data required to be accessible by many components
 *
 * imported into _app.js
 *
 * increment/decrement quantities in product details
 */

const Context = createContext();

export const StateContext = ({ children }) => {
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [totalPrice, setTotalPrice] = useState();
	const [totalQuantities, setTotalQuantities] = useState(0); // number of ALL items in cart
	const [qty, setQty] = useState(1);

	const onAddToCart = (product, quantity) => {
		// check to see if item is already in cart
		const itemExistsInCart = cartItems.find((item) => item._id === product._id);
		// total price of cart is updated to reflect quantity
		setTotalPrice(
			(prevTotalPrice) => prevTotalPrice + product.price * quantity
		);
		// total quantity of item is increased instead of adding another instance of the same item
		setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

		//  if item already exists in the cart.. (states are updated)
		if (itemExistsInCart) {
			// map through each cart product
			const updatedCartItems = cartItems.map((cartItem) => {
				// if the id of the item in the cart is the same as the product passed in..
				if (cartItem._id === product._id)
					return {
						...cartItem, // spread the previous cart items in
						quantity: cartItem.quantity + quantity, //increase the cart item by the quantity
					};
			});

			setCartItems(updatedCartItems);
		}
		// if we don't have the item in the cart
		else {
			// product object set with quantity
			product.quantity = quantity;

			// update cart items with the existing cart items plus as obj of the product with the updated quantity
			setCartItems([...cartItems], { ...product });
		}

		toast.success(`${qty} ${product.name} added to the cart.`);
	};

	/** increase quantity by 1 */
	const increaseQty = () => {
		//callback function; take previous qty and increment it
		setQty((prevQty) => prevQty + 1);
	};

	/** decrease quantity by 1*/
	const decreaseQty = () => {
		setQty((prevQty) => {
			// can't decrease quantity lower than 1
			if (prevQty < 1) return 1;

			return prevQty - 1;
		});
	};

	return (
		// object of values passed along entire app
		<Context.Provider
			value={{
				showCart,
				setShowCart,
				cartItems,
				totalPrice,
				totalQuantities,
				qty,
				increaseQty,
				decreaseQty,
				onAddToCart,
			}}
		>
			{children}
		</Context.Provider>
	);
};

// exports our context/functions and allows us to use our state like a hook (used in [_id].js)
export const useStateContext = () => useContext(Context);
