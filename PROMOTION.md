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

## 4b. 掘金 —— V2EX 被墙/发不了时的首选替代（国内直连）

> 掘金有两条路：**沸点**（短动态，类似发帖，零门槛）和**专栏文章**（长文，带 SEO 长尾）。
> 冷启动先发沸点，若反馈好，把下面短版扩写成专栏文章再发一次，一鱼两吃。

**沸点版（直接发）**

```
做了个开源小工具 AIStamp：README 里贴一行图片链接，自动从依赖清单
（requirements.txt / package.json / go.mod / Cargo.toml）里识别项目的 AI 技术栈，
渲染成一张实时 SVG 卡片，GitHub 暗色/亮色主题都适配。

- 零配置：不用注册、不用 token、不采集数据
- 识别 30+ SDK：OpenAI、Claude、Gemini、LangChain、vLLM、Ollama、MCP，以及
  国产全家桶——DeepSeek、通义千问、智谱 GLM、Kimi、豆包、百度千帆、讯飞星火、
  MiniMax、百川、魔搭（这些英文同类工具都不认）
- MIT 开源，单个 Cloudflare Worker，自托管一条命令

实测 MetaGPT 仓库：识别出 6 个组件，3 个国产——接了国产模型的中文 AI 项目，
终于有地方展示了。

用法一行：
![AI Stack](https://aistamp.aistamp.workers.dev/card/OWNER/REPO.svg)

仓库：https://github.com/waafer1/aistamp
求真实反馈：你会往自己项目的 README 里贴这种卡片吗，还是觉得是视觉噪音？
（已知限制：monorepo 子目录依赖还识别不到，在路线图上；想加什么 SDK 直接评论）
```

（配图：browser-use 卡片截图或 MetaGPT 卡片截图，二选一，MetaGPT 更能打）

**专栏文章扩写方向**（如果沸点有互动再做）：起因（手写支持列表永远过时）→
实现原理（清单抓取 + 模式匹配 + SVG 渲染 + GitHub camo 的坑）→ 国产 SDK 识别表
怎么维护 → 已知限制和路线图。正文 1500 字以内，掘金读者吃「我是怎么做的」。

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

## 6. Facebook 群组 —— 发之前必看群规

> Facebook 的 AI 群组大多禁止裸推广，管理员删帖不看人。写法必须**以分享 + 提问的
> 姿态进来**：先给一个真实的小观察，再给工具，最后留一个开放问题。链接别放正文
> 第一行（降低被算法降权的概率），截图先上。

**适用群组（发之前逐个看规则）**：英文——"AI Automation Society"、"ChatGPT &
Generative AI"、"OpenAI & LLM Developers"；中文——「AI 创业交流」「独立开发者」类
群组。有 "Self-Promotion Saturday" 之类专属日的群，只在那天发。

**英文版（主用）**

```
Quick share + a question 👇

I kept noticing the same thing in every AI project's README: a manually written
"Works with OpenAI, Claude, Gemini..." line that's always out of date the moment
a new model drops.

So I built a tiny free tool that auto-detects a repo's AI stack from its
dependency files and renders a live card for the README. One line of markdown,
no signup, no token. It even picks up Chinese model SDKs — DeepSeek, Qwen, GLM,
Doubao, Kimi — which most Western badges ignore.

Screenshot below (from the browser-use repo, 118k stars — detected 6 providers
automatically).

Those of you maintaining open-source AI projects: would this be useful in your
README, or does it feel like clutter? Honest feedback welcome 🙏

Repo link in comments.
```

（链接放首条评论。配图：browser-use 卡片截图。）

**中文版**

```
分享一个刚开源的小工具 + 求个建议 🙏

不知道大家有没有同感：AI 开源项目的 README 里总有那句手写的
「支持 OpenAI / Claude / Gemini / DeepSeek...」——每次接新模型都得记得改，忘了就过时。

我做了个免费的：README 里贴一行图片，自动从依赖清单里识别 AI 技术栈，
渲染成一张实时卡片。不用注册不用配置，国产 SDK 是一等公民
（DeepSeek、通义、智谱 GLM、Kimi、豆包、千帆、星火都认）。

截图是 browser-use 的仓库，自动识别出 6 家。

问一下群里的开发者朋友：这种卡片你会贴到自己项目里吗，还是觉得是视觉噪音？
说实话就行，我在收集反馈。

仓库链接放评论里。
```

---

## 7. 自建群组（封面图 + 简介）

> 目的：有一个自己的地盘承接各渠道引来的开发者——别人群发帖是借地，自建群是资产。
> 封面图 `out/group-cover.png`（1536×1024，Facebook 会自动裁切，核心内容居中放置）。

**群组名（推荐）**

```
AIStack Builders —— AI 项目展示与技术栈交流
```

备选：`AIStack 构建者社区`（纯中文）/ `AIStack Builders (AI Dev Showcase)`（纯英文，面向国际）。

**英文简介（Description）**

```
A community for developers building with AI — and showing it.

Post your projects, get feedback, and pin an AIStamp card to your README so
people can see your AI stack at a glance: OpenAI, Claude, Gemini, DeepSeek,
Qwen, GLM, Kimi, Doubao and 30+ more, auto-detected from your dependencies.

What belongs here:
✅ Show & tell: your repos, demos, and launches
✅ Feedback requests: README reviews, stack choices, model comparisons
✅ Registry requests: want an SDK added to AIStamp? Ask here
❌ No spam, no "DM me to earn", no crypto shilling

Free & open source: github.com/waafer1/aistamp
```

**中文简介**

```
给用 AI 做开发的开发者一个地盘：晒项目、要反馈、聊技术选型。

在你的 README 里贴一张 AIStamp 卡片，别人一眼就能看到你的项目接了哪些模型：
OpenAI、Claude、Gemini、DeepSeek、通义、GLM、Kimi、豆包等 30+ 个 SDK，
自动从依赖清单识别，不用注册不用配置。

这里可以发：
✅ 项目展示：仓库、Demo、上线发布
✅ 求反馈：README 点评、模型选型对比
✅ 提需求：想让 AIStamp 识别某个 SDK？群里说，或直接提 PR
❌ 禁止刷屏广告、"私聊带你赚钱"、币圈内容

工具免费开源：github.com/wafer1/aistamp
```

**建群三规则（够用就好，规则越多越冷清）**：
1. 广告仅限「项目展示」类帖，且必须与 AI 开发相关
2. 不允许评论区和私信拉人/带单，见一次踢一次
3. SDK 识别需求优先欢迎——这是产品的需求池

---

## 发布节奏

| 顺序 | 渠道 | 时机 |
|---|---|---|
| 1 | 掘金沸点 / 即刻 | 立即发，当演练——国内直连，反馈快、恶评成本低，先拿真实反馈修文案（V2EX 能上就一起发） |
| 2 | Reddit r/SideProject | 第 2–3 天，根据中文区反馈微调后发 |
| 3 | X 单条 | 与 Reddit 同天 |
| 4 | Facebook 群组 | 与 Reddit 同天或之后——先发 1–2 个群试水，看管理员和评论反应再扩 |
| 5 | Show HN | **最后**，等 monorepo 识别修完再发——HN 用户第一件事就是拿边缘案例砸你 |

**红线自查（发之前过一遍）**：没有编造任何使用数据、没有「对标 shields.io」这类
拉踩、没有求 star 的字眼（HN/V2EX 都反感）、所有声明可验证。
