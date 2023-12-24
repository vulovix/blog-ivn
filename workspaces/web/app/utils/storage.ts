import { createCookie } from "@remix-run/node";

const preferences = createCookie("preferences");

export default preferences;
