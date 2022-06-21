import Stripe from "stripe";

/** Stripe Payments Backend */

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
	if (req.method === "POST") {
		console.log(req.body[0].image);

		try {
			// Create Checkout Sessions from body params.
			const params = {
				submit_type: "pay",
				mode: "payment",
				payment_method_types: ["card"],
				billing_address_collection: "auto",
				shipping_options: [
					{ shipping_rate: "shr_1LCxM8G2hEadwUeT1369cQbN" },
					{ shipping_rate: "shr_1LCxL5G2hEadwUeTwcrtX7Qh" },
				],

				// we have to modify each specific item to provide additional info (price, quantity, image)
				line_items: req.body.map((item) => {
					const img = item.image[0].asset._ref;
					const newImg = img
						.replace(
							"image-",
							"https://cdn.sanity.io/images/zowoamf3/production/"
						)
						.replace("-jpg", ".jpg");

					// console.log("IMG", newImg);

					return {
						price_data: {
							currency: "usd",
							product_data: {
								name: item.name,
								images: [newImg],
							},
							unit_amount: item.price * 100,
						},

						adjustable_quantity: {
							enabled: true,
							minimum: 1,
						},

						quantity: item.quantity,
					};
				}),

				success_url: `${req.headers.origin}/success`,
				cancel_url: `${req.headers.origin}/canceled`,
			};

			// Create Checkout Sessions from body params
			const session = await stripe.checkout.sessions.create(params);
			res.status(200).json(session);
		} catch (err) {
			res.status(err.statusCode || 500).json(err.message);
		}
	} else {
		res.setHeader("Allow", "POST");
		res.status(405).end("Method Not Allowed");
	}
}
