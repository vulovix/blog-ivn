import { createProxyMiddleware } from "http-proxy-middleware";
import { createRequestHandler } from "@remix-run/express";
import { installGlobals } from "@remix-run/node";
import express from "express";
import path from "path";
import { URL } from "url";
const __dirname = new URL(".", import.meta.url).pathname;

installGlobals();

const viteDevServer =
  process.env.NODE_ENV === "production"
    ? undefined
    : await import("vite").then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        })
      );

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
if (viteDevServer) {
  app.use(viteDevServer.middlewares);
} else {
  app.use(
    "/assets",
    express.static(path.join(__dirname, "build/client/assets"), {
      immutable: true,
      maxAge: "1y",
    })
  );
}
app.use(
  "/public",
  express.static(path.join(__dirname, "public"), { maxAge: "1h" })
);
app.use(express.static(path.join(__dirname, "build/client"), { maxAge: "1h" }));

// handle SSR requests
app.all(
  "*",
  createRequestHandler({
    build: viteDevServer
      ? () => viteDevServer.ssrLoadModule("virtual:remix/server-build")
      : await import("./build/server/index.js"),
  })
);

const port = 3000;
app.listen(port, () => console.log("http://localhost:" + port));
