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
import makeGetRequest from "~/utils/request";
import { ThemeEnum } from "./components/Articles/Image";
import { Loader } from "ui";

const CategoriesFilter = lazy(() => import("~/features/CategoriesFilter"));
const Ticker = lazy(() => import("~/features/Ticker"));

export async function loader(args: LoaderFunctionArgs) {
  const response = await makeGetRequest(args, "/api/articles/public");
  return response;
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
  const data = useLoaderData<typeof loader>();

  return (
    /** @ts-ignore */
    <html lang="en" theme={ThemeEnum.Dark}>
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
          <Ticker articles={data} />
        </Suspense>
        <Suspense fallback={<Loading />}>
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
