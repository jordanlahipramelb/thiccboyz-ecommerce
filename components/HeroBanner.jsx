import Link from "next/link";
import React from "react";

import { urlFor } from "../lib/client";

const HeroBanner = ({ heroBanner }) => {
	return (
		<div className="hero-banner-container">
			<p className="small">Welcome to</p>
			<h1>THICC BOYZ</h1>
			<h1>BOWLING CLUB</h1>
			<p className="small">est. 2021</p>
		</div>
	);
};

export default HeroBanner;
