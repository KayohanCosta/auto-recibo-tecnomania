import { ImageResponse } from "next/og"

export const runtime = "nodejs"

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          background: "#000",
          width: "100%",
          height: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          color: "#fff",
        }}
      >
        TM
      </div>
    ),
    {
      width: 32,
      height: 32,
    },
  )
}
