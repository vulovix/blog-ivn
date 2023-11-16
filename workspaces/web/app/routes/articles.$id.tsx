import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Article as ArticleType } from "~/types/global";
import makeGetRequest from "~/utils/request";
import Editor from "~/components/Editor";
import "~/style/article.scss";
import ImageAsync from "~/components/Articles/ImageAsync";

export async function loader(args: LoaderFunctionArgs) {
  const response = await makeGetRequest(
    args,
    "/api/articles/public/" + args.params.id
  );
  return response;
}

export default function ArticleDetails(): JSX.Element {
  const article: ArticleType = useLoaderData<typeof loader>();

  return (
    <div className="article">
      <ImageAsync src={`/api/articles/public/images/${article.slug}`} />
      <span className="secondary">{article.createdAt}</span>
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
