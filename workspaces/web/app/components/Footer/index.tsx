import { Button } from "ui";
import PiCopyrightBold from "/public/assets/icons/PiCopyrightBold.svg";
import MdInvertColorsOff from "/public/assets/icons/MdInvertColorsOff.svg";
import MdInvertColors from "/public/assets/icons/MdInvertColors.svg";
import FaCloudMoon from "/public/assets/icons/FaCloudMoon.svg";
import BsFillSunFill from "/public/assets/icons/BsFillSunFill.svg";
import { PropsWithChildren, useEffect } from "react";
import { useFetcher, useRouteLoaderData } from "@remix-run/react";
import "./style.scss";

export default function Footer(props: PropsWithChildren<unknown>): JSX.Element {
  const fetcher = useFetcher({ key: "preferences" });
  const { theme, experimentalInvert } = useRouteLoaderData("root");
  const optimisticTheme = fetcher.formData?.get("theme") || theme;
  const optimisticExperimentalInvert =
    fetcher.formData?.get("experimentalInvert") || experimentalInvert;

  useEffect(() => {
    document.documentElement.setAttribute("theme", optimisticTheme);
  }, [optimisticTheme]);

  const style = {
    filter: `invert(${Number(theme === "dark")})`,
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="align-center">
          <img style={style} src={PiCopyrightBold} alt="Copyright" />
          &nbsp;{new Date().getFullYear()} Oaza
        </div>
        <fetcher.Form
          method="post"
          action="/preferences"
          className="align-center"
        >
          <Button name="theme" value={optimisticTheme}>
            <img
              src={optimisticTheme === "light" ? FaCloudMoon : BsFillSunFill}
              alt="Theme Icon"
              style={style}
            />
          </Button>
          <Button
            name="experimentalInvert"
            value={optimisticExperimentalInvert}
          >
            <img
              style={style}
              src={
                optimisticExperimentalInvert
                  ? MdInvertColorsOff
                  : MdInvertColors
              }
              alt="Invert Images"
            />
          </Button>
        </fetcher.Form>
      </div>
    </footer>
  );
}
