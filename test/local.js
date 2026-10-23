// 本地测试：对真实 GitHub 仓库跑识别引擎 + 渲染，输出 SVG 到 out/
// 用法: node test/local.js [GITHUB_TOKEN]
import { MANIFESTS } from "../src/detect.js";
import { renderCard } from "../src/card.js";
import { buildStack, apiManifestFetcher } from "../src/worker.js";
import { writeFileSync, mkdirSync } from "node:fs";

const token = process.argv[2] || process.env.GITHUB_TOKEN || "";
const ghHeaders = { "User-Agent": "aistamp-local" };
if (token) ghHeaders.Authorization = `Bearer ${token}`;
const fetchManifest = apiManifestFetcher(ghHeaders);

const REPOS = [
  ["browser-use", "browser-use"],           // agent 框架，多用多家模型
  ["open-webui", "open-webui"],             // 本地 LLM WebUI
  ["danny-avila", "LibreChat"],             // 多模型聊天
  ["crewAIInc", "crewAI"],                  // multi-agent
  ["stanford-oval", "storm"],               // 学术写作 agent
  ["lobehub", "lobe-chat"],                 // 中文知名聊天 UI
];

mkdirSync("out", { recursive: true });

for (const [owner, repo] of REPOS) {
  const t0 = Date.now();
  const stack = await buildStack(owner, repo, fetchManifest);
  const meta = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers: ghHeaders })
    .then((r) => (r.ok ? r.json() : null))
    .catch(() => null);
  const svg = renderCard({
    owner,
    repo,
    description: meta ? meta.description : null,
    stars: meta ? meta.stargazers_count : null,
    forks: meta ? meta.forks_count : null,
    stack,
    dark: true,
  });
  writeFileSync(`out/${repo}.svg`, svg);
  console.log(
    `${owner}/${repo.padEnd(20)} ${(Date.now() - t0 + "ms").padStart(6)}  star=${String(meta ? meta.stargazers_count : "?").padStart(7)}  栈: ${stack.map((s) => s.name).join(", ") || "(未识别)"}`
  );
}
