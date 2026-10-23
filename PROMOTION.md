# AIStamp 推广文案

> 2026-10-23。原则：只说真实存在的（一行接入、零配置、MIT、识别 30+ SDK），
> 不写任何未发生的增长数据。发帖后别自顶，让内容自己跑。

---

## 1. Hacker News（Show HN）—— 流量上限最高，最挑人

**标题**

```
Show HN: AIStamp – AI stack cards for READMEs, detected from dependency manifests
```

**正文**（发帖后立即用同一账号发首评补充细节，是 HN 惯例）：

```
Hi HN! I noticed every AI project's README manually writes "Works with OpenAI,
Claude, Gemini..." — but there's no standard way to show it, and it goes stale
the moment you add a new provider.

AIStamp detects your AI stack automatically. Paste one line:

![AI Stack](https://aistamp.aistamp.workers.dev/card/OWNER/REPO.svg)

The worker fetches your dependency manifests (requirements.txt, pyproject.toml,
package.json, go.mod, Cargo.toml), matches them against a registry of ~30 AI
SDKs (OpenAI, Claude, Gemini, LangChain, vLLM, Ollama, MCP, DeepSeek, Qwen,
GLM, Kimi...), and renders an SVG that adapts to GitHub's dark/light theme.

Zero config: no signup, no token, no data collection. One Cloudflare Worker,
MIT, ~500 lines of code.

Try it: https://aistamp.aistamp.workers.dev
Source: https://github.com/waafer1/aistamp

Known limitation: monorepos with dependencies in subdirectories aren't
detected yet. The registry matching is deliberately conservative — I'd rather
miss a package than show a wrong one. Curious what HN thinks about that tradeoff.
```

> 注意：最后一句是给讨论留的钩子，HN 吃「设计取舍」这一套。别删。

---

## 2. Reddit（r/SideProject 或 r/opensource）

**标题**

```
I built a tool that shows your project's AI stack in your README (zero config, OSS)
```

**正文**

```
Every AI project README has the same manual line: "Works with OpenAI, Claude,
Gemini". It's always outdated and never standardized.

So I made AIStamp: paste one image link into your README, and it auto-detects
your AI stack from requirements.txt / package.json / go.mod / Cargo.toml and
renders a live SVG card.

- No signup, no token, nothing to install
- Detects 30+ SDKs (OpenAI, Claude, Gemini, LangChain, vLLM, Ollama, MCP,
  DeepSeek, Qwen, GLM, Kimi...)
- Theme-aware (GitHub dark/light)
- MIT, self-hostable, single Cloudflare Worker

Live example (browser-use repo):
![demo](https://aistamp.aistamp.workers.dev/card/browser-use/browser-use.svg)

Repo: https://github.com/waafer1/aistamp

Feedback welcome — especially which SDKs you'd want added to the registry.
```

---

## 3. X / Twitter（单条）

```
Your README says "Works with OpenAI, Claude, Gemini..." — manually, forever outdated.

AIStamp detects your AI stack from dependency manifests and renders a live README card.

One line. Zero config. 30+ SDKs. MIT.

github.com/waafer1/aistamp
```

（配图：browser-use 卡片截图。X 上图片是停下滚动的主要原因。）

---

## 4. V2EX（分享创造节点）

**标题**

```
[分享] AIStamp：一行代码让 README 自动显示项目的 AI 技术栈
```

**正文**

```
起因很简单：AI 项目的 README 里都有那么一句「支持 OpenAI / Claude / Gemini」，
手写的，加一个新模型就要记得改，忘了就过时。

做了个工具 AIStamp：README 里贴一行图片链接，自动从依赖清单
（requirements.txt / package.json / go.mod / Cargo.toml / pyproject.toml）
里识别 AI SDK，渲染成一张 SVG 卡片，GitHub 暗色/亮色主题都适配。

使用方式：

![AI Stack](https://aistamp.aistamp.workers.dev/card/OWNER/REPO.svg)

特点：
- 零配置：不用注册、不用 token、不采集任何数据
- 识别 30+ 个 SDK，**国产大模型全家桶一等公民**：DeepSeek、通义千问（DashScope）、
  智谱 GLM、Kimi、豆包（火山方舟）、百度千帆、讯飞星火、MiniMax、百川、魔搭、
  Xinference；以及 OpenAI、Claude、Gemini、LangChain、vLLM、Ollama、MCP 等
- MIT 开源，单个 Cloudflare Worker，想自托管也就一条命令

实测效果（MetaGPT 仓库）：OpenAI、Claude、GLM、Gemini、百度千帆、通义千问——
六个组件里三个国产，这是英文同类工具不会帮你看的东西。

仓库：https://github.com/waafer1/aistamp

已知限制：monorepo 依赖在子目录的还识别不到，在路线图上。
映射表想加什么 SDK 直接提 PR 或回复，加起来是一行的事。
```

---

## 5. 即刻 / 朋友圈（最口语）

```
写了个小工具，解决一个这两天 obsessed 的小问题：

AI 项目的 README 总有一句「支持 OpenAI、Claude、Gemini」——手写的，永远过时。

AIStamp：贴一行图片链接，自动从你的依赖文件里识别 AI 技术栈，渲染成卡片。
零配置、免费、开源。

给开源项目的 README 加上它，像给自己盖了个技术栈的章。

github.com/waafer1/aistamp
```

---

## 发布节奏

| 顺序 | 渠道 | 时机 |
|---|---|---|
| 1 | V2EX / 即刻 | 立即发，当演练——中文区反馈快、恶评成本低，先拿真实反馈修文案 |
| 2 | Reddit r/SideProject | 第 2–3 天，根据中文区反馈微调后发 |
| 3 | X 单条 | 与 Reddit 同天 |
| 4 | Show HN | **最后**，等 monorepo 识别修完再发——HN 用户第一件事就是拿边缘案例砸你 |

**红线自查（发之前过一遍）**：没有编造任何使用数据、没有「对标 shields.io」这类
拉踩、没有求 star 的字眼（HN/V2EX 都反感）、所有声明可验证。
