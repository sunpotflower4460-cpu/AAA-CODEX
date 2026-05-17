import { useEffect, useMemo, useRef, useState } from 'react';
import type { Note } from '../types/note';
import { copy } from '../lib/i18n';

type Props = {
  note: Note;
  onBack: () => void;
  onUpdate: (id: string, patch: Pick<Note, 'title' | 'body' | 'isFavorite'>) => void;
  onDelete: (id: string) => void;
};

type SaveStatus = 'idle' | 'saving' | 'saved';

export function NoteEditor({ note, onBack, onUpdate, onDelete }: Props) {
  const [title, setTitle] = useState(() => note.title);
  const [body, setBody] = useState(() => note.body);
  const [isFavorite, setIsFavorite] = useState(() => note.isFavorite);
  const [status, setStatus] = useState<SaveStatus>('idle');
  const savedTimerRef = useRef<number | null>(null);

  const isDirty = useMemo(() => {
    return title !== note.title || body !== note.body || isFavorite !== note.isFavorite;
  }, [title, body, isFavorite, note.title, note.body, note.isFavorite]);

  useEffect(() => {
    if (!isDirty) return;

    const handle = window.setTimeout(() => {
      onUpdate(note.id, { title, body, isFavorite });
      setStatus('saved');
      if (savedTimerRef.current) window.clearTimeout(savedTimerRef.current);
      savedTimerRef.current = window.setTimeout(() => setStatus('idle'), 900);
    }, 450);

    return () => window.clearTimeout(handle);
  }, [isDirty, title, body, isFavorite, note.id, onUpdate]);

  useEffect(() => {
    return () => {
      if (savedTimerRef.current) window.clearTimeout(savedTimerRef.current);
    };
  }, []);

  const savedOpacity =
    status === 'saving' ? 'opacity-60' : status === 'saved' ? 'opacity-100' : 'opacity-0';

  const favoriteLabel = isFavorite ? copy.unfavorite : copy.favorite;

  const markSaving = () => {
    if (savedTimerRef.current) window.clearTimeout(savedTimerRef.current);
    setStatus('saving');
  };

  return (
    <div className="pb-[34px]">
      <header className="sticky top-0 z-10 bg-[color:var(--color-washi)]/90 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-[13px] border-b border-[color:var(--color-line)] py-[13px]">
          <button
            type="button"
            onClick={onBack}
            aria-label={copy.back}
            className="inline-flex h-[44px] items-center justify-center rounded-[13px] px-[13px] text-[15px] text-[color:var(--color-sumi)] transition-colors duration-300 hover:bg-[color:var(--color-paper)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-indigo)]/20"
          >
            ← {copy.back}
          </button>

          <div
            className={`text-center text-[13px] text-[color:var(--color-ink-muted)] transition-opacity duration-500 ${savedOpacity}`}
          >
            {copy.saved}
            <span className="ml-[8px] opacity-70">{copy.savedEn}</span>
          </div>

          <div className="flex items-center gap-[8px]">
            <button
              type="button"
              onClick={() => {
                markSaving();
                setIsFavorite((v) => !v);
              }}
              aria-label={favoriteLabel}
              className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-[13px] border border-[color:var(--color-line)] bg-[color:var(--color-paper)] text-[17px] text-[color:var(--color-sumi)] transition-colors duration-300 hover:bg-[color:var(--color-washi)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-indigo)]/20"
            >
              <span
                aria-hidden="true"
                className={isFavorite ? 'text-[color:var(--color-gold)]' : ''}
              >
                ☆
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (window.confirm(copy.deleteConfirm)) onDelete(note.id);
              }}
              aria-label={copy.delete}
              className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-[13px] border border-[color:var(--color-line)] bg-[color:var(--color-paper)] text-[17px] text-[color:var(--color-vermilion)] transition-colors duration-300 hover:bg-[color:var(--color-washi)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-vermilion)]/20"
            >
              <span aria-hidden="true">⌫</span>
            </button>
          </div>
        </div>
      </header>

      <main className="pt-[34px]">
        <label className="block">
          <span className="sr-only">{copy.titlePlaceholder}</span>
          <input
            value={title}
            onChange={(e) => {
              markSaving();
              setTitle(e.target.value);
            }}
            placeholder={copy.titlePlaceholder}
            aria-label={copy.titlePlaceholder}
            className="w-full bg-transparent font-heading text-[21px] font-medium leading-[1.3] text-[color:var(--color-sumi)] placeholder:text-[color:var(--color-ink-muted)] focus:outline-none"
          />
        </label>

        <div className="mt-[21px] h-px w-full bg-[color:var(--color-line)]" />

        <label className="mt-[21px] block">
          <span className="sr-only">{copy.bodyPlaceholder}</span>
          <textarea
            value={body}
            onChange={(e) => {
              markSaving();
              setBody(e.target.value);
            }}
            placeholder={copy.bodyPlaceholder}
            aria-label={copy.bodyPlaceholder}
            className="min-h-[55svh] w-full resize-none bg-transparent text-[16px] leading-[1.618] text-[color:var(--color-sumi)] placeholder:text-[color:var(--color-ink-muted)] focus:outline-none"
          />
        </label>
      </main>
    </div>
  );
}
