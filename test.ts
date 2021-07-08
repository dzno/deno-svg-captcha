import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { makeCaptcha } from "./mod.ts";

const app = new Application();
const router = new Router();

app.use(router.allowedMethods());
app.use(router.routes());

router.get("/captcha", (ctx) => {
  // make new Captcha
  const captcha = makeCaptcha({
    charactersNumber: 5,
  });

  // the content-type of response should be "image/svg+xml"
  // in order for the browser not to display it as plain text
  ctx.response.type = "image/svg+xml";

  // put the svgContext of captcha as response body
  ctx.response.body = captcha.svgContext;

  // set the captcha test as cookie
  ctx.cookies.set("svg_captcha_text", captcha.text, {
    expires: new Date(new Date().getTime() + 36000),
    httpOnly: false,
  });
});
await app.listen({ port: 8000 });
