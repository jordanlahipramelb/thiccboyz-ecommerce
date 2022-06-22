import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

/** Data required to be accessible by many components
 *
 * imported into _app.js
 *
 * States:
 * 	- increment/decrement quantities in product details
 * 	- Display cart
 * 	- total price of cart
 * 	- total quantity of each item in cart
 * 	- total quantity of items in cart
 *
 * Functions:
 *  - onAddToCart
 *  - increaseQty
 * 	- decreaseQty
 */

const Context = createContext();

export const StateContext = ({ children }) => {
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantities, setTotalQuantities] = useState(0); // number of ALL items in cart
	const [qty, setQty] = useState(1);

	console.log(cartItems);

	// product we want to update
	let foundProduct;
	// index of the property we want to update
	let index;

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

			// if (typeof window !== "undefined") {
			// 	//make cart a string and store in local space
			// 	let stringCart = JSON.stringify(updatedCartItems);
			// 	localStorage.setItem("cart", stringCart);
			// }
		}
		// if we don't have the item in the cart
		else {
			// product object set with quantity
			product.quantity = quantity;

			// update cart items with an array of the existing cart items plus an obj of the product with the  quantity selected
			setCartItems([...cartItems, { ...product }]);

			// if (typeof window !== "undefined") {
			// 	//make cart a string and store in local space
			// 	let stringCart = JSON.stringify(cartItems);
			// 	localStorage.setItem("cart", stringCart);
			// }
		}

		toast.success(`${qty} ${product.name} added to the cart.`);
	};

	const onRemoveFromCart = (id) => {
		foundProduct = cartItems.find((item) => item._id === id);

		const newCartItems = cartItems.filter((item) => item._id !== id);

		// minus the price of the foundProduct from the previous price/quantity
		setTotalPrice(
			(prevTotalPrice) =>
				prevTotalPrice - foundProduct.price * foundProduct.quantity
		);
		// minus the total quantity of the cart by the quantity of the foundProduct
		setTotalQuantities(
			(prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity
		);

		setCartItems(newCartItems);

		// if (typeof window !== "undefined") {
		// 	let cartString = JSON.stringify(newCartItems);
		// 	localStorage.setItem("cart", cartString);
		// }
	};

	/** Increment/decrement quantity of products in cart */
	const toggleCartItemQty = (id, value) => {
		// find product in cart where id equals item _id
		foundProduct = cartItems.find((item) => item._id === id);
		// find the index of that same item
		index = cartItems.findIndex((item) => item._id === id);
		// filter out the items that we're not updating sso we don't mutate state
		const newCartItems = cartItems.filter((item) => item._id !== id);

		if (value === "increment") {
			/** never mutate the state in React! //
			
			foundProduct.quantity += 1;
			cartItems[index] = foundProduct; */

			/** do this instead; create new cart variable */
			setCartItems([
				...newCartItems, //spread previous cart items
				{ ...foundProduct, quantity: foundProduct.quantity + 1 }, // spread found product and increase quantity
			]);
			setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
			setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
		}

		if (value === "decrement") {
			if (foundProduct.quantity > 1) {
				setCartItems([
					...newCartItems, //spread previous cart items
					{ ...foundProduct, quantity: foundProduct.quantity - 1 }, // spread found product and decrease quantity
				]);
				setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
				setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
			}
		}
	};

	/** increase quantity by 1 */
	const increaseQty = () => {
		//callback function; take previous qty and increment it
		setQty((prevQty) => prevQty + 1);
	};

	/** decrease quantity by 1*/
	const decreaseQty = () => {
		setQty((prevQty) => {
			// can't decrease quantity if lower than 1
			if (prevQty < 1) return 1;

			return prevQty - 1;
		});
	};

	// useEffect(() => {
	// 	let localCart = localStorage.getItem("cart");

	// 	//turn it into js
	// 	localCart = JSON.parse(localCart);
	// 	//load persisted cart into state if it exists
	// 	if (localCart) setCartItems(localCart);
	// }, []); //the empty array ensures useEffect only runs once

	return (
		// object of values passed along entire app
		<Context.Provider
			value={{
				showCart,
				setShowCart,
				cartItems,
				setCartItems,
				totalPrice,
				setTotalPrice,
				totalQuantities,
				setTotalQuantities,
				qty,
				increaseQty,
				decreaseQty,
				onAddToCart,
				onRemoveFromCart,
				toggleCartItemQty,
			}}
		>
			{children}
		</Context.Provider>
	);
};

// exports our context/functions and allows us to use our state like a hook (used in [_id].js, Cart.jsx)
export const useStateContext = () => useContext(Context);
