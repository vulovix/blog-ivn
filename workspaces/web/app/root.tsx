import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Suspense, lazy } from "react";

import Header from "~/components/Header";
import Footer from "~/components/Footer";
import preferences from "~/utils/storage";
import { Loader } from "ui";
import { ThemeEnum } from "./types/global";

const Ticker = lazy(() => import("~/features/Ticker"));
const CategoriesFilter = lazy(() => import("~/features/CategoriesFilter"));

export async function loader(args: LoaderFunctionArgs) {
  const cookieHeader = args.request.headers.get("Cookie");
  const cookie = (await preferences.parse(cookieHeader)) || {};
  return {
    theme: cookie.theme === ThemeEnum.Light ? ThemeEnum.Dark : ThemeEnum.Light,
    experimentalInvert: cookie.experimentalInvert == 0 ? 1 : 0,
  };
}

export default function Root() {
  let { theme, experimentalInvert } = useLoaderData<typeof loader>();

  return (
    /** @ts-ignore */
    <html lang="en" theme={theme} invert={experimentalInvert}>
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <Header />
        <Suspense fallback={<Loader />}>
          <Ticker />
        </Suspense>
        <Suspense fallback={<Loader />}>
          <CategoriesFilter />
        </Suspense>
        <Outlet />
        <Footer />
        <ScrollRestoration />
        <LiveReload />
        <Scripts />
      </body>
    </html>
  );
}

// export const shouldRevalidate = () => false;
