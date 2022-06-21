import { loadStripe } from "@stripe/stripe-js";

/** Gets instance of a Stripe Promise
 *
 * Utilized in:
 *  - Cart.jsx : handleCheckout
 */

let stripePromise; // declare stripe promise; undefined at the start

const getStripe = () => {
	if (!stripePromise) {
		stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
	}

	return stripePromise;
};

export default getStripe;
