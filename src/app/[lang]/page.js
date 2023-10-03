export default function Home({ params }) {
	return (
		<main>
			<h1>{params.lang === "en" ? "home" : "Accueil"}</h1>
		</main>
	);
}
