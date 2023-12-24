import {
  unstable_createViteServer,
  unstable_loadViteServerBuild,
} from "@remix-run/dev";
import { createRequestHandler } from "@remix-run/express";
import { installGlobals } from "@remix-run/node";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import express from "express";
import { URL } from "url";
const __dirname = new URL(".", import.meta.url).pathname;

installGlobals();

let vite =
  process.env.NODE_ENV === "production"
    ? undefined
    : await unstable_createViteServer();

const app = express();

app.use(
  "/api",
  createProxyMiddleware({
    target: "https://oaza.dev",
    changeOrigin: true,
    // pathRewrite: { "^/api": "" },
  })
);

// handle asset requests

if (vite) {
  app.use(vite.middlewares);
} else {
  app.use(
    "/build",
    express.static(path.join(__dirname, "public/build"), {
      immutable: true,
      maxAge: "1y",
    })
  );
}
app.use(
  "/public",
  express.static(path.join(__dirname, "public"), { maxAge: "1h" })
);

// handle SSR requests
app.all(
  "*",
  createRequestHandler({
    build: vite
      ? () => unstable_loadViteServerBuild(vite)
      : await import("./build/index.js"),
  })
);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("http://localhost:" + port));
