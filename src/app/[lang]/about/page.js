export default function About({ params }) {
	return (
		<main>
			<h1>{params.lang === "en" ? "about" : "A-propos"}</h1>
		</main>
	);
}
