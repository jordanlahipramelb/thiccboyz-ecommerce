import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "../context/StateContext";
import { runConfettiEffect } from "../lib/utils";

const Success = () => {
	const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

	// Clears our states since this is the success page
	useEffect(() => {
		localStorage.clear();
		setCartItems([]);
		setTotalPrice(0);
		setTotalQuantities(0);
		runConfettiEffect();
	}, []);

	return (
		<div className="success-container">
			<div className="success">
				<p className="icon">
					<BsBagCheckFill />
				</p>
				<h2>Thank you for your order!</h2>
				<p className="email-msg">Check your email inbox for the receipt.</p>
				<p className="desc">
					If you have any questions, please email
					<a className="email" href="mailto:order@example.com">
						order@example.com
					</a>
				</p>
				<Link href="/">
					<button type="button" width="300px" className="btn">
						Continue Shopping
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Success;
