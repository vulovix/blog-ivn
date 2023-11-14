import { LoaderFunctionArgs } from "@remix-run/node";

export async function loader(args: LoaderFunctionArgs) {
  return null;
}

interface ArticlesProps {}

export default function Articles(props: ArticlesProps): JSX.Element {
  return (
    <div>
      <h1>/articles route</h1>
    </div>
  );
}
