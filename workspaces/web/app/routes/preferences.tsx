import { json } from "@remix-run/node";
import preferences from "~/utils/storage";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

export async function loader(args: LoaderFunctionArgs) {
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  let cookie = await preferences.parse(cookieHeader);
  const formData = await request.formData();

  if (!cookie) {
    cookie = {};
  }

  if (formData.has("theme")) {
    cookie["theme"] = formData.get("theme");
  }

  if (formData.has("experimentalInvert")) {
    cookie["experimentalInvert"] = formData.get("experimentalInvert");
  }

  if (!Object.keys(cookie).length) {
    return json({});
  }

  return json(cookie, {
    headers: {
      "Set-Cookie": await preferences.serialize(cookie),
    },
  });
}

export default function Preferences() {
  return <div />;
}
