import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const ProductCard = ({ product: { _id, image, name, slug, price } }) => {
	return (
		<div>
			<Link href={`/product/${_id}`}>
				<div className="product-card">
					<img
						src={urlFor(image && image[0])}
						width={250}
						alt={name}
						className="product-image"
					/>
					<p className="product-name">{name}</p>
					<p className="product-price">${price}</p>
				</div>
			</Link>
		</div>
	);
};

export default ProductCard;
