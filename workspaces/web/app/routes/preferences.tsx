import { json } from "@remix-run/node";
import preferences from "~/utils/storage";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

export async function loader(args: LoaderFunctionArgs) {
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await preferences.parse(cookieHeader)) || {};
  const formData = await request.formData();

  Object.keys(cookie).forEach((key) => {
    if (formData.has(key)) {
      cookie[key] = formData.get(key);
    }
  });

  return json(cookie, {
    headers: {
      "Set-Cookie": await preferences.serialize(cookie),
    },
  });
}

export default function Preferences() {
  return <div />;
}
