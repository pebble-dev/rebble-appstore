import { type RouteConfig, index, route, prefix } from "@react-router/dev/routes";

export default [
	index("redirects/root.tsx"),

	// TODO: Consolidate into one view
	route("watchapps", "routes/watchapps.tsx"),
	route("watchfaces", "routes/watchfaces.tsx"),

	route("search", "redirects/search.tsx", { id: "search" }),
	route("search/:type", "redirects/search.tsx"),
	route("search/:type/:page", "routes/search.tsx"),

	...prefix("application", [
		route(":applicationId", "routes/application.tsx"),
		route(":applicationId/changelog", "routes/changelog.tsx"),
	]),

	route("developer/:developerId", "redirects/developer.tsx"),
	route("developer/:developerId/:page", "routes/developer.tsx"),

	route("category/:categorySlug", "redirects/category.tsx", { id: "category" }),
	route("category/:categorySlug/:sort", "redirects/category.tsx"),
	route("category/:categorySlug/:sort/:page", "routes/category.tsx"),

	route("collection/:collectionSlug/:type", "redirects/collection.tsx"),
	route("collection/:collectionSlug/:type/:page", "routes/collection.tsx"),

	route("settings", "routes/settings.tsx"),

	// Removing all locale prefixes
	route('/de_DE/*', 'redirects/prefix.tsx', { id: "de" }),
	route('/en_US/*', 'redirects/prefix.tsx', { id: "en" }),
	route('/es_ES/*', 'redirects/prefix.tsx', { id: "es" }),
	route('/fr_FR/*', 'redirects/prefix.tsx', { id: "fr" }),
	route('/nl_NL/*', 'redirects/prefix.tsx', { id: "nl" }),
	route('/pl_PL/*', 'redirects/prefix.tsx', { id: "pl" }),
	route('/zh_CN/*', 'redirects/prefix.tsx', { id: "cn" }),
	route('/zh_TW/*', 'redirects/prefix.tsx', { id: "tw" }),
] satisfies RouteConfig;
