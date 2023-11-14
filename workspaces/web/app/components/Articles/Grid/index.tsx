import "./style.scss";
import ImageAsync from "../ImageAsync";
import { Article } from "~/types/global";
import { Link } from "@remix-run/react";

export default function GridArticle(props: Article): JSX.Element {
  const { slug, title, subtitle, createdAt } = props;
  return (
    <Link className="grid-article" to={`/articles/${props.slug}`}>
      <div>
        <ImageAsync src={`/api/articles/public/images/${slug}`} />
        <div className="info">
          <h1 className="title">{title}</h1>
          <span className="secondary">
            {createdAt}
            {/* <FormattedDate value={createdAt} dateStyle="medium" /> */}
          </span>
        </div>
      </div>
      <p className="paragraph">{subtitle}</p>
    </Link>
  );
}
