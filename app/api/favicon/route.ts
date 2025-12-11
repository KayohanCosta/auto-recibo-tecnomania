import { readFile } from "fs/promises"
import { join } from "path"

export async function GET() {
  try {
    const faviconPath = join(process.cwd(), "public", "favicon.ico")
    const faviconBuffer = await readFile(faviconPath)

    return new Response(faviconBuffer, {
      headers: {
        "Content-Type": "image/x-icon",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    console.error("Favicon route error:", error)
    return new Response(null, { status: 404 })
  }
}
