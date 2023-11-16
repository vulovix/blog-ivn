import { useEffect } from "react";
import { json } from "@remix-run/node";
import preferences from "~/utils/storage";
import { useFetcher, useLoaderData } from "@remix-run/react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { InvertEnum, ThemeEnum } from "~/types/global";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await preferences.parse(cookieHeader)) || {};
  return json({
    // theme: cookie.theme,
    theme: cookie.theme === ThemeEnum.Light ? ThemeEnum.Dark : ThemeEnum.Light,
    experimentalInvert:
      cookie.experimentalInvert == InvertEnum.No
        ? InvertEnum.Yes
        : InvertEnum.No,
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await preferences.parse(cookieHeader)) || {};
  const formData = await request.formData();

  const theme = formData.get("theme");
  cookie.theme = theme;

  const experimentalInvert = formData.get("experimentalInvert");
  cookie.experimentalInvert = experimentalInvert;

  return json(
    {
      theme,
      experimentalInvert,
    },
    {
      headers: {
        "Set-Cookie": await preferences.serialize(cookie),
      },
    }
  );
}

export default function Preferences() {
  const fetcher = useFetcher();
  let { theme, experimentalInvert } = useLoaderData<typeof loader>();

  const getOpositeTheme = (s: ThemeEnum): ThemeEnum => {
    return s === ThemeEnum.Light ? ThemeEnum.Dark : ThemeEnum.Light;
  };

  const getOpositeInvert = (s: InvertEnum): InvertEnum => {
    return s == InvertEnum.No ? InvertEnum.Yes : InvertEnum.No;
  };

  // use optimistic UI to immediately change the UI state
  if (fetcher.formData?.has("theme")) {
    console.log(fetcher.formData.get("theme"));
    theme = getOpositeTheme(fetcher.formData.get("theme"));
  }
  if (fetcher.formData?.has("experimentalInvert")) {
    experimentalInvert = getOpositeInvert(
      fetcher.formData.get("experimentalInvert")
    );
  }

  //   useEffect(() => {
  //     document.documentElement.setAttribute("theme", theme);
  //   }, [theme]);

  return (
    <div>
      <fetcher.Form method="post">
        <button name="theme" value={theme}>
          Switch to {theme === "light" ? "Dark" : "Light"} Theme
        </button>
        <button
          name="experimentalInvert"
          value={
            experimentalInvert == InvertEnum.No ? InvertEnum.Yes : InvertEnum.No
          }
        >
          Experiment Invert
          {experimentalInvert == InvertEnum.No ? InvertEnum.Yes : InvertEnum.No}
          Theme
        </button>
      </fetcher.Form>
      <aside hidden={theme === "light"}>Go Dark</aside>
      <aside hidden={theme === "dark"}>Go Light</aside>
    </div>
  );
}
