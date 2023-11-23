import "./style.scss";
import ImageAsync from "../ImageAsync";
import { Link } from "@remix-run/react";
import { Article } from "~/types/global";
import { formatDate } from "~/utils/date";

export default function MiniArticle(props: Article): JSX.Element {
  const { slug, title, createdAt } = props;
  return (
    <Link className="mini-article" to={`/articles/${props.slug}`}>
      <ImageAsync src={`/api/articles/public/images/${slug}`} />
      <div className="info">
        <h1>{title}</h1>
        <span className="secondary">{formatDate(createdAt)}</span>
      </div>
    </Link>
  );
}
