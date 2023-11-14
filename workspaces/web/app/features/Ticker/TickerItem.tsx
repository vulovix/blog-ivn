import { Link } from "@remix-run/react";
import { PropsWithChildren } from "react";

export default function TickerItem(props: PropsWithChildren<{ path: string }>) {
  return (
    <Link to={props.path} className="ticker-item">
      <div className="ticker-flex">{props.children}</div>
    </Link>
  );
}
