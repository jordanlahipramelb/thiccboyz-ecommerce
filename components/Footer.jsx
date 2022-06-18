import React from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
	return (
		<div className="footer-container">
			<p>2022 Thicc Boyz Bowling Club | All Rights Reserved</p>
			<p className="icon">
				<AiFillInstagram />
				<AiOutlineTwitter />
			</p>
		</div>
	);
};

export default Footer;
