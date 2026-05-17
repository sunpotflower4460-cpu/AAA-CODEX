type DisplayLocale = 'ja' | 'en';

const DAY_MS = 24 * 60 * 60 * 1000;

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

export function formatUpdatedAt(iso: string, locale: DisplayLocale = 'ja'): string {
  const date = new Date(iso);
  if (Number.isNaN(date.valueOf())) return '';

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dateStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round((todayStart.getTime() - dateStart.getTime()) / DAY_MS);

  if (diffDays === 0) return locale === 'ja' ? '今日' : 'Today';
  if (diffDays === 1) return locale === 'ja' ? '昨日' : 'Yesterday';

  const y = date.getFullYear();
  const m = pad2(date.getMonth() + 1);
  const d = pad2(date.getDate());
  return `${y}/${m}/${d}`;
}

