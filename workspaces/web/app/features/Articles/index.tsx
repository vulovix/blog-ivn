// import MiniArticle from "~/components/Articles/Mini";
// import MinimalArticle from "~/components/Articles/Minimal";
import MainArticle from "~/components/Articles/Main";
import GridArticle from "~/components/Articles/Grid";
import { Loader } from "ui";
import { useRouteLoaderData } from "@remix-run/react";
import { Article } from "~/types/global";
import "~/features/Articles/style.scss";

export default function Articles(): JSX.Element {
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

  const mainArticles = articles.slice(0, 3);
  const gridArticles = articles.slice(3, 7);
  const miniArticles = articles.slice(7, 10);
  //   const minimalArticles = articles.slice(10, 14);

  return (
    <div className="articles">
      <div className="area-left">
        {/* <SplitArticle {...article1} /> */}
        {gridArticles.map((article) => (
          <GridArticle key={article._id} {...article} />
        ))}
      </div>

      <div className="area-center">
        {/* <MainArticle {...article1} /> */}
        {mainArticles.map((article) => (
          <MainArticle key={article._id} {...article} />
        ))}
      </div>

      <div className="area-right">
        <div className="ad"></div>

        {miniArticles.map((article) => (
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
