import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Loader } from "ui";
import MainArticle from "~/components/Articles/Main";
import makeGetRequest from "~/utils/request";
import "~/style/categorized-articles.scss";
import { Article } from "~/types/global";

export async function loader(args: LoaderFunctionArgs) {
  const response = await makeGetRequest(
    args,
    "/api/articles/public/categories/" + args.params.id
  );
  return response;
}

export default function ArticleDetails(): JSX.Element {
  const articles: Array<Article> = useLoaderData<typeof loader>();

  if (!articles?.length) {
    return (
      <div className="articles">
        <div className="area-center center">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="categorized-articles">
      {articles.map((article: Article) => (
        <MainArticle {...article} />
      ))}
    </div>
  );
}
