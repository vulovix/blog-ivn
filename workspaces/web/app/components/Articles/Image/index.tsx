// import { selectThemeKey } from "@web/providers/Theme/selectors";
// import { useMemo } from "react";
// import { useSelector } from "@web/core";
// import { ThemeEnum } from "@web/providers/Theme/types";
// import { selectExperimentalInvert } from "@web/slices/persisted/selectors";

export enum ThemeEnum {
  Dark = "dark",
  Light = "light",
}
import { useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { useMemo } from "react";

export default function Image({ src }: { src: string }): JSX.Element {
  const { theme, experimentalInvert } = useRouteLoaderData("root");
  const experimentalInvertEnabled = experimentalInvert == 1;

  const filter = useMemo(() => {
    if (!experimentalInvertEnabled) {
      return undefined;
    }
    const isPng = src.startsWith("data:image/png") || src.endsWith(".png");
    if (!isPng) {
      return undefined;
    }
    return theme === ThemeEnum.Dark ? "invert(1)" : "invert(0)";
  }, [theme, experimentalInvertEnabled]);

  const backgroundColor = useMemo(() => {
    switch (theme) {
      case ThemeEnum.Dark: {
        if (experimentalInvertEnabled) {
          return "var(--background-invert)";
        }
        return "var(--background-invert)";
      }
      case ThemeEnum.Light: {
        return "var(--background)";
      }
      default:
        return "var(--background)";
    }
  }, [theme, experimentalInvertEnabled]);

  return (
    <div
      className="img"
      style={{
        backgroundColor,
        backgroundImage: `url(` + src + `)`,
        filter: filter,
      }}
    ></div>
  );
}
