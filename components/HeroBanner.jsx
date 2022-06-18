import Link from "next/link";
import React from "react";

import { urlFor } from "../lib/client";

const HeroBanner = ({ heroBanner }) => {
	return (
		<div className="hero-banner-container">
			<div>
				<p className="t-shirt">{heroBanner.smallText}</p>
				<h3>{heroBanner.midText}</h3>

				<Link href={`/product/${heroBanner.product}`}>
					<button type="button">{heroBanner.buttonText}</button>
				</Link>
			</div>
			<div>
				<img
					src={urlFor(heroBanner.image)}
					alt="t-shirt"
					className="hero-banner-image"
				/>
				{/* <div className="description">
						<h5>Description</h5>

						<p>{heroBanner.description}</p>
					</div> */}
			</div>
		</div>
	);
};

export default HeroBanner;
