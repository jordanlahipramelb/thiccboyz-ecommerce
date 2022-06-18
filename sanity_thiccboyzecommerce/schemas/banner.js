export default {
	name: "banner", // REQUIRED: The field name. This will be the key in the data record.
	title: "Banner", // Human readable label for the field.
	type: "document", // REQUIRED: Name of any valid schema type. This will be the type of the value in the data record.

	fields: [
		{
			name: "image",
			title: "Image",
			type: "image",
			options: {
				hotspot: true,
			},
		},
		{
			name: "buttonText",
			title: "ButtonText",
			type: "string",
		},
		{
			name: "product",
			title: "Product",
			type: "string",
		},
		{
			name: "description",
			title: "Description",
			type: "string",
		},
		{
			name: "smallText",
			title: "SmallText",
			type: "string",
		},
		{
			name: "midText",
			title: "MidText",
			type: "string",
		},
		{
			name: "largeText1",
			title: "LargeText1",
			type: "string",
		},
		{
			name: "largeText2",
			title: "LargeText2",
			type: "string",
		},
		{
			name: "discount",
			title: "Discount",
			type: "string",
		},
		{
			name: "saleTime",
			title: "SaleTime",
			type: "string",
		},
	],
};
