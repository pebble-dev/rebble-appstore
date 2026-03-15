import { redirect } from 'react-router';
import type { Route } from "./+types/settings";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const hardware = formData.get('hardware')?.toString() ?? '';
  const platform = formData.get('platform')?.toString() ?? '';
  const language = formData.get('language')?.toString() ?? '';

  const maxAge = 60 * 60 * 24 * 365; // 1 year
  const cookies = [
    `as_hardware=${hardware}; Path=/; Max-Age=${maxAge}; SameSite=Lax`,
    `as_platform=${platform}; Path=/; Max-Age=${maxAge}; SameSite=Lax`,
    `as_language=${language}; Path=/; Max-Age=${maxAge}; SameSite=Lax`,
  ];

  const referer = request.headers.get('Referer') || '/watchapps';

  return new Response(null, {
    status: 302,
    headers: [
      ['Location', new URL(referer).pathname],
      ...cookies.map((c): [string, string] => ['Set-Cookie', c]),
    ],
  });
}
