import { LoaderFunctionArgs } from "@remix-run/node";

export default async function makeGetRequest(
  args: LoaderFunctionArgs,
  url: string
) {
  const { origin } = new URL(args.request.url);
  const res = await fetch(new URL(origin + url));
  return res.json();
}

// export async function makePostRequest(
//   args: LoaderFunctionArgs,
//   url: string,
//   body: any
// ) {
//   const { origin } = new URL(args.request.url);
//   const res = await fetch(new URL(origin + url), {
//     method: "POST",
//     body: body ? JSON.stringify(body) : null,
//   });
//   return res.json();
// }
