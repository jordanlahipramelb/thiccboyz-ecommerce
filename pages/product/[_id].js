/** File Based Routing
 *
 *    /product/[_id]
 */

import React, { useState } from "react";
import { urlFor, client } from "../../lib/client";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { ProductCard } from "../../components";
import { useStateContext } from "../../context/StateContext";

const ProductDetails = ({ product, products }) => {
	const { image, name, details, price } = product;
	const [index, setIndex] = useState(0);

	// state context imported from StateContext
	const { qty, decreaseQty, increaseQty, onAddToCart, setShowCart } =
		useStateContext();

	const handleBuyNow = () => {
		onAddToCart(product, qty);

		setShowCart(true);
	};

	return (
		<div>
			<div className="product-detail-container">
				<div>
					<div className="image-container">
						<img
							src={urlFor(image && image[index])}
							className="product-detail-image"
						/>
					</div>
					<div className="small-images-container">
						{image?.map((item, i) => (
							<img
								key={i}
								src={urlFor(item)}
								className={
									i == index ? "small-image selected-image" : "small-image"
								}
								onMouseEnter={() => setIndex(i)}
							/>
						))}
					</div>
				</div>

				<div className="product-detail-description">
					<h1>{name}</h1>

					<h4>Details:</h4>
					<p>{details}</p>
					<p className="price">${price}</p>
					<div className="quantity">
						<h3>Quantity:</h3>
						<p className="quantity-description">
							<span className="minus" onClick={decreaseQty}>
								<AiOutlineMinus />
							</span>
							<span className="num">{qty}</span>
							<span className="plus" onClick={increaseQty}>
								<AiOutlinePlus />
							</span>
						</p>
					</div>

					<div className="buttons">
						<button
							type="button"
							className="add-to-cart"
							// this product is passed in, along with the qty number
							onClick={() => onAddToCart(product, qty)}
						>
							Add to Cart
						</button>
						<button type="button" className="buy-now" onClick={handleBuyNow}>
							Buy Now
						</button>
					</div>
				</div>
			</div>

			<div className="maylike-products-wrapper">
				<h2>You May Also Like</h2>
				<div className="marquee">
					<div className="maylike-products-container track">
						{/* map through products and return <Product/> cards */}
						{products.map((item) => (
							<ProductCard key={item._id} product={item} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

/** getStaticProps
- can only be exported from a page
- used when the data required to render the page is available at build time ahead of a user’s request
- used when the data comes from a headless CMS
- always runs on the server and never on the client

Example: Home page fetches the products data with getServerSideProps. 
    getStaticProps stores the data instantly in each product, waiting for the user to click on the product
 */

export const getStaticProps = async ({ params: { _id } }) => {
	const query = `*[_type == "product" && _id == '${_id}'][0]`;
	const productsQuery = '*[_type == "product"]';

	const product = await client.fetch(query);
	const products = await client.fetch(productsQuery);

	// console.log(product);

	return {
		props: { products, product },
	};
};

/** getStaticPaths NEEDED FOR getStaticProps
- fetches the paths of the links rendered on the page, stores it
		- this allows it to get to the paths faster when clicked
- use if..
		- you’re statically pre-rendering pages that use dynamic routes
		- The data comes from a headless CMS
		- The data comes from a database
		- The data comes from the filesystem

 */

export const getStaticPaths = async () => {
	// query all ids of the products
	const query = `*[_type == "product"] {
				_id
			}
			`;
	const products = await client.fetch(query);

	// map through each id of the products
	const paths = products.map((product) => ({ params: { _id: product._id } }));

	return {
		paths,
		fallback: "blocking",
	};
};

export default ProductDetails;
