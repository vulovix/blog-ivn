import { useEffect, useState } from "react";
import "./style.scss";
import { Link, useParams } from "@remix-run/react";
import { request } from "~/utils/request-lib";
import withClientOnly from "~/hocs/withClientOnly";
import { Category } from "~/types/global";

function CategoriesFilter(): JSX.Element {
  const [categories, setCategories] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    (async function () {
      const categories = await request("/api/categories/public");
      if (categories) {
        setCategories(categories);
      }
    })();
  }, []);
  return (
    <div className="categories-filter">
      {/* <button>
        <svg viewBox="0 0 16 16" height="1em" width="0"></svg>
      </button> */}
      <ul>
        {categories?.map((category: Category): JSX.Element => {
          const isActive = id === category.slug;
          return (
            <li key={category._id} className={isActive ? "active" : undefined}>
              <Link to={`${isActive ? "/" : "/categories/" + category.slug}`}>
                {category.name}
              </Link>
            </li>
          );
        })}
      </ul>
      {/* <button><BiSearch /></button> */}
    </div>
  );
}

export default withClientOnly(CategoriesFilter);
