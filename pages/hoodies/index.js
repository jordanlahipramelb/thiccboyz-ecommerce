import React from "react";
import { client } from "../../lib/client";
import { ProductCard } from "../../components";

function Hoodies({ hoodies }) {
	return (
		<>
			{/* {console.log("products:", products)} */}
			<div className="product-type-heading">
				<h2>Hoodies</h2>
				<p>Hoodies of many color variations</p>
			</div>
			<div className="product-type-container">
				{hoodies?.map((hoodie) => (
					<ProductCard key={hoodie._id} product={hoodie} />
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
	const hoodieQuery = '*[type == "hoodie"]'; // query to grab all the hoodies
	const hoodies = await client.fetch(hoodieQuery);

	// Pass data to this page via props
	return {
		props: { hoodies },
	};
};
export default Hoodies;
