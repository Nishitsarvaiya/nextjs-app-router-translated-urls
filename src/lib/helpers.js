import ROUTES from "../../routes.json";

export const getRouteTranslation = (route, locale) => {
	return ROUTES[route][locale];
};
