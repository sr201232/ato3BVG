# BVG Aviation Chatbot Setup

## GitHub Pages

Upload these two files to the repository root:

- `bvg-chatbot.css`
- `bvg-chatbot.js`

Then add these lines to `index.html`.

Inside `<head>`:

```html
<link rel="stylesheet" href="bvg-chatbot.css?v=20260709">
```

Just before `</body>`:

```html
<script>
  window.BVG_CHAT_ENDPOINT = "https://YOUR-WORKER-NAME.YOUR-SUBDOMAIN.workers.dev";
</script>
<script src="bvg-chatbot.js?v=20260709"></script>
```

## Cloudflare Workers

Create a Worker and paste `cloudflare-worker.js` into the Worker editor.

Add these environment variables/secrets:

- `GROQ_API_KEY`: your Groq API key
- `GROQ_MODEL`: optional, for example `llama-3.1-8b-instant`

After deployment, copy the Worker URL and replace `YOUR-WORKER-NAME.YOUR-SUBDOMAIN.workers.dev` in `index.html`.

## Notes

- Do not put the Groq API key in `index.html` or `bvg-chatbot.js`.
- The Worker currently allows requests from `bvg.kr`, `http://bvg.kr`, and `sr201232.github.io`.
