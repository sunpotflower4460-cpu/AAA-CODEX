import type { Note } from '../types/note';
import { copy } from '../lib/i18n';
import { EmptyState } from './EmptyState';
import { NoteCard } from './NoteCard';
import { SearchBar } from './SearchBar';
import { ZanshinMark } from './ZanshinMark';

type Props = {
  notes: Note[];
  query: string;
  onQueryChange: (next: string) => void;
  onOpenNote: (id: string) => void;
  onCreateNote: () => void;
};

export function NotesList({
  notes,
  query,
  onQueryChange,
  onOpenNote,
  onCreateNote,
}: Props) {
  const hasNotes = notes.length > 0;

  return (
    <div className="relative pb-[89px]">
      <header className="pt-[13px]">
        <div className="flex items-start justify-between gap-[13px]">
          <div>
            <h1 className="font-heading text-[21px] font-medium tracking-tight text-[color:var(--color-sumi)]">
              {copy.appName}
            </h1>
            <p className="mt-[4px] text-[13px] text-[color:var(--color-ink-muted)]">
              {copy.appSubtitle}
            </p>
          </div>
          <ZanshinMark className="mt-[4px] h-[34px] w-[34px] text-[color:var(--color-ink-muted)]" />
        </div>
        <p className="mt-[13px] text-[15px] leading-[1.618] text-[color:var(--color-ink-muted)]">
          {copy.tagline}
          <span className="ml-[8px] opacity-70">{copy.taglineEn}</span>
        </p>

        <div className="mt-[34px]">
          <SearchBar value={query} onChange={onQueryChange} />
        </div>
      </header>

      <main className="mt-[34px]">
        {hasNotes ? (
          <div className="space-y-[13px]">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} onOpen={onOpenNote} />
            ))}
          </div>
        ) : query.trim() ? (
          <div className="rounded-[21px] border border-[color:var(--color-line)] bg-[color:var(--color-paper)] px-[21px] py-[34px] text-center">
            <p className="font-heading text-[17px] text-[color:var(--color-sumi)]">
              {copy.noResults}
            </p>
            <p className="mt-[8px] text-[13px] text-[color:var(--color-ink-muted)]">
              {copy.noResultsEn}
            </p>
          </div>
        ) : (
          <EmptyState onCreate={onCreateNote} />
        )}
      </main>

      <button
        type="button"
        onClick={onCreateNote}
        aria-label={copy.newNote}
        className="fixed bottom-[max(21px,env(safe-area-inset-bottom))] right-[21px] z-10 flex h-[55px] w-[55px] items-center justify-center rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-paper)] text-[21px] text-[color:var(--color-sumi)] shadow-[0_18px_36px_-18px_var(--color-shadow)] transition-transform duration-300 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-indigo)]/20"
      >
        <span aria-hidden="true">＋</span>
      </button>
    </div>
  );
}

