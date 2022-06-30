import React from "react";
import { client } from "../../lib/client";
import { ProductCard } from "../../components";

function Tshirts({ tshirts }) {
	return (
		<>
			{/* {console.log("products:", products)} */}
			<div className="product-type-heading">
				<h2>T-Shirts</h2>
				<p>Shirts of many color variations</p>
			</div>
			<div className="product-type-container">
				{tshirts?.map((tshirt) => (
					<ProductCard key={tshirt._id} product={tshirt} />
				))}
			</div>
		</>
	);
}

/** getServerSideProps 
- used only if you NEED to render a page whose data must be fetched AT REQUEST TIME
- used in place of useEffect in order to fetch data
- only runs on server-side and never runs on the browser
- returns JSON which will be used to render the page
- can only be exported from a page

- If you DO NOT need to render the data DURING the request, then you should consider fetching data on the client side or getStaticProps.
 */

// fetching data from sanity; gets called on every request
export const getServerSideProps = async () => {
	const tshirtQuery = '*[type == "t-shirt"]'; // query to grab all the t-shirts
	const tshirts = await client.fetch(tshirtQuery);

	// Pass data to this page via props
	return {
		props: { tshirts },
	};
};
export default Tshirts;
