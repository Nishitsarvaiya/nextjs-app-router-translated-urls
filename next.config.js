/** @type {import('next').NextConfig} */
const nextConfig = {
	// i18n: {
	// 	locales: ["en", "fr-CH"],
	// 	defaultLocale: "en",
	// },
	async redirects() {
		return [
			{
				source: "/about",
				destination: "/en/about",
				permanent: true,
			},
			{
				source: "/en/a-propos",
				destination: "/en/about",
				permanent: true,
			},
			{
				source: "/projects",
				destination: "/en/projects",
				permanent: true,
			},
			{
				source: "/en/projets",
				destination: "/en/projects",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
