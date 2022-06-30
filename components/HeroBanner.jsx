import Link from "next/link";
import React from "react";

import { urlFor } from "../lib/client";

const HeroBanner = ({ heroBanner }) => {
	return (
		<div className="hero-banner-container">
			<div>
				<h3>Thicc Boyz Bowling Club</h3>

				<Link href={`/product/${heroBanner.product}`}>
					<button type="button">{heroBanner.buttonText}</button>
				</Link>
			</div>
		</div>
	);
};

export default HeroBanner;
