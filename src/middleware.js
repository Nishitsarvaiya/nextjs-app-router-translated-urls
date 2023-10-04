import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import i18n from "../i18n.config";
import { getRewritesFromBackend } from "../getRewritesFromBackend";

function getLocale(request) {
	// Negotiator expects plain object so we need to transform headers
	const negotiatorHeaders = {};
	request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

	// @ts-ignore locales are readonly
	const locales = i18n.locales;

	// Use negotiator and intl-localematcher to get best locale
	let languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);

	const locale = match(languages, locales, i18n.defaultLocale);

	return locale;
}

export async function middleware(request) {
	const pathname = request.nextUrl.pathname;
	const rewrites = await getRewritesFromBackend();

	// Check if the default locale is in the pathname
	if (pathname.startsWith(`/${i18n.defaultLocale}`) || pathname === `/${i18n.defaultLocale}`) {
		console.log("in Default locale", pathname);
		// e.g. incoming request is /en/products
		// The new URL is now /products
		return NextResponse.redirect(
			new URL(pathname.replace(`/${i18n.defaultLocale}`, pathname === `/${i18n.defaultLocale}` ? "/" : ``), request.nextUrl)
		);
	}

	// Check if there is any supported locale in the pathname
	const pathnameIsMissingLocale = i18n.locales.every((locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`);

	// Redirect if there is no locale
	if (pathnameIsMissingLocale) {
		// const userLocale = getLocale(request);
		const userLocale = "fr-CH";
		console.log("pathnameIsMissingLocale", pathname);

		if (pathname in rewrites) {
			const { rewriteUrl, locale } = rewrites[pathname];
			// Choose which page template to use
			return NextResponse.rewrite(new URL(`/${locale}${rewriteUrl}`, request.nextUrl));
		}

		if (userLocale === i18n.defaultLocale) {
			return NextResponse.rewrite(new URL(`/${i18n.defaultLocale}${pathname}`, request.nextUrl));
		}

		// e.g. incoming request is /products
		// The new URL is now /en-US/products
		// return NextResponse.redirect(new URL(`/${userLocale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.nextUrl));
	} else {
		if (pathname in rewrites) {
			const { rewriteUrl, locale } = rewrites[pathname];
			// Choose which page template to use
			return NextResponse.rewrite(new URL(`/${locale}${rewriteUrl}`, request.nextUrl));
		}
	}
}

export const config = {
	// Matcher ignoring `/_next/` and `/api/`
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
