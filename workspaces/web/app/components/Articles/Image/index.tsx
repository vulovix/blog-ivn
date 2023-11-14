// import { selectThemeKey } from "@web/providers/Theme/selectors";
// import { useMemo } from "react";
// import { useSelector } from "@web/core";
// import { ThemeEnum } from "@web/providers/Theme/types";
// import { selectExperimentalInvert } from "@web/slices/persisted/selectors";

export enum ThemeEnum {
  Dark = "dark",
  Light = "light",
}
import { useMemo } from "react";

export default function Image({ src }: { src: string }): JSX.Element {
  const themeKey = ThemeEnum.Light; // useSelector(selectThemeKey);
  const experimentalInvertEnabled = false; // useSelector(selectExperimentalInvert);

  const filter = useMemo(() => {
    if (!experimentalInvertEnabled) {
      return undefined;
    }
    const isPng = src.startsWith("data:image/png") || src.endsWith(".png");
    if (!isPng) {
      return undefined;
    }
    return themeKey === ThemeEnum.Dark ? "invert(1)" : "invert(0)";
  }, [themeKey, experimentalInvertEnabled]);

  const backgroundColor = useMemo(() => {
    switch (themeKey) {
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
  }, [themeKey, experimentalInvertEnabled]);

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
