# SVG Cpatcha

svg captcha generator for Deno

### usage:

```ts
import { makeCaptcha } from "https://deno.land/x/svg_captcha@v1.0.0/mod.ts";

const captcha = makeCaptcha();

const svgContext = captcha.svgContext;

const text = captcha.text;
```

#### Example with oak:

```ts
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { makeCaptcha } from "https://deno.land/x/svg_captcha@v1.0.0/mod.ts";
const app = new Application();
const router = new Router();

app.use(router.allowedMethods());
app.use(router.routes());

router.get("/captcha", (ctx) => {
  // make new Captcha
  const captcha = makeCaptcha();

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
```

### options:

You can customize the captcha according to your needs through the settings
provided by the **module** by passing an object to the function

### 1: Dimensions (height/width)

Determine the height and width of the

```ts
const captcha = makeCaptcha({
  height: 150, // by default: 120
  width: 400, // by default: 300
});
```

### 2: Number of characters

number of characters

```ts
const captcha = makeCaptcha({
  charactersNumber: 7, // by default: 5
});
```

### 3: Text options

Text options Interface

```ts
export interface TextOptions {
  overlap?: boolean;
  color?: string;
  randomColor?: boolean;
  fontSize?: number;
  randomFontSize?: { min: number; max: number };
  rotate?: number;
}
```

Text options setting up

```ts
const captcha = makeCaptcha({
    textOptions: {
        overlap: true,  // (boolean) interlacing and overlapping letters by default: false. NOTE: Enabling this option can make the text too complex sometimes to be comprehensible
        
        color: '#000', // text color (string of hex color) by default: #000 (black)
        
        randomColor: true, // (boolean) generate a random color for each letter default: false NOTE: When this option is enabled, the textColor option will be ignored if it was previously selected
        
        fontSize: 2, // (number) text font size - measuring unit rem
        
        randomFontSize?: {min:number, max:number}, // (object) random text font size for each character You must specify the minimum and the maximum font size - measuring unit rem NOTE: When this option is enabled, the fontSize option will be ignored if it was previously selected
        
        rotate: number, // (number) degree of rotation of letters NOTE: When this option is enabled, the characters are rotated randomly within the specified number range from negative to positive (e.g: textOptions.rotate = 30,// the characters are rotated randomly between 30 and -30 degree) by default: 0
        
        
    }
})
```

### Run test

`[--port=<port>, -p=<port>](default: 3000)`

```shell
deno run --allow-net https://deno.land/x/svg_captcha@v1.0.0/test.ts -p=3000
```
