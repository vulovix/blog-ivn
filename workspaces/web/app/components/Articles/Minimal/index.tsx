import { Article } from "~/types/global";
import "./style.scss";
import { Link } from "@remix-run/react";

export default function MinimalArticle(props: Article): JSX.Element {
  const { title, createdAt } = props;
  return (
    <Link className="minimal-article" to={`/articles/${props.slug}`}>
      <h1>{title}</h1>
      <span className="secondary">
        {/* <FormattedDate value={createdAt} dateStyle="medium" /> */}
        {createdAt}
      </span>
    </Link>
  );
}
