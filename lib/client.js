// done once throughout the project, allowing us to use the client at all the times

import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// $ sanity manage into terminal to find details
export const client = sanityClient({
	projectId: "zowoamf3", // which project to connect with
	dataset: "production", // are we in development or production
	apiVersion: "2022-03-10", // use current UTC date
	useCdn: true, // `false` if you want to ensure fresh data
	token: process.env.NEXT_PUBLIC_SANITY_TOKEN, // created in API>Tokens with Editor access, or leave blank for unauthenticated usage
});

const builder = imageUrlBuilder(client);

// sanity gives us access to the url of the images stored
export const urlFor = (source) => builder.image(source);

// this is imported in pages > index.js
