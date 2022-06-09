export default {
	name: "product", // REQUIRED: The field name. This will be the key in the data record.
	title: "Title", // Human readable label for the field.
	type: "document", // REQUIRED: Name of any valid schema type. This will be the type of the value in the data record.

	fields: [
		{
			name: "image",
			title: "Image",
			type: "array",
			of: [{ type: "image" }],
			options: {
				hotspot: true,
			},
		},
		{
			name: "name",
			title: "Name",
			type: "string",
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "name",
				maxLength: 90,
			},
		},
		{
			name: "price",
			title: "Price",
			type: "number",
		},
		{
			name: "details",
			title: "Details",
			type: "string",
		},
	],
};
