import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
  NavLink,
  useMatch,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import Logo from "./icons/rebble.svg?react";
import Search from "./icons/search.svg?react";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const meta: Route.MetaFunction = () => [
  { title: "Rebble Appstore" },
  { name: "og:site_name", content: "Rebble Appstore" },
  { name: "og:title", content: "Appstore" },
  { name: "og:description", content: "Find your favourite apps and faces on the Rebble Appstore!" },
  { name: "og:image", content: "" },
];


export function Layout({ children }: { children: React.ReactNode }) {
  const match = useMatch("*");
  const type = match?.pathname.split("/").at(-1) ?? 'watchapps';
  const watchappsLink = `/watchapps`;
  const watchfacesLink = `/watchfaces`;
  const searchLink = `/search/${type}/1`;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <brand>
            <NavLink to={watchappsLink}>
              <Logo />
              <span>Rebble</span>
              <span className="small">appstore</span>
            </NavLink>
          </brand>
          <nav>
            <NavLink to={watchappsLink}>Watch apps</NavLink>
            <NavLink to={watchfacesLink}>Watch faces</NavLink>
          </nav>
          <NavLink className="search" to={searchLink}><Search /></NavLink>
        </header>
        <content>
          {children}
        </content>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
