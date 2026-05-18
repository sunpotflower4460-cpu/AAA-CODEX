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

  const effectiveStatus: SaveStatus = status === 'saving' && !isDirty ? 'idle' : status;

  const savedOpacity =
    effectiveStatus === 'saving'
      ? 'opacity-60'
      : effectiveStatus === 'saved'
        ? 'opacity-100'
        : 'opacity-0';

  const favoriteLabel = isFavorite ? copy.unfavorite : copy.favorite;

  const markSaving = () => {
    if (savedTimerRef.current) window.clearTimeout(savedTimerRef.current);
    setStatus('saving');
  };

  const statusText = effectiveStatus === 'saving' ? copy.saving : copy.saved;
  const statusTextEn = effectiveStatus === 'saving' ? copy.savingEn : copy.savedEn;

  return (
    <div className="pb-[89px]">
      <header className="sticky top-[var(--safe-top,0px)] z-10 bg-[color:var(--color-washi)]/75 backdrop-blur-md shadow-[0_18px_36px_-24px_var(--color-shadow)]">
        <div className="flex items-center justify-between gap-[13px] border-b border-[color:var(--color-line)] py-[13px]">
          <button
            type="button"
            onClick={onBack}
            aria-label={copy.back}
            className="inline-flex h-[44px] items-center justify-center rounded-[13px] px-[13px] text-[15px] text-[color:var(--color-sumi)] transition-[transform,background-color] duration-300 hover:bg-[color:var(--color-paper)] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-indigo)]/20"
          >
            ← {copy.back}
          </button>

          <div
            className={`flex items-center justify-center gap-[8px] text-center text-[13px] text-[color:var(--color-ink-muted)] transition-opacity duration-500 ${savedOpacity}`}
          >
            {effectiveStatus === 'saving' ? (
              <span
                aria-hidden="true"
                className="h-[6px] w-[6px] rounded-full bg-[color:var(--color-indigo)] animate-[zanshin-breathe_2.4s_ease-in-out_infinite]"
              />
            ) : effectiveStatus === 'saved' ? (
              <span
                aria-hidden="true"
                className="h-[6px] w-[6px] rounded-full bg-[color:var(--color-gold)]"
              />
            ) : null}
            <span>{statusText}</span>
            <span className="opacity-70">{statusTextEn}</span>
          </div>

          <div className="flex items-center gap-[8px]">
            <button
              type="button"
              onClick={() => {
                markSaving();
                setIsFavorite((v) => !v);
              }}
              aria-label={favoriteLabel}
              className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-[13px] border border-[color:var(--color-line)] bg-[color:var(--color-paper)] text-[17px] text-[color:var(--color-sumi)] transition-[transform,background-color] duration-300 hover:bg-[color:var(--color-washi)] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-indigo)]/20"
            >
              <span aria-hidden="true" className={isFavorite ? 'text-[color:var(--color-gold)]' : ''}>
                {isFavorite ? '★' : '☆'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (window.confirm(copy.deleteConfirm)) onDelete(note.id);
              }}
              aria-label={copy.delete}
              className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-[13px] border border-[color:var(--color-line)] bg-[color:var(--color-paper)] text-[17px] text-[color:var(--color-vermilion)] transition-[transform,background-color] duration-300 hover:bg-[color:var(--color-washi)] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-vermilion)]/20"
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
            className="min-h-[62svh] w-full resize-none bg-transparent text-[16px] leading-[1.75] text-[color:var(--color-sumi)] placeholder:text-[color:var(--color-ink-muted)] focus:outline-none"
          />
        </label>
      </main>
    </div>
  );
}
