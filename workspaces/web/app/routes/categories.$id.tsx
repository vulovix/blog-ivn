import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Meta, useLoaderData } from "@remix-run/react";
import MainArticle from "~/components/Articles/Main";
import makeGetRequest from "~/utils/request";
import { Article } from "~/types/global";
import "~/style/categories.scss";

export const meta: MetaFunction<typeof loader> = ({ data, params }) => {
  return [
    { title: `${data[0].categories[0].name} | Categories | Oaza` },
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
