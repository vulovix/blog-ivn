import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import MainArticle from "~/components/Articles/Main";
import makeGetRequest from "~/utils/request";
import { Article } from "~/types/global";
import "~/style/categories.scss";

export async function loader(args: LoaderFunctionArgs) {
  const response = await makeGetRequest(
    args,
    "/api/articles/public/categories/" + args.params.id
  );
  return response;
}

export default function ArticleDetails(): JSX.Element {
  const articles: Array<Article> = useLoaderData<typeof loader>();

  return (
    <div className="categories">
      {articles.map((article: Article) => (
        <MainArticle key={article._id} {...article} />
      ))}
    </div>
  );
}
