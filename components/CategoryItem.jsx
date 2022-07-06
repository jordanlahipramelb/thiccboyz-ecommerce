import React from "react";
import Image from "next/image";
import Link from "next/link";

const CategoryItem = ({ src, title, link }) => {
	return (
		<Link href={link}>
			<div className="category-container">
				<Image src={src} />
				<div className="info">
					<h1>{title}</h1>
				</div>
			</div>
		</Link>
	);
};

export default CategoryItem;
