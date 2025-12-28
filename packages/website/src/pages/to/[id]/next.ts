import type { APIContext } from "astro";
import { getAdjacentMembers, getAllMembers } from "~/lib/webring";

export async function GET({ params, url, cookies }: APIContext) {
  const members = await getAllMembers({ url });
  const { next } = getAdjacentMembers(members, params.id!);
  if (!next) {
    return Response.redirect(new URL("/", url));
  }

  cookies.set("webring-enabled", "true", {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
    sameSite: "none",
    secure: true,
  });

  return Response.redirect(new URL(`/to/${next.id}`, url));
}
