import { readFile } from "fs/promises"
import { join } from "path"

export async function GET() {
  try {
    const logoPath = join(process.cwd(), "public", "logo-tecnomania.png")
    const logoBuffer = await readFile(logoPath)

    return new Response(logoBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    console.error("Logo route error:", error)
    return new Response(null, { status: 404 })
  }
}
