import type { MetaFunction } from "@remix-run/node";
import { LoaderFunctionArgs } from "@remix-run/node";
import Articles from "~/features/Articles";

export const meta: MetaFunction = () => {
  return [
    { title: "Oaza" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader(args: LoaderFunctionArgs) {
  return null;
}

export default function Index() {
  return <Articles />;
}
