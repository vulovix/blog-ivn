import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { LoaderFunctionArgs } from "@remix-run/node";
import MainArticle from "~/components/Articles/Main";
import GridArticle from "~/components/Articles/Grid";
import "~/style/articles.scss";
import makeGetRequest from "~/utils/request";

export const meta: MetaFunction<typeof loader> = ({ data, params }) => {
  return [
    { title: `Oaza` },
    {
      name: "keywords",
      content:
        "Oaza, Oasis, Programming, Software Development, Blog, HTML, CSS, React, JavaScript, TypeScript, Redux, Saga, nginx",
    },
    { name: "title", content: "Oaza" },
    { property: "og:title", content: "Oaza" },
    { property: "twitter:title", content: "Oaza" },
    {
      name: "description",
      content:
        "Oaza (Oasis) is a peaceful place where you can sit, relax and read about interesting topics in the life of a software developer.",
    },
    {
      property: "og:description",
      content:
        "Oaza (Oasis) is a peaceful place where you can sit, relax and read about interesting topics in the life of a software developer.",
    },
    {
      property: "twitter:description",
      content:
        "Oaza (Oasis) is a peaceful place where you can sit, relax and read about interesting topics in the life of a software developer.",
    },
    {
      property: "og:image",
      content: "https://oaza.dev/public/meta-social.jpg",
    },
    {
      property: "twitter:image",
      content: "https://oaza.dev/public/meta-social.jpg",
    },
    {
      property: "og:image:alt",
      content: "https://oaza.dev/public/meta-social.jpg",
    },
    {
      property: "twitter:image:alt",
      content: "https://oaza.dev/public/meta-social.jpg",
    },
    { property: "og:url", content: `https://oaza.dev` },
    { property: "og:type", content: "article" },
    { property: "twitter:card", content: "summary_large_image" },
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
  const left = articles.slice(3, 9);
  const right = articles.slice(9, 15);

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
        {/* <div className="ad"></div> */}
        {right.map((article) => (
          <GridArticle key={article._id} {...article} />
        ))}
      </div>
    </div>
  );
}
