import React from "react";
import "../styles/globals.css";
import { Layout } from "../components";
// pass context to components inside of it
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
