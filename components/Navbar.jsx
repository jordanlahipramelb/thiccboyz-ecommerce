import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

const Navbar = () => {
	return (
		<div className="navbar-container">
			<p className="logo">
				<Link href="/">TBBC</Link>
			</p>

			<button className="cart-icon" onClick="" type="button">
				<AiOutlineShopping />
				<span className="cart-item-qty">1</span>
			</button>
		</div>
	);
};

export default Navbar;
