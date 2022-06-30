import React from "react";
import { client } from "../../lib/client";
import { ProductCard } from "../../components";

function Crewnecks({ crewnecks }) {
	return (
		<>
			{/* {console.log("products:", products)} */}
			<div className="product-type-heading">
				<h2>Crew Necks</h2>
				<p>Crew necks of many color variations</p>
			</div>
			<div className="product-type-container">
				{crewnecks?.map((crewneck) => (
					<ProductCard key={crewneck._id} product={crewneck} />
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
	const crewneckQuery = '*[type == "crew neck"]'; // query to grab all the crewnecks
	const crewnecks = await client.fetch(crewneckQuery);

	// Pass data to this page via props
	return {
		props: { crewnecks },
	};
};
export default Crewnecks;
