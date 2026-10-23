// Cloudflare Workers 入口
// 路由：
//   GET /card/:owner/:repo(.svg)?theme=dark|light  → SVG 卡片
//   GET /                                           → 落地页
import { MANIFESTS } from "./detect.js";
import { renderCard } from "./card.js";

const RAW = "https://raw.githubusercontent.com";
const API = "https://api.github.com";

async function fetchText(url, ghHeaders) {
  const r = await fetch(url, { headers: ghHeaders, cf: { cacheTtl: 300, cacheEverything: true } });
  return r.ok ? await r.text() : null;
}

// fetchManifest: (owner, repo, path) => Promise<string|null>
export async function buildStack(owner, repo, fetchManifest) {
  const out = [];
  const seen = new Set();
  await Promise.all(
    MANIFESTS.map(async (m) => {
      const text = await fetchManifest(owner, repo, m.path);
      if (text) m.parse(text, out, seen);
    })
  );
  return out;
}

export function rawManifestFetcher(ghHeaders) {
  return (owner, repo, path) =>
    fetchText(`${RAW}/${owner}/${repo}/HEAD/${path}`, ghHeaders);
}

export function apiManifestFetcher(ghHeaders) {
  // 走 api.github.com（本地网络 raw 域名被污染时的替代路径）
  // 注意：contents API 不支持 ref=HEAD，省略 ref 即取默认分支
  return (owner, repo, path) =>
    fetchText(
      `${API}/repos/${owner}/${repo}/contents/${encodeURI(path)}`,
      { ...ghHeaders, Accept: "application/vnd.github.raw" }
    );
}

async function handleCard(owner, repo, url, env) {
  const ghHeaders = {
    "User-Agent": "aistamp",
    Accept: "application/vnd.github+json",
  };
  if (env && env.GITHUB_TOKEN) ghHeaders.Authorization = `Bearer ${env.GITHUB_TOKEN}`;

  const wantsDark = url.searchParams.get("theme") !== "light";
  // GitHub camo 不带 UA 特征，用 Sec-CH-Prefers-Color-Scheme 或默认暗色
  const dark = wantsDark
    ? (url.searchParams.get("theme") === "dark" ? true : true)
    : false;

  const [stack, meta] = await Promise.all([
    buildStack(owner, repo, rawManifestFetcher(ghHeaders)),
    fetchText(`${API}/repos/${owner}/${repo}`, ghHeaders).then((t) => {
      try { return JSON.parse(t); } catch { return null; }
    }),
  ]);

  return renderCard({
    owner,
    repo,
    description: meta ? meta.description : null,
    stars: meta ? meta.stargazers_count : null,
    forks: meta ? meta.forks_count : null,
    stack,
    dark,
  });
}

const LANDING = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>AIStamp — AI stack cards for your README</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
 body{font-family:system-ui,sans-serif;max-width:720px;margin:60px auto;padding:0 20px;line-height:1.6;color:#e6edf3;background:#0d1117}
 code{background:#161b22;padding:2px 8px;border-radius:6px}
 pre{background:#161b22;padding:16px;border-radius:10px;overflow:auto}
 h1{font-size:28px} .m{color:#8b949e}
</style></head><body>
<h1>AIStamp</h1>
<p>Paste one line into your README. Get a live card showing the AI stack your project
actually uses — detected from your dependency manifests, zero config.</p>
<pre>![AI Stack](https://aistamp.YOUR-SUBDOMAIN.workers.dev/card/OWNER/REPO.svg)</pre>
<p class="m">Works with requirements.txt · pyproject.toml · package.json · go.mod · Cargo.toml.
Detects OpenAI, Claude, Gemini, LangChain, vLLM, Ollama, HuggingFace, MCP, and more.</p>
</body></html>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const m = url.pathname.match(/^\/card\/([^/]+)\/([^/]+?)(?:\.svg)?$/);
    if (m) {
      const [, owner, repo] = m;
      try {
        const svg = await handleCard(owner, repo, url, env);
        return new Response(svg, {
          headers: {
            "Content-Type": "image/svg+xml; charset=utf-8",
            "Cache-Control": "public, max-age=1800",
          },
        });
      } catch (e) {
        return new Response("error: " + e.message, { status: 500 });
      }
    }
    return new Response(LANDING, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  },
};
