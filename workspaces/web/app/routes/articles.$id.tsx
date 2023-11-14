import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Article as ArticleType } from "~/types/global";
import Article from "~/features/Article";
import makeGetRequest from "~/utils/request";

export async function loader(args: LoaderFunctionArgs) {
  const response = await makeGetRequest(
    args,
    "/api/articles/public/" + args.params.id
  );
  return response;
}

export default function ArticleDetails(): JSX.Element {
  const article: ArticleType = useLoaderData<typeof loader>();

  return <Article article={article} />;
}
