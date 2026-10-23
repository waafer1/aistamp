// SVG 卡片渲染：GitHub 亮/暗主题自适应（prefers-color-scheme）
// 布局：左列仓库信息，右列 AI 栈 pill；宽度按内容自适应，高度固定 132

const FONT = "Segoe UI,Ubuntu,Sans-Serif";

function esc(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// 粗略估宽：CJK 按 11px/字，其余 6.6px/字符
function textWidth(s) {
  let w = 0;
  for (const ch of String(s)) w += ch.charCodeAt(0) > 0x2e7f ? 11 : 6.6;
  return w;
}

function pill(x, y, name, color, dark) {
  const w = Math.ceil(textWidth(name) + 24);
  const fg = dark ? "#e6edf3" : "#1f2328";
  const border = dark ? "#30363d" : "#d0d7de";
  const bg = dark ? "#161b22" : "#ffffff";
  const dot = color === "#e5e7eb" || color === "#1a1a1a" ? (dark ? "#9ca3af" : "#6b7280") : color;
  return {
    w,
    svg: `<g transform="translate(${x},${y})">
  <rect width="${w}" height="26" rx="6" fill="${bg}" stroke="${border}"/>
  <circle cx="13" cy="13" r="4" fill="${dot}"/>
  <text x="24" y="17" font-family="${FONT}" font-size="12" font-weight="600" fill="${fg}">${esc(name)}</text>
</g>`,
  };
}

export function renderCard({ owner, repo, description, stars, forks, stack, dark }) {
  const c = dark
    ? { bg: "#0d1117", border: "#30363d", fg: "#e6edf3", muted: "#8b949e", accent: "#58a6ff" }
    : { bg: "#ffffff", border: "#d0d7de", fg: "#1f2328", muted: "#656d76", accent: "#0969da" };

  const repoFull = `${owner}/${repo}`;
  const titleW = Math.ceil(textWidth(repoFull)) + 8;
  const desc = description
    ? (description.length > 64 ? description.slice(0, 61) + "…" : description)
    : "";

  // pill 排布：右列从上往下，最多 8 个，超出收进 "+N"
  const shown = stack.slice(0, 8);
  const extra = stack.length - shown.length;
  if (shown.length === 0) {
    shown.push({ name: "no AI deps detected", color: "#8b949e" });
  }
  const pills = [];
  let y = 24;
  let maxPillW = 0;
  for (const s of shown) {
    const p = pill(0, 0, s.name, s.color, dark);
    maxPillW = Math.max(maxPillW, p.w);
    p.y = y;
    y += 32;
    pills.push(p);
  }
  if (extra > 0) {
    const p = pill(0, 0, `+${extra} more`, "#8b949e", dark);
    maxPillW = Math.max(maxPillW, p.w);
    p.y = y;
    pills.push(p);
  }
  const pillColX = 24;
  const infoColX = pillColX + maxPillW + 28;
  const width = Math.max(420, infoColX + Math.max(titleW, textWidth(desc)) + 24);
  const height = Math.max(132, y + 18);

  const starIcon = `<path fill="${c.muted}" d="M8 1.5l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.3l-3.8 2 .7-4.3-3.1-3 4.3-.6L8 1.5z" transform="translate(0,0)"/>`;

  let info = `
  <text x="${infoColX}" y="38" font-family="${FONT}" font-size="16" font-weight="700" fill="${c.accent}">${esc(repoFull)}</text>`;
  if (desc) {
    info += `\n  <text x="${infoColX}" y="60" font-family="${FONT}" font-size="11.5" fill="${c.muted}">${esc(desc)}</text>`;
  }
  info += `
  <g transform="translate(${infoColX},${height - 34})">
    <path fill="${c.muted}" d="M8 .8l2.1 4.2 4.6.7-3.3 3.3.8 4.6L8 11.4l-4.2 2.2.8-4.6L1.3 5.7l4.6-.7L8 .8z"/>
    <text x="15" y="11" font-family="${FONT}" font-size="11" font-weight="600" fill="${c.fg}">${stars ?? "–"}</text>
    <text x="${15 + textWidth(String(stars ?? "")) + 22}" y="11" font-family="${FONT}" font-size="11" font-weight="600" fill="${c.fg}">${forks ?? 0}</text>
    <g transform="translate(${13 + textWidth(String(stars ?? "")) + 8},0)"><path fill="${c.muted}" d="M5 3.5a1.8 1.8 0 11-3.6 0 1.8 1.8 0 013.6 0zM9.5 6.5h4v1.6h-4a2.2 2.2 0 100 3.4h1.6V10h-1.5a.9.9 0 110-1.8h3.2v4.4H9.5a3.8 3.8 0 110-7.6z"/></g>
    <text x="${infoColX + 60}" y="11" font-family="${FONT}" font-size="10" fill="${c.muted}"> </text>
  </g>
  <text x="${infoColX}" y="${height - 38}" font-family="${FONT}" font-size="9.5" letter-spacing="1.5" fill="${c.muted}">AI STACK</text>`;

  const pillSvg = pills
    .map((p) => `<g transform="translate(${pillColX},${p.y})">${p.svg.replace(/^<g transform="translate\(0,0\)">/, "").replace(/<\/g>$/, "</g>")}`)
    .join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">
  <style>svg{background-color:transparent}</style>
  <rect width="100%" height="100%" rx="10" fill="${c.bg}" stroke="${c.border}"/>
  ${info}
  ${pillSvg}
</svg>`;
}
