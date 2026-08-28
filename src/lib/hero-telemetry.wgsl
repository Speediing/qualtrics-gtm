struct Params {
  time: f32,
  texel: vec2f,
}

@group(0) @binding(0) var<uniform> params: Params;

fn sdBox(p: vec2f, b: vec2f) -> f32 {
  let d = abs(p) - b;
  return length(max(d, vec2f(0.0))) + min(max(d.x, d.y), 0.0);
}

fn sdRoundedBox(p: vec2f, b: vec2f, r: f32) -> f32 {
  return sdBox(p, max(b - vec2f(r), vec2f(0.0))) - r;
}

fn sdEllipse(p: vec2f, ab: vec2f) -> f32 {
  return (length(p / ab) - 1.0) * min(ab.x, ab.y);
}

fn opSmoothUnion(d1: f32, d2: f32, k: f32) -> f32 {
  let h = clamp(0.5 + 0.5 * (d2 - d1) / k, 0.0, 1.0);
  return mix(d2, d1, h) - k * h * (1.0 - h);
}

fn opSmoothSub(d1: f32, d2: f32, k: f32) -> f32 {
  let h = clamp(0.5 - 0.5 * (d2 + d1) / k, 0.0, 1.0);
  return mix(d1, -d2, h) + k * h * (1.0 - h);
}

fn rotate(p: vec2f, a: f32) -> vec2f {
  let c = cos(a);
  let s = sin(a);
  return vec2f(c * p.x + s * p.y, -s * p.x + c * p.y);
}

fn hash21(p: vec2f) -> f32 {
  return fract(sin(dot(p, vec2f(127.1, 311.7))) * 43758.5453);
}

fn agentComputerMark(p: vec2f) -> f32 {
  let q = rotate(p, -0.08);
  let monitor = sdRoundedBox(q, vec2f(0.19, 0.13), 0.025);
  let screen = sdRoundedBox(q, vec2f(0.16, 0.10), 0.014);
  var mark = opSmoothSub(monitor, screen, 0.008);
  let stem = sdRoundedBox(q - vec2f(0.0, 0.16), vec2f(0.025, 0.045), 0.006);
  let base = sdRoundedBox(q - vec2f(0.0, 0.205), vec2f(0.085, 0.012), 0.006);
  let status = sdEllipse(q - vec2f(0.11, 0.055), vec2f(0.014, 0.014));
  mark = opSmoothUnion(mark, stem, 0.008);
  mark = opSmoothUnion(mark, base, 0.008);
  mark = opSmoothUnion(mark, status, 0.006);
  return mark;
}

fn ribbons(p: vec2f, t: f32) -> f32 {
  var acc = 0.0;
  for (var i = 0; i < 5; i = i + 1) {
    let fi = f32(i);
    let y0 = -0.30 + fi * 0.135;
    let amp = 0.032 + fi * 0.007;
    let freq = 5.4 + fi * 1.65;
    let speed = 0.28 + fi * 0.09;
    let y = y0 + amp * sin(p.x * freq + t * speed + fi * 1.1);
    let d = abs(p.y - y);
    acc += (1.0 - smoothstep(0.0, 0.0032, d)) * (0.28 - fi * 0.03);
    let tick = abs(fract(p.x * 2.6 + t * 0.07 + fi * 0.18) - 0.5);
    acc += (1.0 - smoothstep(0.0, 0.0018, abs(d - 0.014)))
      * (1.0 - smoothstep(0.45, 0.5, tick))
      * 0.09;
  }
  return acc;
}

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let aspect = params.texel.y / max(params.texel.x, 1.0e-6);
  let p = (uv - vec2f(0.5)) * vec2f(aspect, 1.0);
  let t = params.time;

  let breathe = 1.0 + 0.02 * sin(t * 0.85);
  let markP = (p - vec2f(0.46, -0.12)) / breathe;
  let dMark = agentComputerMark(markP);
  let fill = 1.0 - smoothstep(-0.0015, 0.004, dMark);
  let line = 1.0 - smoothstep(0.0, 0.0055, abs(dMark));
  let glow = exp(-max(dMark, 0.0) * 16.0);

  let traces = ribbons(p, t);
  let cell = floor(uv * vec2f(32.0, 18.0));
  let h = hash21(cell);
  let spark = step(0.972, h) * (0.45 + 0.55 * sin(t * 1.8 + h * 40.0));

  let teal = vec3f(0.015686, 0.788235, 0.807843);
  let cobalt = vec3f(0.027451, 0.407843, 0.866667);
  let lilac = vec3f(0.647059, 0.290196, 0.956863);
  let paper = vec3f(0.960784, 0.945098, 0.909804);
  let leftClear = smoothstep(0.34, 0.62, uv.x);
  var a = fill * 0.08 + line * 0.28 + glow * 0.08 + traces * 0.32 + spark * 0.06;
  a *= 0.55 * leftClear;
  a = clamp(a, 0.0, 0.34);
  let ribbonColor = mix(cobalt, teal, smoothstep(0.35, 0.75, uv.y));
  let col = mix(ribbonColor, mix(lilac, paper, 0.55), spark * 0.45 + line * 0.05);
  return vec4f(col * a, a);
}
