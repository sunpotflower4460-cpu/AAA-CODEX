import type { Note } from '../types/note';

const STORAGE_KEY = 'zanshin.notes.v1';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function asString(value: unknown): string | null {
  return typeof value === 'string' ? value : null;
}

function asBoolean(value: unknown): boolean | null {
  return typeof value === 'boolean' ? value : null;
}

function parseNote(value: unknown): Note | null {
  if (!isRecord(value)) return null;

  const id = asString(value.id);
  const title = asString(value.title);
  const body = asString(value.body);
  const createdAt = asString(value.createdAt);
  const updatedAt = asString(value.updatedAt);
  const isFavorite = asBoolean(value.isFavorite);

  if (!id || title === null || body === null || !createdAt || !updatedAt || isFavorite === null) {
    return null;
  }

  const localeRaw = value.locale;
  const locale = localeRaw === 'ja' || localeRaw === 'en' ? localeRaw : undefined;

  return { id, title, body, createdAt, updatedAt, isFavorite, locale };
}

export function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const notes: Note[] = [];
    for (const item of parsed) {
      const note = parseNote(item);
      if (note) notes.push(note);
    }
    return notes;
  } catch {
    return [];
  }
}

export function saveNotes(notes: Note[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // ignore (private mode / quota / disabled storage)
  }
}

export { STORAGE_KEY };

