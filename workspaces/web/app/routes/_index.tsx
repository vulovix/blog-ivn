import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { LoaderFunctionArgs } from "@remix-run/node";
import MainArticle from "~/components/Articles/Main";
import GridArticle from "~/components/Articles/Grid";
import "~/style/articles.scss";
import makeGetRequest from "~/utils/request";

export const meta: MetaFunction = () => {
  return [
    { title: "Oaza" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader(args: LoaderFunctionArgs) {
  const response = await makeGetRequest(args, "/api/articles/public");
  return {
    articles: response,
  };
}
export default function Index() {
  const { articles } = useLoaderData<any>();

  const main = articles.slice(0, 3);
  const left = articles.slice(3, 7);
  const right = articles.slice(7, 10);

  return (
    <div className="articles">
      <div className="area-left">
        {left.map((article) => (
          <GridArticle key={article._id} {...article} />
        ))}
      </div>

      <div className="area-center">
        {main.map((article) => (
          <MainArticle key={article._id} {...article} />
        ))}
      </div>

      <div className="area-right">
        <div className="ad"></div>

        {right.map((article) => (
          <GridArticle key={article._id} {...article} />
        ))}
      </div>
    </div>
  );
}

export const shouldRevalidate = () => false;
