// import { NextResponse } from "next/server";

// export function GET() {
//   return NextResponse.json({
//     message: "Hello, world!",
//   });
// }
export async function GET(req: Request) {
  return new Response("Hello world");
}
