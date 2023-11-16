import {
  useFetcher,
  useLoaderData,
  useRouteLoaderData,
} from "@remix-run/react";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import MainArticle from "~/components/Articles/Main";
import GridArticle from "~/components/Articles/Grid";
import { Article, InvertEnum, ThemeEnum } from "~/types/global";
import "~/style/articles.scss";
import { Loader } from "ui";
import preferences from "~/utils/storage";

export async function action({ request }: ActionFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await preferences.parse(cookieHeader)) || {};
  const formData = await request.formData();

  const theme = formData.get("theme");
  cookie.theme = theme;

  const experimentalInvert = formData.get("experimentalInvert");
  cookie.experimentalInvert = experimentalInvert;

  return json(
    {
      theme,
      experimentalInvert,
    },
    {
      headers: {
        "Set-Cookie": await preferences.serialize(cookie),
      },
    }
  );
}

export const meta: MetaFunction = () => {
  return [
    { title: "Oaza" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader(args: LoaderFunctionArgs) {
  return null;
}

export default function Index() {
  const { articles } = useRouteLoaderData<any>("root");

  const main = articles.slice(0, 3);
  const left = articles.slice(3, 7);
  const right = articles.slice(7, 10);

  return (
    <div className="articles">
      <div className="area-left">
        {left.map((article) => (
          <GridArticle key={article._id} {...article} />
        ))}
      </div>

      <div className="area-center">
        {/* <MainArticle {...article1} /> */}
        {main.map((article) => (
          <MainArticle key={article._id} {...article} />
        ))}
      </div>

      <div className="area-right">
        <div className="ad"></div>

        {right.map((article) => (
          <GridArticle key={article._id} {...article} />
        ))}

        {/* {miniArticles.map((article) => (
          <MiniArticle key={article._id} {...article} />
        ))} */}

        {/* {miniArticles.map((article) => (
          <MinimalArticle key={article._id} {...article} />
        ))} */}
      </div>
    </div>
  );
}
