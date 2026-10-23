# AIStamp

**AI stack cards for your README — zero config.**

Paste one line into your README. Get a live card showing the AI stack your project
actually uses — detected from your dependency manifests. No account, no token, no setup.

![AI Stack](https://aistamp.aistamp.workers.dev/card/browser-use/browser-use.svg)

## Usage

```markdown
![AI Stack](https://aistamp.aistamp.workers.dev/card/OWNER/REPO.svg)
```

That's it. Replace `OWNER/REPO` with any public GitHub repository.

Example for this very repo:

```markdown
![AI Stack](https://aistamp.aistamp.workers.dev/card/waafer1/aistamp.svg)
```

## How it works

1. Fetches your repo's dependency manifests: `requirements.txt`, `pyproject.toml`,
   `package.json`, `go.mod`, `Cargo.toml`
2. Matches dependencies against a curated registry of AI SDKs and model providers
3. Renders an SVG card — GitHub dark/light theme aware

No data is collected. The card is generated on each request (cached 30 min).

## Detected packages (v1)

OpenAI · Claude · Gemini · LangChain / LangGraph · LiteLLM · HuggingFace
(transformers / datasets / diffusers / hub) · vLLM · Ollama · Together AI · Groq ·
Mistral · Cohere · MCP · Vercel AI SDK · SentenceTransformers

**Chinese model providers, first-class support:**

DeepSeek · Qwen (DashScope) · GLM (Zhipu) · Kimi (Moonshot) · Doubao (火山方舟) ·
Qianfan (百度千帆) · Spark (讯飞星火) · MiniMax · Baichuan · ModelScope (魔搭) ·
Xinference

Missing your favorite? PRs welcome — add one entry to `src/detect.js`.

## Self-hosting

It's a single Cloudflare Worker:

```bash
npm install -g wrangler
wrangler deploy
```

Optionally set `GITHUB_TOKEN` as a Worker secret to raise the GitHub API rate limit
(anonymous: 60 req/h per IP; token: 5,000 req/h).

## License

MIT
