import Link from "next/link";
import React, { useRef } from "react";
import {
	AiOutlineMinus,
	AiOutlinePlus,
	AiOutlineLayout,
	AiOutlineShopping,
	AiOutlineLeft,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { toast } from "react-hot-toast";

import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";

const Cart = () => {
	const cartRef = useRef();
	const {
		totalPrice,
		totalQuantities,
		cartItems,
		setShowCart,
		toggleCartItemQty,
		onRemoveFromCart,
	} = useStateContext();

	const handleCheckout = async () => {
		// get instance of stripe
		const stripe = await getStripe();

		// make API request to our nextjs backend with our cartItems
		const response = await fetch("/api/stripe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(cartItems),
		});

		// if something went wrong
		if (response.statusCode === 500) return;

		const data = await response.json();
		toast.loading("Redirecting...");
		// user is redirected to their specific id instance
		stripe.redirectToCheckout({ sessionId: data.id });
	};

	return (
		<div className="cart-wrapper" ref={cartRef}>
			<div className="cart-container">
				<button
					type="button"
					className="cart-heading"
					// closes cart menu
					onClick={() => setShowCart(false)}
				>
					<AiOutlineLeft />
					<span className="heading">Your Cart</span>
					<span className="cart-num-items">({totalQuantities}) items</span>
				</button>

				{/* If shopping cart is empty */}
				{cartItems.length < 1 && (
					<div className="empty-cart">
						<AiOutlineShopping size={150} />
						<h3>Your shopping bag is empty</h3>
						<Link href="/">
							<button
								type="button"
								className="btn"
								onClick={() => setShowCart(false)}
							>
								Continue Shopping
							</button>
						</Link>
					</div>
				)}

				<div className="product-container">
					{cartItems.length >= 1 &&
						cartItems.map((item, index) => (
							<div className="product" key={item._id}>
								<img
									src={urlFor(item?.image[0])}
									alt={item.name}
									className="cart-product-image"
								/>
								<div className="item-description">
									<div className="flex top">
										<h5>{item.name}</h5>
										<h4>${item.price}</h4>
									</div>
									<div className="flex bottom">
										<div>
											<p className="quantity-description">
												<span
													className="minus"
													onClick={() =>
														toggleCartItemQty(item._id, "decrement")
													}
												>
													<AiOutlineMinus />
												</span>
												<span className="num" onClick="">
													{item.quantity}
												</span>
												<span
													className="plus"
													onClick={() =>
														toggleCartItemQty(item._id, "increment")
													}
												>
													<AiOutlinePlus />
												</span>
											</p>
										</div>
										<button
											className="remove-item"
											title="Remove item from cart"
											type="button"
											onClick={() => onRemoveFromCart(item._id)}
										>
											<TiDeleteOutline />
										</button>
									</div>
								</div>
							</div>
						))}
				</div>

				{cartItems.length >= 1 && (
					<div className="cart-bottom">
						<div className="btn-container">
							<button className="btn" type="button" onClick={handleCheckout}>
								Pay
							</button>
						</div>
						<div className="total">
							<h3>Subtotal:</h3>
							<h3>${totalPrice}</h3>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Cart;
