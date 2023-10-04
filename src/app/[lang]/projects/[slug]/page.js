export async function generateStaticParams() {
	return [{ lang: "en" }, { lang: "fr-CH" }];
}

export default function ProjectSingle({ params }) {
	console.log(params);
	return (
		<main>
			<h1>
				{params.lang === "en" ? "project single" : "projet unique"} : {params.slug}
			</h1>
		</main>
	);
}
