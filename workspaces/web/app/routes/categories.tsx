import { Outlet } from "@remix-run/react";

export async function loader() {
  return null;
}

export const shouldRevalidate = () => false;

export default Outlet;
