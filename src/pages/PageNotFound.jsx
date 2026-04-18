import { useEffect, useRef } from "react";

 const PageNotFound=()=> {
  const astroRef = useRef(null);

  useEffect(() => {
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const t = (now - start) / 1000;
      const y = Math.sin((t * 2 * Math.PI) / 3.6) * -14;
      const r = Math.sin((t * 2 * Math.PI) / 3.6) * 2;
      if (astroRef.current)
        astroRef.current.style.transform = `translateY(${y}px) rotate(${r}deg)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div style={s.page}>
      {/* Ambient orbs */}
      <div style={s.orb1} />
      <div style={s.orb2} />
      <div style={s.orb3} />

      {/* Stars */}
      <svg style={s.starsSvg} viewBox="0 0 600 580" xmlns="http://www.w3.org/2000/svg">
        {[
          [42,38,1.2,.4],[120,90,1.5,.25],[210,24,1,.5],[340,55,1.8,.2],
          [480,30,1.2,.45],[560,80,1,.3],[30,180,1.5,.2],[570,200,1.2,.35],
          [510,440,1.5,.2],[70,480,1,.4],[160,540,1.3,.25],[430,530,1,.3],
          [290,560,1.5,.15],[390,140,1,.3],[78,320,1.2,.2],[540,340,1,.25],
        ].map(([cx,cy,r,op],i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="white" opacity={op} />
        ))}
      </svg>

      <div style={s.content}>
        {/* Floating astronaut illustration */}
        <svg
          ref={astroRef}
          style={s.astro}
          width="90" height="90"
          viewBox="0 0 90 90"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="45" cy="30" r="18" fill="#2d2060" stroke="#7c3aed" strokeWidth="1.5"/>
          <circle cx="45" cy="30" r="13" fill="#0d0d14" stroke="#a78bfa" strokeWidth="0.5"/>
          <circle cx="40" cy="28" r="2.5" fill="#60a5fa" opacity="0.7"/>
          <rect x="30" y="46" width="30" height="22" rx="8" fill="#2d2060" stroke="#7c3aed" strokeWidth="1.2"/>
          <rect x="35" y="50" width="20" height="10" rx="4" fill="#1a1a30" stroke="#a78bfa" strokeWidth="0.5"/>
          <rect x="14" y="50" width="14" height="8" rx="4" fill="#2d2060" stroke="#7c3aed" strokeWidth="1"/>
          <rect x="62" y="50" width="14" height="8" rx="4" fill="#2d2060" stroke="#7c3aed" strokeWidth="1"/>
          <rect x="34" y="67" width="10" height="14" rx="4" fill="#2d2060" stroke="#7c3aed" strokeWidth="1"/>
          <rect x="46" y="67" width="10" height="14" rx="4" fill="#2d2060" stroke="#7c3aed" strokeWidth="1"/>
          <circle cx="68" cy="26" r="3" fill="#f0abfc" opacity="0.6"/>
          <circle cx="70" cy="22" r="1.5" fill="#f0abfc" opacity="0.3"/>
        </svg>

        {/* 404 number */}
        <div style={s.bigNum}>404</div>

        {/* Divider with pill */}
        <div style={s.divRow}>
          <div style={s.line} />
          <div style={s.pill}>Page not found</div>
          <div style={s.line} />
        </div>

        <h1 style={s.h1}>You're lost in space</h1>
        <p style={s.sub}>
          This page drifted off into the void. It may have been moved, deleted,
          or never existed — just like dark matter.
        </p>

        <div style={s.btns}>
          <button
            style={s.btnP}
            onMouseEnter={e => (e.target.style.background = "#6d28d9")}
            onMouseLeave={e => (e.target.style.background = "#7c3aed")}
            onClick={() => (window.location.href = "/")}
          >
            Take me home
          </button>
          <button
            style={s.btnS}
            onMouseEnter={e => (e.target.style.background = "rgba(255,255,255,0.11)")}
            onMouseLeave={e => (e.target.style.background = "rgba(255,255,255,0.06)")}
            onClick={() => window.history.back()}
          >
            Go back
          </button>
        </div>

        <div style={s.links}>
          {[["Sitemap","/sitemap"],["Search","/search"],["Contact support","/contact"]].map(
            ([label, href]) => (
              <a key={href} href={href} style={s.link}
                onMouseEnter={e => (e.target.style.color = "#a78bfa")}
                onMouseLeave={e => (e.target.style.color = "rgba(255,255,255,0.3)")}
              >
                {label}
              </a>
            )
          )}
        </div>
      </div>
    </div>
  );
}
export default PageNotFound
const s = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0d0d14",
    fontFamily: "system-ui, -apple-system, sans-serif",
    overflow: "hidden",
    position: "relative",
  },
  orb1: {
    position: "absolute", borderRadius: "50%",
    width: 340, height: 340, background: "#2d1f6e",
    top: -80, left: -80, opacity: 0.5, pointerEvents: "none",
  },
  orb2: {
    position: "absolute", borderRadius: "50%",
    width: 280, height: 280, background: "#1a3a5c",
    bottom: -60, right: -60, opacity: 0.4, pointerEvents: "none",
  },
  orb3: {
    position: "absolute", borderRadius: "50%",
    width: 160, height: 160, background: "#3d1a5c",
    top: "50%", left: "50%",
    transform: "translate(-50%,-50%)",
    opacity: 0.25, pointerEvents: "none",
  },
  starsSvg: {
    position: "absolute", inset: 0,
    width: "100%", height: "100%", pointerEvents: "none",
  },
  content: {
    position: "relative", zIndex: 2,
    textAlign: "center",
    padding: "3rem 2rem",
    maxWidth: 520, width: "100%",
  },
  astro: {
    display: "block",
    margin: "0 auto 4px",
    transition: "transform 0.05s linear",
  },
  bigNum: {
    fontSize: 140,
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: -8,
    background: "linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #f0abfc 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    userSelect: "none",
  },
  divRow: {
    display: "flex", alignItems: "center",
    gap: 12, margin: "8px auto 24px", maxWidth: 320,
  },
  line: {
    flex: 1, height: "0.5px",
    background: "rgba(255,255,255,0.12)",
  },
  pill: {
    background: "rgba(167,139,250,0.18)",
    border: "0.5px solid rgba(167,139,250,0.35)",
    borderRadius: 999, padding: "4px 14px",
    fontSize: 11, fontWeight: 500,
    color: "#c4b5fd", letterSpacing: ".06em",
    textTransform: "uppercase",
  },
  h1: {
    fontSize: 24, fontWeight: 500,
    color: "#f1f0fb", marginBottom: 12, lineHeight: 1.3,
  },
  sub: {
    fontSize: 14, color: "rgba(255,255,255,0.45)",
    lineHeight: 1.75, marginBottom: "2.25rem",
    maxWidth: 360, marginLeft: "auto", marginRight: "auto",
  },
  btns: {
    display: "flex", gap: 12,
    justifyContent: "center", flexWrap: "wrap",
    marginBottom: "2rem",
  },
  btnP: {
    background: "#7c3aed", color: "#fff",
    border: "none", borderRadius: 10,
    padding: ".7rem 1.6rem", fontSize: 14, fontWeight: 500,
    cursor: "pointer", fontFamily: "inherit",
    letterSpacing: ".01em", transition: "background .2s",
  },
  btnS: {
    background: "rgba(255,255,255,0.06)",
    color: "rgba(255,255,255,0.7)",
    border: "0.5px solid rgba(255,255,255,0.15)",
    borderRadius: 10, padding: ".7rem 1.6rem",
    fontSize: 14, fontWeight: 500,
    cursor: "pointer", fontFamily: "inherit",
    transition: "background .2s",
  },
  links: {
    display: "flex", gap: 24, justifyContent: "center",
  },
  link: {
    fontSize: 12,
    color: "rgba(255,255,255,0.3)",
    textDecoration: "none",
    transition: "color .2s",
  },
};