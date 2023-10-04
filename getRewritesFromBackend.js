export const getRewritesFromBackend = async () => {
	// wait for 50ms to simulate API call
	await new Promise((resolve) => setTimeout(resolve, 50));

	return rewrites;
};

const rewrites = {
	// pathname: {
	//   rewriteUrl: "rewriteUrl"
	// },
	"/a-propos": /* url that the user visits */ {
		locale: "fr-CH",
		rewriteUrl: "/about", // the route that is rendered
	},
	"/projets": /* url that the user visits */ {
		locale: "fr-CH",
		rewriteUrl: "/projects", // the route that is rendered
	},
	"/projets/abc": /* url that the user visits */ {
		locale: "fr-CH",
		rewriteUrl: "/projects/abc", // the route that is rendered
	},
};
