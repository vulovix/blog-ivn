import { redirect } from "@remix-run/node";

export async function loader() {
  return redirect("/");
}

export default function Categories(): JSX.Element {
  return <></>;
}
