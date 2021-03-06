import React from "react";
import { client } from "../lib/client";
import {
	ProductCard,
	FooterBanner,
	HeroBanner,
	CategoryItem,
} from "../components";
import TshirtImage from "../assets/images/tshirt.jpg";
import HoodiesImage from "../assets/images/hoodies.jpg";
import TankTopsImage from "../assets/images/tanktop.jpg";
import CrewImage from "../assets/images/crew.jpg";

function Home({ products, bannerData }) {
	return (
		<>
			{/* if bannerData exists, pass in the data */}
			<HeroBanner heroBanner={bannerData.length && bannerData[0]} />
			{console.log("products:", products)}

			<div className="categories-container">
				<CategoryItem src={TshirtImage} title={"T-Shirts"} link={"/tshirts"} />
				<CategoryItem
					src={TankTopsImage}
					title={"Tank Tops"}
					link={"/tanktops"}
				/>
				<CategoryItem src={HoodiesImage} title={"Hoodies"} link={"/hoodies"} />
				<CategoryItem
					src={CrewImage}
					title={"Crew Necks"}
					link={"/crewnecks"}
				/>
			</div>

			{/* <FooterBanner footerBanner={bannerData && bannerData[0]} /> */}
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
	const productQuery = '*[_type == "product"]'; // query to grab all the products
	const products = await client.fetch(productQuery);

	const bannerQuery = '*[_type == "banner"]'; // query to grab the banner
	const bannerData = await client.fetch(bannerQuery);

	// Pass data to this page via props
	return {
		props: { products, bannerData },
	};
};
export default Home;
