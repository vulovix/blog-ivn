import { Article } from "~/types/global";
import "./style.scss";
import { Link } from "@remix-run/react";
import { formatDate } from "~/utils/date";

export default function MinimalArticle(props: Article): JSX.Element {
  const { title, createdAt } = props;
  return (
    <Link className="minimal-article" to={`/articles/${props.slug}`}>
      <h1>{title}</h1>
      <span className="secondary">{formatDate(createdAt)}</span>
    </Link>
  );
}
