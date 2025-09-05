export const GE_PHONE_RE = /^(?:\+?995)?(?:5\d{8}|(?:32|\d{2})\d{7})$/;

export function isFutureYmd(ymd: string) {
  // ymd = 'YYYY-MM-DD'
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd);
  if (!m) return false;
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  const today = new Date();
  const todayUTC = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate(),
  );
  return d.getTime() >= todayUTC;
}

export function parseYmdToDate(ymd: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd);
  if (!m) return null;
  return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])); // 00:00:00Z
}

export function allowedPackageSlugs(): string[] {
  const env = (process.env.ALLOWED_PACKAGE_SLUGS ?? '').trim();
  return env
    ? env
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
}
