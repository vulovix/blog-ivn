import { Link } from "@remix-run/react";
import { Article } from "~/types/global";
import ImageAsync from "../ImageAsync";
import "./style.scss";
import { formatDate } from "~/utils/date";

export default function MainArticle(props: Article): JSX.Element {
  const { slug, title, subtitle, createdAt } = props;
  return (
    <Link className="main-article" to={`/articles/${props.slug}`}>
      <ImageAsync src={`/api/articles/public/images/${slug}`} />
      <span className="secondary">{formatDate(createdAt)}</span>
      <h1 className="title">{title}</h1>
      <p className="paragraph">{subtitle}</p>
    </Link>
  );
}
