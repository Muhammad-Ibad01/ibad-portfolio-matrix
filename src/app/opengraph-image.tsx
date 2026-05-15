import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "ibad.dev — Muhammad Ibad, Frontend Developer";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background: "#0d1117",
          color: "#00ff88",
          fontFamily: "monospace",
        }}
      >
        <div style={{ fontSize: 28, color: "rgba(0,255,136,0.45)", marginBottom: 16 }}>$ whoami</div>
        <div style={{ fontSize: 72, fontWeight: 600, letterSpacing: -2 }}>Muhammad Ibad</div>
        <div style={{ fontSize: 32, color: "rgba(255,255,255,0.85)", marginTop: 24 }}>
          Frontend Developer · React &amp; Next.js Engineer
        </div>
        <div style={{ fontSize: 22, color: "rgba(0,255,136,0.4)", marginTop: 48 }}>ibad.dev</div>
      </div>
    ),
    { ...size }
  );
}
