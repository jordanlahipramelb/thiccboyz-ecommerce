import React from "react";
import Link from "next/link";

const Canceled = () => {
	return (
		<div className="cancel-container">
			<div className="cancel">
				<p>Your payment was canceled.</p>
				<Link href="/">
					<button type="button" width="300px" className="btn">
						Continue Shopping
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Canceled;
