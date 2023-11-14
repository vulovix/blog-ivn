import { LoaderFunctionArgs } from "@remix-run/node";

export async function loader(args: LoaderFunctionArgs) {
  return null;
}

export default function Categories(): JSX.Element {
  return (
    <div>
      <h1>/categories route</h1>
    </div>
  );
}
