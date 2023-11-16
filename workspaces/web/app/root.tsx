import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Suspense, lazy } from "react";

import Header from "~/components/Header";
import Footer from "~/components/Footer";
import preferences from "~/utils/storage";
import makeGetRequest from "~/utils/request";
import { Loader } from "ui";
import { ThemeEnum } from "./types/global";

const Ticker = lazy(() => import("~/features/Ticker"));
const CategoriesFilter = lazy(() => import("~/features/CategoriesFilter"));

export async function loader(args: LoaderFunctionArgs) {
  const cookieHeader = args.request.headers.get("Cookie");
  const cookie = (await preferences.parse(cookieHeader)) || {};
  const response = await makeGetRequest(args, "/api/articles/public");
  return {
    articles: response,
    theme: cookie.theme === ThemeEnum.Light ? ThemeEnum.Dark : ThemeEnum.Light,
  };
}

const Loading = () => (
  <div
    style={{
      minHeight: "51px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Loader />
  </div>
);

export default function Root() {
  let { articles, theme } = useLoaderData<typeof loader>();

  return (
    /** @ts-ignore */
    <html lang="en" theme={theme}>
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
        <Suspense fallback={<Loading />}>
          <Ticker articles={articles} />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <CategoriesFilter />
        </Suspense>
        {/* <Suspense fallback={<Loading />}>
          <StorageProvider />
        </Suspense> */}
        <Outlet />
        <Footer />
        <ScrollRestoration />
        <LiveReload />
        <Scripts />
      </body>
    </html>
  );
}
