export async function generateStaticParams() {
	return [{ lang: "en" }, { lang: "fr-CH" }];
}

export default function Projects({ params }) {
	return (
		<main>
			<h1>{params.lang === "en" ? "projects" : "projets"}</h1>
		</main>
	);
}
