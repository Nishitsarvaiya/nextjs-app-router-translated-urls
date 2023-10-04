import Link from "next/link";
import "../globals.css";
import { Inter } from "next/font/google";
import { getRouteTranslation } from "@/lib/helpers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({ params, children }) {
	console.log(params);
	return (
		<html lang='en'>
			<body className={inter.className}>
				<div style={{ display: "flex", gap: "20px", margin: "40px" }}>
					<Link href='/en'>EN</Link>
					<Link href='/'>FR</Link>
				</div>
				<div style={{ display: "flex", gap: "20px", margin: "40px" }}>
					<Link href={`${params.lang == "en" ? "/en" : ""}/${getRouteTranslation("about", params.lang)}`}>
						{getRouteTranslation("about", params.lang)}
					</Link>
					<Link href={`${params.lang == "en" ? "/en" : ""}/${getRouteTranslation("projects", params.lang)}`}>
						{getRouteTranslation("projects", params.lang)}
					</Link>
				</div>
				{children}
			</body>
		</html>
	);
}
