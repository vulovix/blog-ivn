import { useRouteLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { LoaderFunctionArgs } from "@remix-run/node";
import MainArticle from "~/components/Articles/Main";
import GridArticle from "~/components/Articles/Grid";
import { Article } from "~/types/global";
import "~/style/articles.scss";
import { Loader } from "ui";

export const meta: MetaFunction = () => {
  return [
    { title: "Oaza" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader(args: LoaderFunctionArgs) {
  return null;
}

export default function Index() {
  const articles = useRouteLoaderData<Array<Article>>("root");
  if (!articles?.length) {
    return (
      <div className="articles">
        <div className="area-center center">
          <Loader />
        </div>
      </div>
    );
  }

  const main = articles.slice(0, 3);
  const left = articles.slice(3, 7);
  const right = articles.slice(7, 10);

  // const [main, left, right] = useMemo(() => {
  //   const m = [];
  //   const l = [];
  //   const r = [];
  //   if (!articles.length) {
  //     return [m, l, r];
  //   }
  //   const size = 4;
  //   let i = 0;
  //   do {
  //     m.push(articles[i]);
  //     l.push(articles[i + size]);
  //     r.push(articles[i + size * i]);
  //     i++;
  //   } while (m.length % size);

  //   return [m, l, r];
  // }, [articles]);

  return (
    <div className="articles">
      <div className="area-left">
        {left.map((article) => (
          <GridArticle key={article._id} {...article} />
        ))}
      </div>

      <div className="area-center">
        {/* <MainArticle {...article1} /> */}
        {main.map((article) => (
          <MainArticle key={article._id} {...article} />
        ))}
      </div>

      <div className="area-right">
        <div className="ad"></div>

        {right.map((article) => (
          <GridArticle key={article._id} {...article} />
        ))}

        {/* {miniArticles.map((article) => (
          <MiniArticle key={article._id} {...article} />
        ))} */}

        {/* {miniArticles.map((article) => (
          <MinimalArticle key={article._id} {...article} />
        ))} */}
      </div>
    </div>
  );
}
