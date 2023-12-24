import { Link } from "@remix-run/react";
import "./style.scss";

export default function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <img className="invert" src="/public/favicon64x64.png" alt="Logo" />
          <h1>Oaza</h1>
        </Link>
      </div>
    </header>
  );
}
