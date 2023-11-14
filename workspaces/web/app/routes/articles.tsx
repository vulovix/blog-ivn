import { Outlet } from "@remix-run/react";

import { LoaderFunctionArgs } from "@remix-run/node";

import "~/features/Articles/style.scss";

export async function loader(args: LoaderFunctionArgs) {
  return null;
}

export default function Articles(): JSX.Element {
  return <Outlet />;
}
