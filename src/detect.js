// 识别引擎：从仓库的依赖清单里识别 AI SDK / 模型栈
// 输入：各清单文件的文本内容；输出：[{ id, name, color }]（去重、按出现顺序）

// 依赖名 → [显示名, 品牌色]（品牌色取各家官网/常见 README 用色）
const PY_DEPS = {
  openai: ["OpenAI", "#10a37f"],
  anthropic: ["Claude", "#d97757"],
  "google-generativeai": ["Gemini", "#4285f4"],
  "google-genai": ["Gemini", "#4285f4"],
  litellm: ["LiteLLM", "#7c3aed"],
  langchain: ["LangChain", "#1c4040"],
  "langgraph": ["LangGraph", "#1c4040"],
  transformers: ["HuggingFace", "#ffb800"],
  datasets: ["HuggingFace", "#ffb800"],
  sentence_transformers: ["SentenceTransformers", "#ffb800"],
  accelerate: ["HuggingFace", "#ffb800"],
  vllm: ["vLLM", "#ee4c2c"],
  ollama: ["Ollama", "#e5e7eb"],
  "huggingface_hub": ["HuggingFace", "#ffb800"],
  diffusers: ["Diffusers", "#ffb800"],
  together: ["Together AI", "#0f6fff"],
  groq: ["Groq", "#f55036"],
  mistralai: ["Mistral", "#ff7000"],
  cohere: ["Cohere", "#39594d"],
  "deepseek": ["DeepSeek", "#4d6bfe"],
  "dashscope": ["Qwen (DashScope)", "#615ced"],
  "zhipuai": ["GLM (Zhipu)", "#3b82f6"],
  "moonshot": ["Kimi (Moonshot)", "#1a1a1a"],
  "openai-agents": ["OpenAI Agents", "#10a37f"],
  "mcp": ["MCP", "#0f9d58"],
  "modelcontextprotocol": ["MCP", "#0f9d58"],
};

const NODE_DEPS = {
  openai: ["OpenAI", "#10a37f"],
  "@anthropic-ai/sdk": ["Claude", "#d97757"],
  "@google/generative-ai": ["Gemini", "#4285f4"],
  "@google/genai": ["Gemini", "#4285f4"],
  "langchain": ["LangChain", "#1c4040"],
  "@langchain/core": ["LangChain", "#1c4040"],
  "@langchain/langgraph": ["LangGraph", "#1c4040"],
  "@huggingface/inference": ["HuggingFace", "#ffb800"],
  "ollama": ["Ollama", "#e5e7eb"],
  "together-ai": ["Together AI", "#0f6fff"],
  "groq-sdk": ["Groq", "#f55036"],
  "@mistralai/mistralai": ["Mistral", "#ff7000"],
  "cohere-ai": ["Cohere", "#39594d"],
  "@modelcontextprotocol/sdk": ["MCP", "#0f9d58"],
  "ai": ["Vercel AI SDK", "#000000"],
};

const GO_DEPS = {
  "github.com/sashabaranov/go-openai": ["OpenAI", "#10a37f"],
  "github.com/anthropics/anthropic-sdk-go": ["Claude", "#d97757"],
  "github.com/tmc/langchaingo": ["LangChain", "#1c4040"],
  "github.com/ollama/ollama": ["Ollama", "#e5e7eb"],
  "github.com/google/generative-ai-go": ["Gemini", "#4285f4"],
};

const CARGO_DEPS = {
  "async-openai": ["OpenAI", "#10a37f"],
  "anthropic": ["Claude", "#d97757"],
  "genai": ["Gemini", "#4285f4"],
  "langchain-rust": ["LangChain", "#1c4040"],
};

function uniqPush(out, seen, id, name, color) {
  if (!id || !name) return;
  const key = name.toLowerCase();
  if (seen.has(key)) return;
  seen.add(key);
  out.push({ id, name, color });
}

export function parseRequirements(text, out, seen) {
  for (let line of text.split("\n")) {
    line = line.trim();
    if (!line || line.startsWith("#") || line.startsWith("-")) continue;
    const name = line.split(/[=<>~!\[; ]/)[0].trim().toLowerCase().replace(/_/g, "-");
    const hit = PY_DEPS[name] || PY_DEPS[name.replace(/-/g, "_")];
    if (hit) uniqPush(out, seen, name, hit[0], hit[1]);
  }
}

export function parsePyproject(text, out, seen) {
  // [project] dependencies 数组 + [tool.poetry.dependencies] 段
  const depBlock = text.match(/dependencies\s*=\s*\[([\s\S]*?)\]/);
  if (depBlock) parseRequirements(depBlock[1].replace(/"/g, "\n"), out, seen);
  const poetry = text.match(/\[tool\.poetry\.dependencies\]([\s\S]*?)(\n\[|$)/);
  if (poetry) {
    for (let line of poetry[1].split("\n")) {
      const m = line.match(/^\s*([A-Za-z0-9_.-]+)\s*=/);
      if (m) {
        const name = m[1].toLowerCase().replace(/_/g, "-");
        const hit = PY_DEPS[name] || PY_DEPS[name.replace(/-/g, "_")];
        if (hit) uniqPush(out, seen, name, hit[0], hit[1]);
      }
    }
  }
}

export function parsePackageJson(text, out, seen) {
  let j;
  try { j = JSON.parse(text); } catch { return; }
  const deps = Object.assign({}, j.dependencies, j.devDependencies, j.peerDependencies);
  for (const key of Object.keys(deps || {})) {
    const hit = NODE_DEPS[key];
    if (hit) uniqPush(out, seen, key, hit[0], hit[1]);
  }
}

export function parseGoMod(text, out, seen) {
  for (let line of text.split("\n")) {
    const m = line.match(/^\s*([\w./-]+)\s+v[\w.-]/);
    if (m) {
      const hit = GO_DEPS[m[1]];
      if (hit) uniqPush(out, seen, m[1], hit[0], hit[1]);
    }
  }
}

export function parseCargoToml(text, out, seen) {
  const deps = text.match(/\[dependencies\]([\s\S]*?)(\n\[|$)/);
  if (!deps) return;
  for (let line of deps[1].split("\n")) {
    const m = line.match(/^\s*([A-Za-z0-9_-]+)\s*=/);
    if (m) {
      const hit = CARGO_DEPS[m[1]];
      if (hit) uniqPush(out, seen, m[1], hit[0], hit[1]);
    }
  }
}

// 探测仓库中存在的清单文件（按优先级）
export const MANIFESTS = [
  { path: "requirements.txt", parse: parseRequirements },
  { path: "pyproject.toml", parse: parsePyproject },
  { path: "package.json", parse: parsePackageJson },
  { path: "go.mod", parse: parseGoMod },
  { path: "Cargo.toml", parse: parseCargoToml },
];
