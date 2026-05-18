import type { Note } from '../types/note';
import { formatUpdatedAt } from '../lib/date';
import { copy } from '../lib/i18n';

type Props = {
  note: Note;
  onOpen: (id: string) => void;
};

function previewText(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return '';
  const singleLine = trimmed.replace(/\s+/g, ' ');
  return singleLine.length > 140 ? `${singleLine.slice(0, 140)}…` : singleLine;
}

export function NoteCard({ note, onOpen }: Props) {
  const title = note.title.trim() || copy.untitled;
  const body = previewText(note.body);
  const updated = formatUpdatedAt(note.updatedAt, note.locale ?? 'ja');

  return (
    <button
      type="button"
      onClick={() => onOpen(note.id)}
      className="group relative w-full overflow-hidden rounded-[13px] border border-[color:var(--color-line)] bg-[color:var(--color-paper)] px-[21px] py-[21px] text-left shadow-[0_12px_24px_-16px_var(--color-shadow)] backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-300 hover:border-[color:var(--color-line)] hover:shadow-[0_18px_36px_-20px_var(--color-shadow)] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-indigo)]/20"
      aria-label={`${title}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-full w-[2px] bg-[linear-gradient(to_bottom,transparent,rgba(36,59,83,0.22),transparent)] opacity-70"
      />
      <div className="flex items-start justify-between gap-[13px]">
        <div className="min-w-0">
          <div className="flex items-baseline gap-[8px]">
            <h3 className="font-heading text-[17px] font-medium text-[color:var(--color-sumi)]">
              {title}
            </h3>
            {note.isFavorite ? (
              <span
                className="inline-flex h-[10px] w-[10px] shrink-0 rotate-45 rounded-[2px] bg-[color:var(--color-gold)] shadow-[0_6px_16px_-10px_var(--color-shadow)]"
                aria-label={copy.favorite}
              />
            ) : null}
          </div>
          {body ? (
            <p className="mt-[8px] break-words text-[15px] leading-[1.618] text-[color:var(--color-ink-muted)]">
              {body}
            </p>
          ) : (
            <p className="mt-[8px] text-[13px] text-[color:var(--color-ink-muted)]">
              {updated}
            </p>
          )}
        </div>
        {body ? (
          <p className="pt-[2px] text-[13px] text-[color:var(--color-ink-muted)]">
            {updated}
          </p>
        ) : null}
      </div>
      <div className="mt-[13px] h-px w-full bg-[color:var(--color-line)] opacity-40 transition-opacity duration-300 group-hover:opacity-70" />
    </button>
  );
}
