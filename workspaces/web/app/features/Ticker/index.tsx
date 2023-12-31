import { Fragment, MutableRefObject, useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";

import TickerItem from "./TickerItem";
import { Loader } from "ui";

import ImageAsync from "~/components/Articles/ImageAsync";
import withClientOnly from "~/hocs/withClientOnly";
import "~/features/Ticker/style.scss";
import { request } from "~/utils/request-lib";
import { Article } from "~/types/global";

function Ticker(): JSX.Element {
  const [articles, setArticles] = useState<Array<Article>>([]);

  useEffect(() => {
    (async function () {
      const response = (await request(
        "/api/articles/public"
      )) as Array<Article>;
      if (response) {
        setArticles(response);
      }
    })();
  }, []);

  if (!articles?.length) {
    return (
      <div className="oasis-ticker empty">
        <div className="ticker">
          <Loader />
        </div>
      </div>
    );
  }
  return (
    <div className="oasis-ticker">
      {/** @ts-ignore */}
      <Marquee autoFill pauseOnHover>
        {articles.map((x: any) => (
          <TickerItem path={`/articles/${x.slug}`} key={x._id}>
            <ImageAsync
              Loader={Fragment}
              src={`/api/articles/public/images/${x.slug}`}
            />
            <span>{x.title}</span>
          </TickerItem>
        ))}
      </Marquee>
    </div>
  );
}

export default withClientOnly(Ticker);
