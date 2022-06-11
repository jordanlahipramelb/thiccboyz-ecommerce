import Link from "next/link";
import React from "react";

const HeroBanner = () => {
	return (
		<div className="hero-banner-container">
			<div>
				<p className="t-shirt">SMALL TEXT</p>
				<h3>MID TEXT</h3>
				<img src="" alt="t-shirt" className="hero-banner-image" />

				<div>
					<Link href="/product/ID">
						<button type="button">BUTTON TEXT</button>
					</Link>
					<div className="description">
						<h5>Description</h5>

						<p>DESCRIPTION</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroBanner;
