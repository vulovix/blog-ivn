import "./style.scss";
import Editor from "~/components/Editor";
import Image from "../Image";
import ImageAsync from "../ImageAsync";
import { Article } from "~/types/global";

export default function FullArticle(props: Article): JSX.Element {
  const { _id, description, slug, title, subtitle, createdAt } = props;
  return (
    <div className="full-article">
      <ImageAsync src={`/api/articles/public/images/${slug}`} />
      <span className="secondary">{createdAt}</span>
      <h1 className="title">{title}</h1>
      <p className="paragraph">{subtitle}</p>
      <Editor
        id={_id}
        onChange={() => {}}
        name={"editor"}
        readonly={true}
        initialState={description}
      />
    </div>
  );
}
