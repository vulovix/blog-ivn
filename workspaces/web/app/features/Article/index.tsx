import { Loader } from "ui";
import FullArticle from "~/components/Articles/Full";
import { Article } from "~/types/global";
import "./style.scss";

interface ArticleFeatureProps {
  article: Article;
}

export default function Article(props: ArticleFeatureProps): JSX.Element {
  const { article } = props;

  if (!article) {
    return (
      <div className="articles">
        <div className="area-center center">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="articles article">
      <FullArticle {...article} />
    </div>
  );
}
