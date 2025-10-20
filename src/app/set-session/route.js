import { cookies } from "next/headers";

export async function POST(req) {
  const { token } = await req.json();

  if (!token) {
    cookies().delete("__session");
    return new Response("Session cleared", { status: 200 });
  }

  cookies().set("__session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  return new Response("Session updated", { status: 200 });
}
