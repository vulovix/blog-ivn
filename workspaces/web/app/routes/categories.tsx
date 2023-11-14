import { Outlet, useLoaderData } from "@remix-run/react";

import { LoaderFunctionArgs } from "@remix-run/node";

export async function loader(args: LoaderFunctionArgs) {
  return null;
}

export default function Articles() {
  const data = useLoaderData<typeof loader>();

  return <Outlet />;
}
