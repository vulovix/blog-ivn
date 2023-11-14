import { Button } from "ui";
import "./style.scss";
import PiCopyrightBold from "/assets/icons/PiCopyrightBold.svg";
import MdInvertColorsOff from "/assets/icons/MdInvertColorsOff.svg";
import MdInvertColors from "/assets/icons/MdInvertColors.svg";
import FaCloudMoon from "/assets/icons/FaCloudMoon.svg";
import BsFillSunFill from "/assets/icons/BsFillSunFill.svg";
// import { useState } from "react";

export default function Footer(): JSX.Element {
  // const { opositeTheme } = useThemeDetector();
  // const experimentalInvertEnabled = useSelector(selectExperimentalInvert);

  // const onThemeChange = () => {
  //   dispatch(themeActions.changeTheme(opositeTheme));
  // };

  // const onExperimentalInvertChange = () => {
  //   dispatch(persistableActions.setExperimentalInvert(!experimentalInvertEnabled));
  // };

  // const onUserLogin = () => {
  //   navigate("/sign-in");
  // };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="align-center">
          <img src={PiCopyrightBold} alt="Copyright" />
          &nbsp;{new Date().getFullYear()} Oaza
        </div>
        <div className="align-center">
          <Button>
            {/* <MdInvertColors /> */}
            <img src={MdInvertColors} alt="Invert on" />
          </Button>
          <Button>
            <img src={MdInvertColorsOff} alt="Invert off" />
          </Button>
          <Button>
            <img src={BsFillSunFill} alt="Light" />
          </Button>
          <Button>
            <img src={FaCloudMoon} alt="Dark" />
          </Button>
          {/* {isLoggedIn ? (
            <></>
          ) : (
            <Button onClick={onUserLogin}>
              <RiShieldUserFill />
            </Button>
          )}
          <Button onClick={onExperimentalInvertChange}>
            {experimentalInvertEnabled ? (
              <MdInvertColorsOff />
            ) : (
              <MdInvertColors />
            )}
          </Button>
          <Button onClick={onThemeChange}>
            {opositeTheme === ThemeEnum.Light ? (
              <BsFillSunFill />
            ) : (
              <FaCloudMoon />
            )}
          </Button> */}
        </div>
      </div>
    </footer>
  );
}
