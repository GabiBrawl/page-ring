import type { APIContext } from "astro";
import { getAllMembers } from "~/lib/webring";

export async function GET({ url, cookies }: APIContext) {
  const members = await getAllMembers({ url });
  const randomMember = members[Math.floor(Math.random() * members.length)];

  cookies.set("webring-enabled", "true", {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
    sameSite: "none",
    secure: true,
  });

  return Response.redirect(new URL(`/to/${randomMember.id}`, url));
}
