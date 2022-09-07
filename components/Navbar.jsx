import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineShopping, AiOutlineClose } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { Cart } from "./";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
	const { showCart, setShowCart, totalQuantities } = useStateContext();
	const [nav, setNav] = useState(false);
	const handleNav = () => setNav(!nav); // sets nav true<>false

	return (
		<div className="navbar-container">
			<div className="left-tray">
				{/* Hamburger */}
				<div onClick={handleNav} className="hamburger">
					{!nav ? <FaBars /> : <AiOutlineClose />}
				</div>
				<div>
					<p className="logo">
						<Link href="/">TBBC</Link>
					</p>
				</div>
			</div>

			{/* Menu */}
			<ul className="menu d-md-none">
				<Link href="/tshirts">T-SHIRTS</Link>
				<Link href="/tanktops">TANK TOPS</Link>
				<Link href="/crewnecks">CREW NECKS</Link>
				<Link href="/hoodies">HOODIES</Link>
			</ul>

			{/* Mobile Menu */}
			<ul className={!nav ? "d-none" : "mobile-menu"} onClick={handleNav}>
				<Link href="/tshirts">T-SHIRTS</Link>
				<Link href="/tanktops">TANK TOPS</Link>
				<Link href="/crewnecks">CREW NECKS</Link>
				<Link href="/hoodies">HOODIES</Link>
			</ul>

			<button
				className="cart-icon"
				onClick={() => setShowCart(true)}
				type="button"
			>
				<AiOutlineShopping />
				<span className="cart-item-qty">{totalQuantities}</span>
			</button>

			{/* Displays Cart component if showCart is true */}
			{showCart && <Cart />}
		</div>
	);
};

export default Navbar;
