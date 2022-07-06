import React from "react";
import "../styles/globals.css";
import "../styles/Layout.css";
import "../styles/Navbar.css";
import "../styles/Cart.css";
import "../styles/Home.css";
import "../styles/HeroBanner.css";
import "../styles/ProductCard.css";
import "../styles/ProductDetails.css";
import "../styles/Footer.css";
import "../styles/FooterBanner.css";
import "../styles/SuccessCancel.css";
import "../styles/ProductType.css";
import "../styles/CategoryItem.css";

import { Layout } from "../components";
// pass state/context to components inside of it
import { StateContext } from "../context/StateContext";
// small notification popup
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
	return (
		<StateContext>
			<Layout>
				<Toaster />
				<Component {...pageProps} />
			</Layout>
		</StateContext>
	);
}

export default MyApp;
