import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Article as ArticleType } from "~/types/global";
import makeGetRequest from "~/utils/request";
import Editor from "~/components/Editor";
import "~/style/article.scss";
import ImageAsync from "~/components/Articles/ImageAsync";
import { formatDate } from "~/utils/date";

export async function loader(args: LoaderFunctionArgs) {
  const response = await makeGetRequest(
    args,
    "/api/articles/public/" + args.params.id
  );
  return response;
}

export const meta: MetaFunction<typeof loader> = ({ data, params }) => {
  return [
    { title: `${data.title} | Articles | Oaza` },
    {
      name: "keywords",
      content:
        "Oaza, Oasis, Programming, Software Development, Blog, HTML, CSS, React, JavaScript, TypeScript, Redux, Saga, nginx",
    },
    { name: "title", content: data.title },
    { property: "og:title", content: data.title },
    { property: "twitter:title", content: data.title },
    { name: "description", content: data.subtitle },
    { property: "og:description", content: data.subtitle },
    { property: "twitter:description", content: data.subtitle },
    { property: "og:image", content: data.image },
    { property: "twitter:image", content: data.image },
    { property: "og:image:alt", content: data.image },
    { property: "twitter:image:alt", content: data.image },
    {
      property: "og:url",
      content: `https://blog.ivn.dev/articles/${data.slug}`,
    },
    { property: "og:type", content: "article" },
    { property: "twitter:card", content: "summary_large_image" },
  ];
};

export default function ArticleDetails(): JSX.Element {
  const article: ArticleType = useLoaderData<typeof loader>();

  return (
    <div className="article">
      <ImageAsync src={`/api/articles/public/images/${article.slug}`} />
      <span className="secondary">{formatDate(article.createdAt)}</span>
      <h1 className="title">{article.title}</h1>
      <p className="paragraph">{article.subtitle}</p>
      <Editor
        id={article._id}
        onChange={() => {}}
        name={"editor"}
        readonly={true}
        initialState={article.description}
      />
    </div>
  );
}
